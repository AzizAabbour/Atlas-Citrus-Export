import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import logoImg from '../../assets/logo.jpeg';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const offset = 72;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" id="footer">
      <div className="container footer-grid">
        
        <div className="footer-col brand-col">
          <a href="#home" className="footer-logo" onClick={(e) => handleNavClick(e, '#home')}>
            <img src={logoImg} alt="Atlas Citrus Logo" className="logo-img" />
            <span className="logo-text">Atlas<span className="logo-accent">Citrus</span></span>
          </a>
          <p className="footer-desc">{t('footer.description')}</p>
          <div className="footer-socials">
            <a href="#" className="social-icon" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://www.instagram.com/chtouis.export?igsh=cTg4cWFiYzA5ZnM4&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="social-icon" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="#" className="social-icon" aria-label="Twitter"><FaTwitter /></a>
          </div>
        </div>

        <div className="footer-col links-col">
          <h3>{t('footer.quickLinks')}</h3>
          <ul className="footer-links">
            <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>{t('nav.home')}</a></li>
            <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>{t('nav.about')}</a></li>
            <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')}>{t('nav.services')}</a></li>
            <li><a href="#products" onClick={(e) => handleNavClick(e, '#products')}>{t('nav.products')}</a></li>
            <li><a href="#order" onClick={(e) => handleNavClick(e, '#order')}>{t('nav.order')}</a></li>
            <li><a href="#gallery" onClick={(e) => handleNavClick(e, '#gallery')}>{t('nav.gallery')}</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>{t('nav.contact')}</a></li>
          </ul>
        </div>

        <div className="footer-col info-col">
          <h3>{t('footer.contactInfo')}</h3>
          <ul className="footer-info-list">
            <li>
              <span className="info-lbl">{t('contact.phone')}:</span>
              <a href="https://api.whatsapp.com/send?phone=212669128221" target="_blank" rel="noopener noreferrer">+212 669-128221</a>
            </li>
            <li>
              <span className="info-lbl">{t('contact.whatsapp')}:</span>
              <a href="https://api.whatsapp.com/send?phone=212669128221" target="_blank" rel="noopener noreferrer">+212 669-128221</a>
            </li>
            <li>
              <span className="info-lbl">{t('contact.email')}:</span>
              <a href="mailto:lowkickcharaf@gmail.com">lowkickcharaf@gmail.com</a>
            </li>
            <li>
              <span className="info-lbl">{t('contact.location')}:</span>
              <span>{t('contact.address')}</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} Atlas Citrus Export. {t('footer.rights')}</p>
          <div className="footer-bottom-links">
            <a href="#">{t('footer.privacy')}</a>
            <span className="divider">|</span>
            <a href="#">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
