import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiChevronLeft, FiChevronRight, FiX, FiZoomIn } from 'react-icons/fi';
import packagingImg from '../../assets/images/gallery-packaging.png';
import './Gallery.css';

// Citrus farm operations & export imagery loaded dynamically/royalty-free
const galleryItems = [
  { id: 1, category: 'packaging', img: packagingImg },
  { id: 2, category: 'farms', img: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80' },
  { id: 3, category: 'harvesting', img: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=800&q=80' },
  { id: 4, category: 'containers', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80' },
  { id: 5, category: 'trucks', img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80' },
  { id: 6, category: 'loading', img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80' }
];

export default function Gallery() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [activeIdx, setActiveIdx] = useState(null);

  const categories = ['all', 'farms', 'packaging', 'containers', 'harvesting', 'trucks', 'loading'];

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="section gallery-section" id="gallery">
      <div className="container">
        <div className="section-header">
          <h2>{t('gallery.title')}</h2>
          <p>{t('gallery.subtitle')}</p>
        </div>

        <div className="gallery-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {t(`gallery.${cat}`)}
            </button>
          ))}
        </div>

        <motion.div className="gallery-masonry" layout>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                className="gallery-item"
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveIdx(index)}
              >
                <img src={item.img} alt={`Gallery item ${item.category}`} loading="lazy" />
                <div className="gallery-item-overlay">
                  <FiZoomIn className="zoom-icon" />
                  <span className="gallery-item-category">{t(`gallery.${item.category}`)}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIdx(null)}
          >
            <button className="lightbox-close" onClick={() => setActiveIdx(null)}>
              <FiX />
            </button>
            
            <button className="lightbox-nav lightbox-prev" onClick={handlePrev}>
              <FiChevronLeft />
            </button>

            <motion.div 
              className="lightbox-image-wrapper"
              key={filteredItems[activeIdx].id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={filteredItems[activeIdx].img} alt="Enlarged citrus operations" />
              <div className="lightbox-caption">
                {t(`gallery.${filteredItems[activeIdx].category}`)}
              </div>
            </motion.div>

            <button className="lightbox-nav lightbox-next" onClick={handleNext}>
              <FiChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
