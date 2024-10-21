import React from 'react';
import { motion } from 'framer-motion';

const Footer = React.memo(({ darkMode }) => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`py-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
    >
      <div className="container mx-auto flex justify-center items-center">
        <img 
          src={darkMode ? '/Asset 6.svg' : '/Asset 5.svg'} 
          alt="Logo" 
          className="h-12"
        />
      </div>
    </motion.footer>
  );
});

export default Footer;
