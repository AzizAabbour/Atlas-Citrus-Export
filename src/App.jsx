import { useTheme } from './hooks/useTheme';
import Loader from './components/UI/Loader';
import ScrollProgress from './components/UI/ScrollProgress';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Products from './components/Products/Products';
import OrderForm from './components/OrderForm/OrderForm';
import Gallery from './components/Gallery/Gallery';
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs';
import Testimonials from './components/Testimonials/Testimonials';
import FAQ from './components/FAQ/FAQ';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import BackToTop from './components/UI/BackToTop';
import WhatsAppButton from './components/UI/WhatsAppButton';
import CookieBanner from './components/UI/CookieBanner';
import './styles/global.css';

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      {/* Premium Loader screen */}
      <Loader />

      {/* Thin scroll tracking bar */}
      <ScrollProgress />

      {/* Header / Navigation */}
      <Navbar theme={theme} toggleTheme={toggle} />

      {/* Main Page Layout Sections */}
      <main>
        <Hero />
        <About />
        <Services />
        <Products />
        <OrderForm />
        <Gallery />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      {/* Footer Details */}
      <Footer />

      {/* Global Interactive widgets */}
      <BackToTop />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}
