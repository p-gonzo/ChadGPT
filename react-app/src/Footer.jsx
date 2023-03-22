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
    fontSize: '1em',
    marginBottom: '0.5em',
  },
  copyright: {
    fontSize: '1em',
    color: '#666',
  },
};

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={footerStyles.footer}>
      <Container maxWidth="lg">
        <Typography variant="subtitle1" style={footerStyles.footerTitle}>
        A Cha(d)tBot that leverages <a href='https://crfm.stanford.edu/2023/03/13/alpaca.html'>Stanford's Alpaca</a> Model.
        </Typography>
        <Typography variant="subtitle1" style={footerStyles.copywright}>
         ChadGPT © {currentYear}
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
