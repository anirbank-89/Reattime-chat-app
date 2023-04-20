import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Register />} />
        <Route exact path="/chat" element={<Chat />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
