import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './Contact.css';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    const waText = `*Atlas Citrus Export — Contact Form*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Phone:* ${formData.phone || 'N/A'}%0A` +
      `*Subject:* ${formData.subject || 'General Inquiry'}%0A%0A` +
      `*Message:*%0A${formData.message}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(`https://api.whatsapp.com/send?phone=212669128221&text=${waText}`, '_blank');
    }, 800);
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <h2>{t('contact.title')}</h2>
          <p>{t('contact.subtitle')}</p>
        </div>

        <div className="contact-grid">
          
          <motion.div 
            className="contact-info-column"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="info-cards">
              
              <div className="info-card">
                <span className="info-icon"><FiPhone /></span>
                <div>
                  <h4>{t('contact.phone')}</h4>
                  <p><a href="https://api.whatsapp.com/send?phone=212669128221" target="_blank" rel="noopener noreferrer">+212 669-128221</a></p>
                </div>
              </div>

              <div className="info-card">
                <span className="info-icon"><FaWhatsapp /></span>
                <div>
                  <h4>{t('contact.whatsapp')}</h4>
                  <p><a href="https://api.whatsapp.com/send?phone=212669128221" target="_blank" rel="noopener noreferrer">+212 669-128221</a></p>
                </div>
              </div>

              <div className="info-card">
                <span className="info-icon"><FiMail /></span>
                <div>
                  <h4>{t('contact.email')}</h4>
                  <p><a href="mailto:lowkickcharaf@gmail.com">lowkickcharaf@gmail.com</a></p>
                </div>
              </div>

              <div className="info-card">
                <span className="info-icon"><FiMapPin /></span>
                <div>
                  <h4>{t('contact.location')}</h4>
                  <p>{t('contact.address')}</p>
                </div>
              </div>

            </div>

            <div className="contact-map">
              <iframe
                title="Atlas Citrus Export Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.8837372202685!2d-8.024467623696879!3d31.637042574163914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM4JzEzLjQiTiA4wrAwMScxOC4xIlc!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma"
                width="100%"
                height="220"
                style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-column"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="contact-name">{t('contact.formName')} *</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">{t('contact.formEmail')} *</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-phone">{t('contact.formPhone')}</label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">{t('contact.formSubject')}</label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">{t('contact.formMessage')} *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn-primary contact-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? t('contact.sending') : t('contact.send')}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
