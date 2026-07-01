import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import orangeImg from '../../assets/images/product-oranges.png';
import lemonImg from '../../assets/images/product-lemons.png';
import clementineImg from '../../assets/images/product-clementines.png';
import mandarinImg from '../../assets/images/product-mandarins.png';
import './Products.css';

export default function Products() {
  const { t } = useTranslation();

  const products = [
    { key: 'oranges', emoji: '🍊', image: orangeImg },
    { key: 'lemons', emoji: '🍋', image: lemonImg },
    { key: 'clementines', emoji: '🍊', image: clementineImg },
    { key: 'mandarins', emoji: '🍊', image: mandarinImg }
  ];

  const handleOrderRedirect = (productName) => {
    const orderSection = document.getElementById('order');
    if (orderSection) {
      // Find the select product element and set its value, or just scroll down
      const productSelect = document.getElementById('order-product');
      if (productSelect) {
        productSelect.value = productName.toLowerCase();
        // Dispatch synthetic event to let React state update if it listens
        productSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section products-section" id="products">
      <div className="container">
        <div className="section-header">
          <h2>{t('products.title')}</h2>
          <p>{t('products.subtitle')}</p>
        </div>

        <div className="products-grid">
          {products.map((prod, i) => (
            <motion.div 
              className="product-card" 
              key={prod.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="product-image-container">
                <img src={prod.image} alt={t(`products.${prod.key}.name`)} className="product-image" loading="lazy" />
                <span className="product-emoji">{prod.emoji}</span>
                <div className="product-badge">{t('products.exportQuality')}</div>
              </div>
              <div className="product-info">
                <h3>{t(`products.${prod.key}.name`)}</h3>
                <p className="product-origin">{t('products.origin')}</p>
                <div className="product-sizes">
                  <span className="sizes-label">{t('products.sizes')}:</span>
                  <span className="sizes-value">{t(`products.${prod.key}.sizes`)}</span>
                </div>
                <button className="product-order-btn" onClick={() => handleOrderRedirect(prod.key)}>
                  {t('nav.order')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
