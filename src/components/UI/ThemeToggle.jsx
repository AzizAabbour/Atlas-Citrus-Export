import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './ThemeToggle.css';

export default function ThemeToggle({ theme, toggle }) {
  return (
    <motion.button
      className="theme-toggle"
      id="theme-toggle"
      onClick={toggle}
      whileTap={{ scale: 0.85 }}
      aria-label="Toggle theme"
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <FiMoon /> : <FiSun />}
    </motion.button>
  );
}
