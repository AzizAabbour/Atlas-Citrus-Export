import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiAward, FiZap, FiTarget, FiTruck, FiDollarSign, FiShield } from 'react-icons/fi';
import './WhyChooseUs.css';

export default function WhyChooseUs() {
  const { t } = useTranslation();

  const cards = [
    { key: 'quality', icon: <FiAward /> },
    { key: 'fast', icon: <FiZap /> },
    { key: 'fresh', icon: <FiTarget /> },
    { key: 'logistics', icon: <FiTruck /> },
    { key: 'prices', icon: <FiDollarSign /> },
    { key: 'certified', icon: <FiShield /> }
  ];

  return (
    <section className="section why-us-section section-alt" id="why-choose-us">
      <div className="container">
        <div className="section-header">
          <h2>{t('whyUs.title')}</h2>
          <p>{t('whyUs.subtitle')}</p>
        </div>

        <div className="why-us-grid">
          {cards.map((item, i) => (
            <motion.div 
              className="why-us-card" 
              key={item.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="why-us-icon">{item.icon}</span>
              <h3>{t(`whyUs.${item.key}.title`)}</h3>
              <p>{t(`whyUs.${item.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
