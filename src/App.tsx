import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Characters from './components/Characters';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Main}/>
        <Route path='/:id' Component={Characters} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
