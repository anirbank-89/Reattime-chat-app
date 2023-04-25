import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

// Pages
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';

// Components
import DataProvider from './context/DataProvider';
import SetAvatar from './components/SetAvatar';

function App() {
  useEffect(() => {
    return () => {
      window.onbeforeunload = function () {
        localStorage.clear();
      };
    };
  });

  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/chat" element={<Chat />} />
          <Route exact path="/set-avatar" element={<SetAvatar />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
