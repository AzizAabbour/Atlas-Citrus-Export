import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import logoImg from '../../assets/logo.jpeg';
import './Loader.css';

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="loader-overlay"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loader-content">
            <div className="loader-logo-wrapper">
              <img src={logoImg} alt="Atlas Citrus Logo" className="loader-logo" />
            </div>
            <motion.h2
              className="loader-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t('loader.text')}
            </motion.h2>
            <div className="loader-bar">
              <div className="loader-bar-fill"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
