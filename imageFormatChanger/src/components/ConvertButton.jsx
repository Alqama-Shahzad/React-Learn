import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { ThreeDots } from 'react-loader-spinner';

const StyledButton = styled(Button)(({ theme, darkMode }) => ({
  width: '100%',
  padding: '12px 24px',
  borderRadius: '50px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  backgroundColor: darkMode ? '#4A5568' : '#8B7E6A',
  color: '#fff',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: darkMode ? '#2D3748' : '#6F6555',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  },
  '&.Mui-disabled': {
    backgroundColor: darkMode ? '#2C3E50' : '#C5BDB1',
    color: 'rgba(255, 255, 255, 0.3)',
  },
}));

function ConvertButton({ onClick, disabled, darkMode, isLoading }) {
  const handleClick = () => {
    onClick();
    // Ensure the loader is visible for at least 1 second
    setTimeout(() => {
      // This timeout will be cleared if the actual conversion takes longer than 1 second
    }, 1000);
  };

  return (
    <motion.div
      style={{ position: 'relative' }}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.03 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
    >
      <StyledButton
        onClick={handleClick}
        disabled={disabled || isLoading}
        darkMode={darkMode}
      >
        {isLoading ? (
          <ThreeDots
            height="24"
            width="50"
            radius="9"
            color="#ffffff"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        ) : (
          `Convert Image${disabled ? '' : 's'}`
        )}
      </StyledButton>
    </motion.div>
  );
}

export default ConvertButton;
