import React, { useCallback } from 'react';
import { Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';

const StyledButton = styled(Button)(({ theme, darkMode, variant }) => ({
  padding: '8px 16px',
  borderRadius: '50px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.8rem',
  transition: 'all 0.3s ease',
  backgroundColor: variant === 'primary' 
    ? (darkMode ? '#4A5568' : '#8B7E6A')
    : 'transparent',
  color: darkMode ? '#fff' : (variant === 'primary' ? '#fff' : '#333'),
  border: variant === 'primary' ? 'none' : `1px solid ${darkMode ? '#4A5568' : '#8B7E6A'}`,
  boxShadow: variant === 'primary' ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
  '&:hover': {
    backgroundColor: variant === 'primary'
      ? (darkMode ? '#2D3748' : '#6F6555')
      : (darkMode ? 'rgba(74, 85, 104, 0.2)' : 'rgba(139, 126, 106, 0.2)'),
    boxShadow: variant === 'primary' ? '0 6px 8px rgba(0, 0, 0, 0.15)' : 'none',
  },
}));

function ResultArea({ convertedImages, onRemove, onClearAll, selectedFormat, darkMode }) {
  const handleDownload = useCallback((dataUrl, originalName, id) => {
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `${originalName.split('.')[0]}.${selectedFormat}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    onRemove(id)
  }, [onRemove, selectedFormat])

  const handleDownloadAll = useCallback(async () => {
    const zip = new JSZip();
    
    convertedImages.forEach((image) => {
      const fileName = `${image.originalName.split('.')[0]}.${selectedFormat}`;
      const base64Data = image.dataUrl.split(',')[1];
      zip.file(fileName, base64Data, { base64: true });
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `converted_images.zip`);
    
    onClearAll();
  }, [convertedImages, selectedFormat, onClearAll])

  const handleRemove = (id) => {
    onRemove(id);
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6" className={`font-light ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Converted Images
        </Typography>
        {convertedImages.length > 0 && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <StyledButton
              variant="primary"
              onClick={handleDownloadAll}
              darkMode={darkMode}
              startIcon={<GetAppIcon />}
            >
              Download All
            </StyledButton>
          </motion.div>
        )}
      </div>
      {convertedImages.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {convertedImages.map((image, index) => (
            <motion.div 
              key={image.id} 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={image.dataUrl} alt={`Converted ${index + 1}`} className="max-w-full h-auto mb-2 rounded-lg shadow-md" />
              <div className="flex space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StyledButton
                    variant="primary"
                    size="small"
                    onClick={() => handleDownload(image.dataUrl, image.originalName, image.id)}
                    darkMode={darkMode}
                    startIcon={<GetAppIcon />}
                  >
                    Download
                  </StyledButton>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StyledButton
                    variant="secondary"
                    size="small"
                    onClick={() => handleRemove(image.id)}
                    darkMode={darkMode}
                    startIcon={<DeleteIcon />}
                  >
                    Remove
                  </StyledButton>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Typography variant="body1" className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No converted images yet.</Typography>
      )}
    </div>
  )
}

export default React.memo(ResultArea);
