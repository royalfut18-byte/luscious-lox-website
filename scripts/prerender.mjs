// Post-build prerender: writes a real static HTML file for every SEO landing
// page so each URL serves unique title/meta/content even without JavaScript.
// Runs automatically after `vite build` (see package.json build script).
import { build } from 'esbuild';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'dist');

// Bundle the TypeScript data module so this Node script can import it
const dataBundle = path.join(outDir, '.prerender-data.mjs');
await build({
  entryPoints: [path.join(root, 'src/data/seoPages.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: dataBundle,
  logLevel: 'silent',
});
const { seoPages, siteUrl, shopSeo } = await import(pathToFileURL(dataBundle).href);
await rm(dataBundle, { force: true });

// The shop renders live product data, so bundle that module too.
const shopBundle = path.join(outDir, '.prerender-shop.mjs');
await build({
  entryPoints: [path.join(root, 'src/data/siteData.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: shopBundle,
  logLevel: 'silent',
});
const { shopProducts } = await import(pathToFileURL(shopBundle).href);
await rm(shopBundle, { force: true });

const template = await readFile(path.join(outDir, 'index.html'), 'utf8');

const esc = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const pages = Object.values(seoPages);

for (const page of pages) {
  const canonical = `${siteUrl}${page.path}`;

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(page.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(page.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(page.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`);

  // Static, crawlable body content. React replaces this on load with the
  // full styled page built from the same data, so content parity holds.
  const content = `
    <main style="max-width:760px;margin:0 auto;padding:56px 24px;font-family:Georgia,'Times New Roman',serif;color:#1C1210;line-height:1.8;background:#FFFDF7;">
      <p style="text-transform:uppercase;letter-spacing:0.3em;font-size:11px;color:#B08D57;">Lusciouslox &middot; Neutral Bay, Sydney</p>
      <h1 style="font-size:2.4rem;font-weight:400;line-height:1.15;margin:12px 0 24px;">${esc(page.h1)}</h1>
      <p>${esc(page.heroIntro)}</p>
      <p>${esc(page.openingCopy)}</p>
      <img src="${page.imageSrc}" alt="${esc(page.imageAlt)}" style="width:100%;max-width:560px;border-radius:16px;margin:16px 0;" loading="lazy" />
      <h2 style="font-size:1.6rem;font-weight:400;margin-top:32px;">${esc(page.sectionTitle)}</h2>
      ${page.sectionParagraphs.map((p) => `<p>${esc(p)}</p>`).join('\n      ')}
      <h2 style="font-size:1.6rem;font-weight:400;margin-top:32px;">${esc(page.detailsTitle)}</h2>
      ${page.detailsParagraphs.map((p) => `<p>${esc(p)}</p>`).join('\n      ')}
      <p style="margin-top:32px;"><strong>Lusciouslox</strong> &middot; 156 Wycombe Rd, Neutral Bay NSW 2089 &middot; <a href="tel:+61416595902">0416 595 902</a> &middot; <a href="tel:+61290994362">02 9099 4362</a></p>
      <nav style="margin-top:16px;">
        <p>${page.relatedLinks.map((l) => `<a href="${l.href}">${esc(l.label)}</a>`).join(' &middot; ')}</p>
        <p><a href="/">Lusciouslox homepage</a> &middot; <a href="/#booking">Book a consultation</a></p>
      </nav>
    </main>`;

  html = html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);

  const dir = path.join(outDir, page.path.slice(1));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
  console.log(`prerendered ${page.path}/index.html`);
}

// The shop is a real page: give crawlers the product copy without JS too.
{
  const canonical = shopSeo.canonical;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(shopSeo.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(shopSeo.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(shopSeo.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(shopSeo.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`);

  const products = shopProducts
    .map(
      (product) => `
      <article style="margin:32px 0;padding-bottom:24px;border-bottom:1px solid #EDE1CF;">
        <h2 style="font-size:1.6rem;font-weight:400;margin:0 0 8px;">${esc(product.name)}</h2>
        <p style="color:#B08D57;font-weight:bold;margin:0 0 12px;">${esc(product.price ?? 'Enquire for pricing')}</p>
        <img src="${product.images[0].src}" alt="${esc(product.images[0].alt)}" style="width:100%;max-width:420px;border-radius:16px;margin:12px 0;" loading="lazy" />
        <p>${esc(product.description)}</p>
        <ul>${product.specs.map((spec) => `<li>${esc(spec.label)}: ${esc(spec.value)}</li>`).join('')}</ul>
      </article>`,
    )
    .join('');

  const content = `
    <main style="max-width:760px;margin:0 auto;padding:56px 24px;font-family:Georgia,'Times New Roman',serif;color:#1C1210;line-height:1.8;background:#FFFDF7;">
      <p style="text-transform:uppercase;letter-spacing:0.3em;font-size:11px;color:#B08D57;">Lusciouslox &middot; Neutral Bay, Sydney</p>
      <h1 style="font-size:2.4rem;font-weight:400;line-height:1.15;margin:12px 0 24px;">${esc(shopSeo.h1)}</h1>
      <p>${esc(shopSeo.intro)}</p>
      ${products}
      <p style="margin-top:32px;"><strong>Lusciouslox</strong> &middot; 156 Wycombe Rd, Neutral Bay NSW 2089 &middot; <a href="tel:+61416595902">0416 595 902</a></p>
      <nav style="margin-top:16px;"><p><a href="/">Lusciouslox homepage</a> &middot; <a href="/#booking">Book a consultation</a></p></nav>
    </main>`;

  html = html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
  await mkdir(path.join(outDir, 'shop'), { recursive: true });
  await writeFile(path.join(outDir, 'shop', 'index.html'), html);
  console.log('prerendered /shop/index.html');
}

console.log(`\nDone: ${pages.length} landing pages + the shop prerendered as static HTML.`);
