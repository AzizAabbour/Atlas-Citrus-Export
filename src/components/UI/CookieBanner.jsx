import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './CookieBanner.css';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const accepted = localStorage.getItem('cookies');
    if (!accepted) {
      const timer = setTimeout(() => setShow(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handle = (val) => {
    localStorage.setItem('cookies', val);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="cookie-banner"
          id="cookie-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <p>{t('cookie.message')}</p>
          <div className="cookie-actions">
            <button className="btn-primary" onClick={() => handle('accepted')}>{t('cookie.accept')}</button>
            <button className="cookie-decline" onClick={() => handle('declined')}>{t('cookie.decline')}</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
