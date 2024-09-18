import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComponent from './components/Navbar';
import { Container} from 'react-bootstrap';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Cancel from './pages/Cancel';
import Success from './pages/Success';
import Restaurant from './pages/RestaurantPage';
import CartProvider from './components/Cart';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <CartProvider>
      <Container>
        <NavbarComponent/>
        <BrowserRouter>
          <Routes>
            <Route index element={<Restaurant/>}/>
            <Route path="success" element={<Success/>}/>
            <Route path="cancel" element={<Cancel/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="login" element={<Login/>}/>
            <Route/>
          </Routes>
        </BrowserRouter>
      </Container>
    </CartProvider>
  );
}

export default App;
