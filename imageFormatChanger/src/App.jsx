import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import ImageUpload from './components/ImageUpload'
import FormatSelection from './components/FormatSelection'
import ConvertButton from './components/ConvertButton'
import ResultArea from './components/ResultArea'
import './App.css'
import { v4 as uuidv4 } from 'uuid' // Add this import

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [uploadedImages, setUploadedImages] = useState([])
  const [convertedImages, setConvertedImages] = useState([])
  const [selectedFormat, setSelectedFormat] = useState('jpeg')
  const [convertedImage, setConvertedImage] = useState(null)

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  })

  const handleThemeToggle = () => {
    setDarkMode(!darkMode)
  }

  const handleImageUpload = (images) => {
    setUploadedImages(images)
  }

  const handleFormatChange = (format) => {
    setSelectedFormat(format)
  }

  const handleConvert = () => {
    if (uploadedImages.length === 0) {
      alert('Please upload at least one image first')
      return
    }

    const convertPromises = uploadedImages.map((file) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0)

          let mimeType
          switch (selectedFormat) {
            case 'jpeg':
              mimeType = 'image/jpeg'
              break
            case 'png':
              mimeType = 'image/png'
              break
            case 'webp':
              mimeType = 'image/webp'
              break
            case 'gif':
              mimeType = 'image/gif'
              break
            case 'bmp':
              mimeType = 'image/bmp'
              break
            default:
              mimeType = 'image/jpeg'
          }

          const dataUrl = canvas.toDataURL(mimeType)
          resolve({
            dataUrl,
            originalName: file.name,
            id: uuidv4()
          })
        }
        img.src = URL.createObjectURL(file)
      })
    })

    Promise.all(convertPromises).then((results) => {
      setConvertedImages(results)
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`min-h-screen ${darkMode ? 'dark-gradient' : 'light-gradient'} flex items-center justify-center`}>
        <Container maxWidth="md" className="py-8">
          <Box className="backdrop-blur-md bg-white/30 dark:bg-black/30 rounded-xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-8">
              <Typography variant="h4" component="h1" className="font-bold text-gray-800 dark:text-white">
                Image Format Converter
              </Typography>
              <div className="flex items-center">
                <Switch checked={darkMode} onChange={handleThemeToggle} />
                <Typography variant="body2" className="ml-2 text-gray-600 dark:text-gray-300">
                  {darkMode ? 'Dark' : 'Light'}
                </Typography>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ImageUpload onUpload={handleImageUpload} multiple={true} />
              </div>
              <div className="flex flex-col justify-between">
                <FormatSelection onFormatChange={handleFormatChange} />
                <div className="mt-4"> {/* Add this div for spacing */}
                  <ConvertButton onClick={handleConvert} disabled={uploadedImages.length === 0} />
                </div>
              </div>
            </div>
            <ResultArea convertedImages={convertedImages} selectedFormat={selectedFormat} />
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default App
