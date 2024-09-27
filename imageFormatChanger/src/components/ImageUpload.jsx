import React from 'react'
import { Button } from '@mui/material'

function ImageUpload({ onUpload, multiple }) {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    onUpload(files)
  }

  return (
    <div>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple={multiple}
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span">
          Upload Image{multiple ? 's' : ''}
        </Button>
      </label>
    </div>
  )
}

export default ImageUpload