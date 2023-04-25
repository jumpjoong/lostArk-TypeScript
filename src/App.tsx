import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Characters from './components/Characters';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/:id' element={<Characters />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
