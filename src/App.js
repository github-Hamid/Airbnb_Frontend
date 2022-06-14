import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import DetailedCard from './components/DetailedCard';
import Signup from "./components/signup"
import Signin from "./components/signin"
import Header from "./components/Header"
import { Route, Routes } from 'react-router-dom';

function App() {
 
  return (
    <div>
<Header />
      <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/detailed/:id' element={<DetailedCard />} />
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/signin' element={<Signin />} />
 </Routes>
    </div>
    
  );
}

export default App;
