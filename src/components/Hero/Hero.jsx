import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import heroBg from '../../assets/images/hero-bg.png';
import './Hero.css';

export default function Hero() {
  const { t } = useTranslation();
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      <div
        className="hero-bg"
        style={{ transform: `translateY(${offsetY * 0.4}px)` }}
      >
        <img src={heroBg} alt="Moroccan citrus farm" loading="eager" />
      </div>
      <div className="hero-overlay" />
      <div className="container hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('hero.title')}
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t('hero.subtitle')}
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="btn-accent" onClick={() => scrollTo('#contact')}>
            {t('hero.cta1')}
          </button>
          <button className="btn-secondary" onClick={() => scrollTo('#order')}>
            {t('hero.cta2')}
          </button>
        </motion.div>
        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {/* <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
