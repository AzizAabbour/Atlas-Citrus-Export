import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiTrendingUp, FiBox, FiCheckCircle, FiAnchor, FiThermometer, FiGrid } from 'react-icons/fi';
import './Services.css';

export default function Services() {
  const { t } = useTranslation();

  const services = [
    { key: 'citrusExport', icon: <FiTrendingUp /> },
    { key: 'packaging', icon: <FiBox /> },
    { key: 'qualityControl', icon: <FiCheckCircle /> },
    { key: 'shipping', icon: <FiAnchor /> },
    { key: 'coldStorage', icon: <FiThermometer /> },
    { key: 'logistics', icon: <FiGrid /> }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section className="section services-section section-alt" id="services">
      <div className="container">
        <div className="section-header">
          <h2>{t('services.title')}</h2>
          <p>{t('services.subtitle')}</p>
        </div>

        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div 
              className="service-card" 
              key={service.key}
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: 'var(--shadow-xl)' }}
            >
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h3>{t(`services.${service.key}.title`)}</h3>
              <p>{t(`services.${service.key}.desc`)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
