import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComponent from './components/Navbar';
import { Container} from 'react-bootstrap';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Cancel from './pages/Cancel';
import Success from './pages/Success';
import Restaurant from './pages/Restaurant';

function App() {
  return (
    <Container>
      <NavbarComponent/>
      <BrowserRouter>
        <Routes>
          <Route index element={<Restaurant/>}/>
          <Route path="success" element={<Success/>}/>
          <Route path="cancel" element={<Cancel/>}/>
          <Route/>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
