import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './LangSwitcher.css';

const langs = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'AR' }
];

export default function LangSwitcher() {
  const { i18n } = useTranslation();

  const changeLang = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('lang', code);
    document.documentElement.setAttribute('dir', code === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', code);
  };

  return (
    <div className="lang-switcher" id="lang-switcher">
      {langs.map((lang) => (
        <motion.button
          key={lang.code}
          className={`lang-btn ${i18n.language === lang.code ? 'active' : ''}`}
          onClick={() => changeLang(lang.code)}
          whileTap={{ scale: 0.9 }}
        >
          {lang.label}
        </motion.button>
      ))}
    </div>
  );
}
