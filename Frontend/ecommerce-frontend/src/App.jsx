import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails.jsx';
import Footer from './components/Footer.jsx';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="main-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
        </div>
        <Footer />
      </Router> 
    </>
  );
}

export default App;
