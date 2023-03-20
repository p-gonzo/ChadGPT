import React from 'react';
import { Container, Typography } from '@mui/material';

const footerStyles = {
  footer: {
    backgroundColor: '#f5f5f5',
    padding: '0.5em',
    textAlign: 'center',
    width: '100%',
  },
  footerTitle: {
    fontWeight: 'bold',
    fontSize: '24px',
    marginBottom: '12px',
  },
  copyright: {
    fontSize: '14px',
    color: '#666',
  },
};

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={footerStyles.footer}>
      <Container maxWidth="lg">
        <Typography variant="h6" style={footerStyles.footerTitle}>
          ChadGPT
        </Typography>
        <Typography variant="subtitle1" style={footerStyles.copywright}>
          © {currentYear}
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
