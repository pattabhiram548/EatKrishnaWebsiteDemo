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
import Testimonials from './components/Testimonials';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import CartPage from './components/CartPage';
import PaymentPlaceholder from './components/PaymentPlaceholder';
import PaymentOptionsPage from './components/PaymentOptionsPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import WhyEatKrishnaPage from './components/WhyEatKrishnaPage';
import MilletsFoodPage from './components/MilletsFoodPage';

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
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-white">
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <ProductsSection />
                    <About />
                    <WhyLaddupallem />
                    <Testimonials />
                    <Contact />
                    <Footer />
                  </>
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/why-eatkrishna" element={<WhyEatKrishnaPage />} />
              <Route path="/laddus-menu" element={<MilletsFoodPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/payment-options" element={<PaymentOptionsPage />} />
              <Route path="/payment-processing" element={<PaymentPlaceholder />} />
              <Route path="/payment-success" element={<PaymentPlaceholder />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;