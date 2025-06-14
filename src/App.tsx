import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductsSection from './components/ProductsSection';
import About from './components/About';
import WhyLaddupallem from './components/WhyLaddupallem';
import Contact from './components/Contact';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ea580c', // Orange-600
    },
    secondary: {
      main: '#f97316', // Orange-500
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-white">
        <Header />
        <Hero />
        <ProductsSection />
        <About />
        <WhyLaddupallem />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;