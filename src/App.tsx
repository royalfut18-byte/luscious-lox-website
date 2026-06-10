import { useEffect, useState } from 'react';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import SeoHead from './components/SeoHead';
import { hairSalonSchema, homeSeo, seoPages, siteUrl } from './data/seoPages';

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
      <SeoHead title={seo.title} description={seo.description} canonical={seo.canonical} schema={hairSalonSchema} />
      {page ? <LandingPage page={page} /> : <HomePage />}
    </>
  );
}

export default App;
