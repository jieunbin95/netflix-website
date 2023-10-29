import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import MovieDetail from './Pages/MovieDetail';
import Navigation from './Component/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
     <Navigation/>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/movies' element={<Movies/>}></Route>
      <Route path='/movies/:id' element={<MovieDetail/>}></Route>
     </Routes>
    </>
    
  );
}

export default App;
