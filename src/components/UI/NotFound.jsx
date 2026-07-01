import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './NotFound.css';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="not-found-container" id="not-found-page">
      <motion.div 
        className="not-found-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="not-found-icon">🍋</span>
        <h1>404</h1>
        <h2>{t('notFound.title')}</h2>
        <p>{t('notFound.subtitle')}</p>
        <a href="#home" className="btn-primary not-found-btn">
          {t('notFound.goHome')}
        </a>
      </motion.div>
    </div>
  );
}
