import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './OrderForm.css';

const countriesList = [
  { code: 'MA', name: 'Morocco' },
  { code: 'FR', name: 'France' },
  { code: 'ES', name: 'Spain' },
  { code: 'DE', name: 'Germany' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' }
];

export default function OrderForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    country: '',
    city: '',
    email: '',
    phone: '',
    whatsapp: '',
    product: '',
    quantity: '',
    unit: 'KG',
    message: '',
    deliveryDate: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = t('order.required');
    if (!formData.companyName.trim()) newErrors.companyName = t('order.required');
    if (!formData.country) newErrors.country = t('order.selectCountry');
    if (!formData.city.trim()) newErrors.city = t('order.required');
    
    if (!formData.email.trim()) {
      newErrors.email = t('order.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('order.invalidEmail');
    }

    if (!formData.phone.trim()) newErrors.phone = t('order.required');
    if (!formData.whatsapp.trim()) newErrors.whatsapp = t('order.required');
    if (!formData.product) newErrors.product = t('order.selectProduct');
    if (!formData.deliveryDate) newErrors.deliveryDate = t('order.required');

    const qty = parseFloat(formData.quantity);
    if (!formData.quantity || isNaN(qty) || qty <= 0) {
      newErrors.quantity = t('order.required');
    } else if (formData.unit === 'KG') {
      const isMorocco = formData.country === 'MA' || formData.country.toLowerCase() === 'morocco';
      if (isMorocco && qty < 500) {
        newErrors.quantity = t('order.minMorocco');
      } else if (!isMorocco && qty < 1000) {
        newErrors.quantity = t('order.minInternational');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const countryName = countriesList.find((c) => c.code === formData.country)?.name || formData.country;
    
    // Construct the WhatsApp message body template
    const waText = `*Atlas Citrus Export — New Order Request*%0A%0A` +
      `*Name:* ${formData.fullName}%0A` +
      `*Company:* ${formData.companyName}%0A` +
      `*Country:* ${countryName} (${formData.city})%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*WhatsApp:* ${formData.whatsapp}%0A%0A` +
      `*Requested Product:* ${t(`order.${formData.product}`)}%0A` +
      `*Quantity:* ${formData.quantity} ${formData.unit}%0A` +
      `*Delivery Date:* ${formData.deliveryDate}%0A%0A` +
      `*Additional Notes:*%0A${formData.message || 'None'}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(`https://api.whatsapp.com/send?phone=212669128221&text=${waText}`, '_blank');
    }, 800);
  };

  return (
    <section className="section order-section section-alt" id="order">
      <div className="container">
        <div className="section-header">
          <h2>{t('order.title')}</h2>
          <p>{t('order.subtitle')}</p>
        </div>

        <motion.div 
          className="order-form-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-grid">
              
              <div className="form-group">
                <label htmlFor="fullName">{t('order.fullName')} *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? 'input-error' : ''}
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="companyName">{t('order.companyName')} *</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={errors.companyName ? 'input-error' : ''}
                />
                {errors.companyName && <span className="error-text">{errors.companyName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="country">{t('order.country')} *</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={errors.country ? 'input-error' : ''}
                >
                  <option value="">{t('order.selectCountry')}</option>
                  {countriesList.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
                {errors.country && <span className="error-text">{errors.country}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="city">{t('order.city')} *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? 'input-error' : ''}
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">{t('order.email')} *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">{t('order.phone')} *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'input-error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="whatsapp">{t('order.whatsapp')} *</label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className={errors.whatsapp ? 'input-error' : ''}
                />
                {errors.whatsapp && <span className="error-text">{errors.whatsapp}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="order-product">{t('order.product')} *</label>
                <select
                  id="order-product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className={errors.product ? 'input-error' : ''}
                >
                  <option value="">{t('order.selectProduct')}</option>
                  <option value="orange">{t('order.orange')}</option>
                  <option value="lemon">{t('order.lemon')}</option>
                  <option value="clementine">{t('order.clementine')}</option>
                  <option value="mandarin">{t('order.mandarin')}</option>
                </select>
                {errors.product && <span className="error-text">{errors.product}</span>}
              </div>

              <div className="form-group">
                <label>{t('order.unit')} *</label>
                <div className="unit-toggle-group">
                  <button
                    type="button"
                    className={`unit-toggle-btn ${formData.unit === 'KG' ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, unit: 'KG' }))}
                  >
                    {t('order.kg')}
                  </button>
                  <button
                    type="button"
                    className={`unit-toggle-btn ${formData.unit === 'Containers' ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, unit: 'Containers' }))}
                  >
                    {t('order.container')}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="quantity">{t('order.quantity')} *</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder={formData.unit === 'KG' ? (formData.country === 'MA' ? 'Min 500' : 'Min 1000') : 'e.g. 1'}
                  className={errors.quantity ? 'input-error' : ''}
                />
                {errors.quantity && <span className="error-text">{errors.quantity}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="deliveryDate">{t('order.deliveryDate')} *</label>
                <input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className={errors.deliveryDate ? 'input-error' : ''}
                />
                {errors.deliveryDate && <span className="error-text">{errors.deliveryDate}</span>}
              </div>

              <div className="form-group form-group-full">
                <label htmlFor="message">{t('order.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="form-submit-container">
              <button type="submit" className="btn-accent form-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? t('order.sending') : t('order.submit')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
