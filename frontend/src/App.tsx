import React from 'react';
import Navbar from './Components/widget/Navigation';
import Home from './pages/Home';
const App: React.FC = ()=>{
  return (
    <div className='font-sora'>
        <Navbar />
        <Home />
    </div>
  );
}

export default App;