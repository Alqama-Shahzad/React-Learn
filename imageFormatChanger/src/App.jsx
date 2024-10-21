import { useState, useCallback, useMemo } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './App.css'

import ImageUpload from './components/ImageUpload'
import FormatSelection from './components/FormatSelection'
import ConvertButton from './components/ConvertButton'
import ResultArea from './components/ResultArea'
import ImageCompressor from './components/ImageCompressor'
import { v4 as uuidv4 } from 'uuid'
import DeleteIcon from '@mui/icons-material/Delete'
import CircularProgress from '@mui/material/CircularProgress'
import { ThreeDots } from 'react-loader-spinner'

function NavLink({ to, children, darkMode }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
        ${darkMode ? 'text-white' : 'text-gray-800'}
        ${isActive ? 'font-bold' : 'font-normal'}
        hover:text-blue-500 transition-colors duration-200
        relative
      `}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
          layoutId="underline"
          initial={false}
        />
      )}
    </Link>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [uploadedImages, setUploadedImages] = useState([])
  const [convertedImages, setConvertedImages] = useState([])
  const [selectedFormat, setSelectedFormat] = useState('jpeg')
  const [isLoading, setIsLoading] = useState(false)
  const [originalImages, setOriginalImages] = useState([])

  // Add these functions (they were missing in the previous snippet)
  const handleThemeToggle = () => {
    setDarkMode(!darkMode)
  }

  const handleImageUpload = useCallback((files) => {
    const newImages = files.map(file => ({
      id: uuidv4(),
      file,
      name: file.name
    }))
    setUploadedImages(prevImages => [...prevImages, ...newImages])
    setOriginalImages(prevImages => [...prevImages, ...newImages])
  }, [])

  const handleFormatChange = (format) => {
    setSelectedFormat(format)
  }

  const handleConvert = useCallback(async () => {
    setIsLoading(true);
    const startTime = Date.now();
    
    const converted = await Promise.all(originalImages.map(async (img) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (img.file.type === 'image/svg+xml') {
        // Handle SVG conversion
        const svgBlob = new Blob([await img.file.arrayBuffer()], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(svgBlob);
        const image = new Image();
        await new Promise((resolve) => {
          image.onload = resolve;
          image.src = url;
        });
        // Set a larger canvas size for SVGs to maintain quality
        canvas.width = image.width * 2;
        canvas.height = image.height * 2;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
      } else {
        // Handle other image types
        const bitmap = await createImageBitmap(img.file);
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        ctx.drawImage(bitmap, 0, 0);
      }
      
      // Adjust quality for JPEG
      const quality = selectedFormat === 'jpeg' ? 0.95 : 1;
      
      return {
        id: uuidv4(),
        dataUrl: canvas.toDataURL(`image/${selectedFormat}`, quality),
        originalName: img.name
      };
    }));

    const endTime = Date.now();
    const conversionTime = endTime - startTime;
    
    // Ensure the loading state lasts for at least 1 second
    if (conversionTime < 1000) {
      await new Promise(resolve => setTimeout(resolve, 1000 - conversionTime));
    }

    setConvertedImages(converted);
    setIsLoading(false);
  }, [originalImages, selectedFormat]);

  const handleRemoveConverted = useCallback((id) => {
    setConvertedImages(prevImages => prevImages.filter(img => img.id !== id))
  }, [])

  const handleClearAllConverted = useCallback(() => {
    setConvertedImages([])
    setOriginalImages([])
    setUploadedImages([])
  }, [])

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#121212' : '#FAF7F0',
      },
      primary: {
        main: darkMode ? '#4A5568' : '#8B7E6A',
      },
    },
  }), [darkMode])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-light-bg'}`}
        >
          <header className={`py-4 ${darkMode ? 'bg-gray-800' : 'bg-[#E5E0D5]'}`}>
            <Container maxWidth="md" className="flex justify-between items-center">
              <img 
                src={darkMode ? '/Asset 6.svg' : '/Asset 5.svg'} 
                alt="Logo" 
                className="h-8"
              />
              <nav className="flex-grow flex justify-center">
                <ul className="flex space-x-8">
                  <li>
                    <NavLink to="/" darkMode={darkMode}>
                      Format Converter
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/compress" darkMode={darkMode}>
                      Image Compressor
                    </NavLink>
                  </li>
                </ul>
              </nav>
              <IconButton onClick={handleThemeToggle} color="inherit">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Container>
          </header>
          
          <Container maxWidth="md" className="flex-grow">
            <Routes>
              <Route path="/" element={
                <>
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    className={`font-light ${darkMode ? 'text-white' : 'text-gray-800'} text-center my-8`}
                  >
                    Image Format Converter
                  </Typography>
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}
                  >
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
                    >
                      <div className="flex flex-col space-y-4">
                        <ImageUpload 
                          onUpload={handleImageUpload} 
                          multiple={true} 
                          darkMode={darkMode} 
                        />
                        <Typography variant="body2" className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                          {uploadedImages.length} image(s) selected
                        </Typography>
                      </div>
                      <div className="flex flex-col justify-between space-y-4">
                        <FormatSelection onFormatChange={handleFormatChange} darkMode={darkMode} />
                        <ConvertButton 
                          onClick={handleConvert} 
                          disabled={uploadedImages.length === 0} 
                          darkMode={darkMode}
                          isLoading={isLoading}
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <ResultArea 
                        convertedImages={convertedImages} 
                        onRemove={handleRemoveConverted}
                        onClearAll={handleClearAllConverted}
                        selectedFormat={selectedFormat} 
                        darkMode={darkMode} 
                      />
                    </motion.div>
                  </motion.div>
                </>
              } />
              <Route path="/compress" element={
                <>
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    className={`font-light ${darkMode ? 'text-white' : 'text-gray-800'} text-center my-8`}
                  >
                    Image Compressor
                  </Typography>
                  <ImageCompressor darkMode={darkMode} />
                </>
              } />
            </Routes>
          </Container>
        </motion.div>
      </ThemeProvider>
    </Router>
  )
}

export default App
