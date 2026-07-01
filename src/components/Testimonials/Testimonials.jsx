import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Testimonials.css';

const testimonialData = [
  {
    id: 1,
    name: 'Jean Dupont',
    company: 'Fresh Imports SAS',
    country: 'France',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    quote: 'Excellent service! Atlas Citrus Export has been supplying us with top-grade Moroccan oranges for over 5 years. Their logistics reliability and product freshness are outstanding.'
  },
  {
    id: 2,
    name: 'Sophia Mueller',
    company: 'BioFruits GmbH',
    country: 'Germany',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    quote: 'The quality of the Clementines we received is incredible. Our customers are absolutely loving them. The team is very professional and easy to work with.'
  },
  {
    id: 3,
    name: 'Khalid Al-Mansoori',
    company: 'Gulf Oasis Produce',
    country: 'UAE',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    quote: 'Highly recommend Atlas Citrus. Their packaging keeps the fruit fresh through transit, and they accommodate custom packaging specifications easily. Excellent partners.'
  }
];

export default function Testimonials() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [index]);

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? testimonialData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev === testimonialData.length - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeInOut' }
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeInOut' }
    })
  };

  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>{t('testimonials.title')}</h2>
          <p>{t('testimonials.subtitle')}</p>
        </div>

        <div className="slider-wrapper">
          <button className="slider-nav slider-prev" onClick={handlePrev} aria-label="Previous testimonial">
            <FiChevronLeft />
          </button>

          <div className="slider-content">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={testimonialData[index].id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="testimonial-card"
              >
                <div className="testimonial-quote">“</div>
                <p className="quote-text">{testimonialData[index].quote}</p>
                <div className="testimonial-client">
                  <img src={testimonialData[index].avatar} alt={testimonialData[index].name} className="client-avatar" />
                  <div className="client-meta">
                    <h4>{testimonialData[index].name}</h4>
                    <p>{testimonialData[index].company}, {testimonialData[index].country}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="slider-nav slider-next" onClick={handleNext} aria-label="Next testimonial">
            <FiChevronRight />
          </button>
        </div>

        <div className="slider-dots">
          {testimonialData.map((_, idx) => (
            <button
              key={idx}
              className={`slider-dot ${idx === index ? 'active' : ''}`}
              onClick={() => {
                setDirection(idx > index ? 1 : -1);
                setIndex(idx);
              }}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
