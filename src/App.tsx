import { useEffect, useState } from 'react';
import AdminPortal from './components/AdminPortal';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import SeoHead from './components/SeoHead';
import ShopPage from './components/ShopPage';
import { hairSalonSchema, homeSeo, seoPages, shopSeo, siteUrl } from './data/seoPages';

const normalisePath = () => {
  const pathname = window.location.pathname.replace(/\/+$/, '');
  return pathname ? pathname.toLowerCase() : '/';
};

function App() {
  const [pathname, setPathname] = useState(normalisePath);

  useEffect(() => {
    const handleNavigation = () => setPathname(normalisePath());
    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  if (pathname.startsWith('/admin')) {
    return (
      <>
        <SeoHead
          title="Lusciouslox Admin"
          description="Private Lusciouslox bookings dashboard."
          canonical={`${siteUrl}/admin`}
          robots="noindex,nofollow"
        />
        <AdminPortal />
      </>
    );
  }

  if (pathname === '/shop') {
    return (
      <>
        <SeoHead
          title={shopSeo.title}
          description={shopSeo.description}
          canonical={shopSeo.canonical}
          schema={hairSalonSchema}
        />
        <ShopPage />
      </>
    );
  }

  const page = seoPages[pathname];
  const seo = page
    ? {
        title: page.title,
        description: page.description,
        canonical: `${siteUrl}${page.path}`,
      }
    : homeSeo;

  return (
    <>
      {/* Social share image defaults to the JPEG og-image inside SeoHead (WebP previews are unreliable on WhatsApp/Facebook) */}
      <SeoHead title={seo.title} description={seo.description} canonical={seo.canonical} schema={hairSalonSchema} />
      {page ? <LandingPage page={page} /> : <HomePage />}
    </>
  );
}

export default App;
