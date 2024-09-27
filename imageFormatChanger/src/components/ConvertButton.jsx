import React from 'react';
import { Button } from '@mui/material';

function ConvertButton({ onClick, disabled }) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
      fullWidth
    >
      Convert Image{disabled ? '' : 's'}
    </Button>
  );
}

export default ConvertButton;