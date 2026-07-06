import { useEffect, useState } from 'react';
import AdminPortal from './components/AdminPortal';
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

  if (pathname.startsWith('/admin')) {
    return (
      <>
        <SeoHead
          title="Luscious Lox Admin"
          description="Private Luscious Lox bookings dashboard."
          canonical={`${siteUrl}/admin`}
          robots="noindex,nofollow"
        />
        <AdminPortal />
      </>
    );
  }

  const page = seoPages[pathname];
  const seo = page
    ? {
        title: page.title,
        description: page.description,
        canonical: `${siteUrl}${page.path}`,
        image: `${siteUrl}${page.imageSrc}`,
      }
    : { ...homeSeo, image: `${siteUrl}/lusciouslox/neutral-bay-1.png` };

  return (
    <>
      <SeoHead title={seo.title} description={seo.description} canonical={seo.canonical} image={seo.image} schema={hairSalonSchema} />
      {page ? <LandingPage page={page} /> : <HomePage />}
    </>
  );
}

export default App;
