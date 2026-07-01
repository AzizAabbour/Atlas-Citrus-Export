import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCounter } from '../../hooks/useCounter';
import { FiGlobe, FiAward, FiCompass, FiFeather, FiTruck, FiLayers } from 'react-icons/fi';
import aboutImage from '../../assets/images/gallery-packaging.png';
import './About.jsx'; // self-reference placeholder
import './About.css';

const StatCard = ({ endVal, labelKey, suffix = "" }) => {
  const { count, ref } = useCounter(endVal, 2000, true);
  const { t } = useTranslation();
  return (
    <div className="stat-card" ref={ref}>
      <h3 className="stat-number">
        {count}
        {suffix}
      </h3>
      <p className="stat-label">{t(labelKey)}</p>
    </div>
  );
};

export default function About() {
  const { t } = useTranslation();

  const featureIcons = {
    moroccan: <FiGlobe />,
    quality: <FiAward />,
    export: <FiCompass />,
    fresh: <FiFeather />,
    logistics: <FiTruck />,
    sustainable: <FiLayers />
  };

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="section-header">
          <h2>{t('about.title')}</h2>
          <p>{t('about.subtitle')}</p>
        </div>

        <div className="about-grid">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="about-desc-primary">{t('about.description')}</p>
            <p className="about-desc-secondary">{t('about.description2')}</p>

            <div className="about-features-grid">
              {Object.keys(featureIcons).map((key) => (
                <div className="about-feature-item" key={key}>
                  <span className="about-feature-icon">{featureIcons[key]}</span>
                  <span className="about-feature-text">{t(`about.features.${key}`)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="about-image-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-image-backdrop" />
            <img src={aboutImage} alt="Moroccan Citrus Operations" className="about-img" />
          </motion.div>
        </div>

        <div className="stats-container">
          <StatCard endVal={15} labelKey="about.stats.partners" suffix="+" />
          <StatCard endVal={25} labelKey="about.stats.farms" suffix="+" />
          <StatCard endVal={1000} labelKey="about.stats.tons" suffix="+" />
          <StatCard endVal={100} labelKey="about.stats.quality" suffix="%" />
        </div>
      </div>
    </section>
  );
}
