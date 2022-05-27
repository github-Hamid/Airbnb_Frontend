import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import DetailedCard from './components/DetailedCard';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div>
      <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/detailed/:id' element={<DetailedCard />} />
 </Routes>
    </div>
    
  );
}

export default App;
