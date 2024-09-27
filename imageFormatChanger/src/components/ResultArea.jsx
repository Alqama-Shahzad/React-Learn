import React from 'react';
import { Typography, Button } from '@mui/material';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function ResultArea({ convertedImages, selectedFormat }) {
  const handleDownload = (dataUrl, originalName, id) => {
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `${id}_${originalName.split('.')[0]}.${selectedFormat}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    
    convertedImages.forEach((image) => {
      const fileName = `${image.id}_${image.originalName.split('.')[0]}.${selectedFormat}`;
      const base64Data = image.dataUrl.split(',')[1];
      zip.file(fileName, base64Data, { base64: true });
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `converted_images.zip`);
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6">
          Converted Images
        </Typography>
        {convertedImages.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadAll}
          >
            Download All
          </Button>
        )}
      </div>
      {convertedImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {convertedImages.map((image, index) => (
            <div key={image.id} className="flex flex-col items-center">
              <img src={image.dataUrl} alt={`Converted ${index + 1}`} className="max-w-full h-auto mb-2" />
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDownload(image.dataUrl, image.originalName, image.id)}
              >
                Download
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <Typography variant="body1">No converted images yet.</Typography>
      )}
    </div>
  )
}

export default ResultArea;