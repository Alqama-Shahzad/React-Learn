import React, { useState, useCallback, useEffect } from 'react';
import { Typography, Button, Slider, CircularProgress, Grid, Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import ImageUpload from './ImageUpload';
import imageCompression from 'browser-image-compression';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import CompressIcon from '@mui/icons-material/Compress';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const StyledButton = styled(Button)(({ theme, darkMode }) => ({
  padding: '6px 12px',
  borderRadius: '20px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.75rem',
  transition: 'all 0.3s ease',
  backgroundColor: darkMode ? '#4A5568' : '#8B7E6A',
  color: '#fff',
  '&:hover': {
    backgroundColor: darkMode ? '#2D3748' : '#6F6555',
  },
}));

function ImageCompressor({ darkMode }) {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [compressedImages, setCompressedImages] = useState([]);
  const [compressionLevel, setCompressionLevel] = useState(75);
  const [isCompressing, setIsCompressing] = useState(false);

  useEffect(() => {
    return () => {
      uploadedImages.forEach(img => URL.revokeObjectURL(img.preview));
      compressedImages.forEach(img => URL.revokeObjectURL(img.preview));
    };
  }, [uploadedImages, compressedImages]);

  const handleImageUpload = useCallback((files) => {
    const newImages = files.filter(file => {
      return !uploadedImages.some(img => 
        img.name === file.name && img.originalSize === file.size
      );
    }).map(file => ({
      file,
      name: file.name,
      originalSize: file.size,
      preview: URL.createObjectURL(file),
    }));

    if (newImages.length > 0) {
      setUploadedImages(prevImages => [...prevImages, ...newImages]);
      setCompressedImages([]);
    }
  }, [uploadedImages]);

  const handleCompress = useCallback(async () => {
    if (uploadedImages.length === 0) return;

    setIsCompressing(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: compressionLevel / 100,
      };

      const compressed = await Promise.all(uploadedImages.map(async (img) => {
        const compressedFile = await imageCompression(img.file, options);
        return {
          file: compressedFile,
          name: img.name,
          originalSize: img.originalSize,
          compressedSize: compressedFile.size,
          preview: URL.createObjectURL(compressedFile),
        };
      }));

      setCompressedImages(compressed);
    } catch (error) {
      console.error('Error compressing images:', error);
    } finally {
      setIsCompressing(false);
    }
  }, [uploadedImages, compressionLevel]);

  const handleDownloadAll = useCallback(async () => {
    const zip = new JSZip();
    compressedImages.forEach((img) => {
      zip.file(img.name, img.file);
    });
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'compressed_images.zip');
  }, [compressedImages]);

  const handleDownloadSingle = useCallback((img) => {
    saveAs(img.preview, `compressed_${img.name}`);
    setCompressedImages(prev => prev.filter(i => i.name !== img.name));
    setUploadedImages(prev => prev.filter(i => i.name !== img.name));
  }, []);

  const handleRemoveImage = useCallback((imgName) => {
    setUploadedImages(prev => {
      const updatedImages = prev.filter(img => img.name !== imgName);
      // Revoke the URL of the removed image
      const removedImage = prev.find(img => img.name === imgName);
      if (removedImage) {
        URL.revokeObjectURL(removedImage.preview);
      }
      return updatedImages;
    });
    setCompressedImages(prev => {
      const updatedCompressed = prev.filter(img => img.name !== imgName);
      // Revoke the URL of the removed compressed image
      const removedCompressed = prev.find(img => img.name === imgName);
      if (removedCompressed) {
        URL.revokeObjectURL(removedCompressed.preview);
      }
      return updatedCompressed;
    });
  }, []);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderImagePreview = () => {
    if (uploadedImages.length === 1 && compressedImages.length === 1) {
      return (
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={uploadedImages[0].preview}
              alt="Original"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={compressedImages[0].preview}
              alt="Compressed"
            />
          }
          className="rounded-lg shadow-md"
        />
      );
    } else if (uploadedImages.length > 0) {
      return (
        <Grid container spacing={2}>
          {uploadedImages.map((img) => (
            <Grid item xs={6} sm={4} md={3} key={img.name}>
              <Box 
                className="relative aspect-square overflow-hidden rounded-lg shadow-md group"
                sx={{
                  '&::after': {
                    content: '""',
                    display: 'block',
                    paddingBottom: '100%',
                  }
                }}
              >
                <img
                  src={img.preview}
                  alt={img.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <IconButton
                    className="text-white"
                    size="small"
                    onClick={() => handleRemoveImage(img.name)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
                <Typography 
                  variant="caption" 
                  className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-center truncate"
                >
                  {img.name}
                </Typography>
              </Box>
              <Typography variant="caption" className={`mt-1 block text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {formatFileSize(img.originalSize)}
              </Typography>
            </Grid>
          ))}
        </Grid>
      );
    } else {
      return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6`}
    >
      <Typography variant="h5" className={`mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Image Compressor
      </Typography>
      <Box className={`p-4 mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
        <ImageUpload onUpload={handleImageUpload} multiple={true} darkMode={darkMode} />
      </Box>
      
      {uploadedImages.length > 0 && (
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle1" className={`mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {uploadedImages.length === 1 ? 'Image Preview' : `Uploaded Images: ${uploadedImages.length}`}
            </Typography>
            {renderImagePreview()}
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
              <Box className="mb-4">
                <Typography id="compression-slider" gutterBottom className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Compression Level: {compressionLevel}%
                </Typography>
                <Slider
                  value={compressionLevel}
                  onChange={(_, newValue) => setCompressionLevel(newValue)}
                  aria-labelledby="compression-slider"
                  size="small"
                />
              </Box>
              <StyledButton
                onClick={handleCompress}
                disabled={isCompressing || uploadedImages.length === 0}
                darkMode={darkMode}
                className="w-full mb-4"
                startIcon={<CompressIcon />}
                size="small"
              >
                {isCompressing ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  'Compress All'
                )}
              </StyledButton>
              {compressedImages.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" className={`mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Compression Results
                  </Typography>
                  {compressedImages.map((img, index) => (
                    <Box key={index} className="mb-2">
                      <Typography variant="body2" className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} truncate`}>
                        {img.name}
                      </Typography>
                      <Box className="flex justify-between items-center mt-1">
                        <Typography variant="caption" className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {formatFileSize(img.compressedSize)} ({((img.originalSize - img.compressedSize) / img.originalSize * 100).toFixed(2)}% reduction)
                        </Typography>
                        <StyledButton
                          onClick={() => handleDownloadSingle(img)}
                          darkMode={darkMode}
                          size="small"
                          startIcon={<FileDownloadIcon />}
                        >
                          Download
                        </StyledButton>
                      </Box>
                    </Box>
                  ))}
                  {compressedImages.length > 1 && (
                    <StyledButton
                      onClick={handleDownloadAll}
                      darkMode={darkMode}
                      className="w-full mt-4"
                      startIcon={<FileDownloadIcon />}
                      size="small"
                    >
                      Download All (ZIP)
                    </StyledButton>
                  )}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </motion.div>
  );
}

export default ImageCompressor;
