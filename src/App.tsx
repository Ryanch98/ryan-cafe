import Home from './Pages/home';
import About from './Pages/about';
import Category from './Pages/category';
import Cart from './Pages/cart';
import NotFound from './Pages/NotFound';
import CoffeeGuide from './Pages/CoffeeGuide';
import Layout from './Components/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/about" element={<About />} />
          <Route path="/coffee-guide" element={<CoffeeGuide />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
