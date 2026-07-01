import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from '../UI/ThemeToggle';
import LangSwitcher from '../UI/LangSwitcher';
import logoImg from '../../assets/logo.jpeg';
import './Navbar.css';

const navLinks = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'services', href: '#services' },
  { key: 'products', href: '#products' },
  { key: 'order', href: '#order' },
  { key: 'gallery', href: '#gallery' },
  { key: 'contact', href: '#contact' }
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = 72;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
      id="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container navbar-inner">
        <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick(e, '#home')}>
          <img src={logoImg} alt="Atlas Citrus Logo" className="logo-img" />
          <span className="logo-text">Atlas<span className="logo-accent">Citrus</span></span>
        </a>

        <nav className="navbar-nav desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="nav-link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
        </nav>

        <div className="navbar-actions">
          <LangSwitcher />
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: i18n.language === 'ar' ? '-100%' : '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: i18n.language === 'ar' ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <nav className="mobile-nav">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  className="mobile-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: i18n.language === 'ar' ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {t(`nav.${link.key}`)}
                </motion.a>
              ))}
              
              <div className="mobile-drawer-actions">
                <span className="mobile-action-label">{t('nav.search') === 'Search...' ? 'Language' : t('footer.quickLinks') === 'Liens Rapides' ? 'Langue' : 'اللغة'}:</span>
                <LangSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
