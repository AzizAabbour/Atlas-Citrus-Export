import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiPlus, FiMinus } from 'react-icons/fi';
import './FAQ.css';

const faqs = ['q1', 'q2', 'q3', 'q4', 'q5'];

function FAQItem({ itemKey, isOpen, toggle }) {
  const { t } = useTranslation();
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`} id={`faq-${itemKey}`}>
      <button className="faq-question" onClick={toggle} aria-expanded={isOpen}>
        <span>{t(`faq.${itemKey}`)}</span>
        <span className="faq-icon-wrapper">
          {isOpen ? <FiMinus /> : <FiPlus />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="faq-answer-inner">
              <p>{t(`faq.a${itemKey.charAt(1)}`)}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const { t } = useTranslation();
  const [openKey, setOpenKey] = useState(null);

  const toggle = (key) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <section className="section faq-section section-alt" id="faq">
      <div className="container">
        <div className="section-header">
          <h2>{t('faq.title')}</h2>
          <p>{t('faq.subtitle')}</p>
        </div>

        <div className="faq-list">
          {faqs.map((key) => (
            <FAQItem
              key={key}
              itemKey={key}
              isOpen={openKey === key}
              toggle={() => toggle(key)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
