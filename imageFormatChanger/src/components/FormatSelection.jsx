import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function FormatSelection({ onFormatChange }) {
  const handleChange = (event) => {
    onFormatChange(event.target.value);
  };

  return (
    <FormControl fullWidth className="bg-white/50 dark:bg-black/50 rounded-md">
      <InputLabel id="format-select-label">Output Format</InputLabel>
      <Select
        labelId="format-select-label"
        id="format-select"
        defaultValue="jpeg"
        label="Output Format"
        onChange={handleChange}
      >
        <MenuItem value="jpeg">JPEG</MenuItem>
        <MenuItem value="png">PNG</MenuItem>
        <MenuItem value="gif">GIF</MenuItem>
        <MenuItem value="bmp">BMP</MenuItem>
        <MenuItem value="webp">WebP</MenuItem>
      </Select>
    </FormControl>
  );
}

export default FormatSelection;