import React, { useCallback } from 'react'
import { Button, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { motion } from 'framer-motion'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useDropzone } from 'react-dropzone'

const StyledButton = styled(Button)(({ theme, darkMode }) => ({
  padding: '10px 20px',
  borderRadius: '50px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.9rem',
  transition: 'all 0.3s ease',
  backgroundColor: darkMode ? '#4A5568' : '#8B7E6A',
  color: '#fff',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: darkMode ? '#2D3748' : '#6F6555',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  },
}));

const DropzoneArea = styled('div')(({ theme, isDragActive, darkMode }) => ({
  border: `2px dashed ${isDragActive ? (darkMode ? '#4A5568' : '#8B7E6A') : (darkMode ? '#2D3748' : '#6F6555')}`,
  borderRadius: '10px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: isDragActive ? (darkMode ? 'rgba(74, 85, 104, 0.2)' : 'rgba(139, 126, 106, 0.2)') : 'transparent',
}));

function ImageUpload({ onUpload, multiple, darkMode }) {
  const onDrop = useCallback((acceptedFiles) => {
    onUpload(acceptedFiles)
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*', multiple })

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <DropzoneArea {...getRootProps()} isDragActive={isDragActive} darkMode={darkMode}>
        <input {...getInputProps()} />
        <CloudUploadIcon fontSize="large" color={darkMode ? "primary" : "inherit"} />
        <Typography variant="h6" className={`mt-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {isDragActive ? 'Drop the images here' : 'Drag & drop images here, or click to select'}
        </Typography>
        <StyledButton
          component="span"
          darkMode={darkMode}
          className="mt-4"
        >
          Upload Image{multiple ? 's' : ''}
        </StyledButton>
      </DropzoneArea>
    </motion.div>
  )
}

export default ImageUpload
