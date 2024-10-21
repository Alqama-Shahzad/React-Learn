import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';

const StyledSelect = styled(Select)(({ theme, darkMode }) => ({
  width: '100%',
  borderRadius: '12px',
  backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
  color: darkMode ? '#fff' : '#333',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiSelect-icon': {
    color: darkMode ? '#fff' : '#333',
  },
}));

function FormatSelection({ onFormatChange, darkMode }) {
  const handleChange = (event) => {
    onFormatChange(event.target.value);
  };

  return (
    <div className="mb-4">
      <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
        Output Format
      </label>
      <StyledSelect
        defaultValue="jpeg"
        onChange={handleChange}
        darkMode={darkMode}
      >
        <MenuItem value="jpeg">JPEG</MenuItem>
        <MenuItem value="png">PNG</MenuItem>
        <MenuItem value="gif">GIF</MenuItem>
        <MenuItem value="bmp">BMP</MenuItem>
        <MenuItem value="webp">WebP</MenuItem>
      </StyledSelect>
    </div>
  );
}

export default FormatSelection;
