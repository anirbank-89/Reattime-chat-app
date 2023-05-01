import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { JSON_API } from '../services/api';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  const getContacts = async () => {
    return await JSON_API['getContacts'];
  };

  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')));
    }

    if (currentUser && currentUser.isAvatarImageSet === true) {
      let res = getContacts();
      console.log('contacts', res);

      if (res.isSuccess) {
        setContacts(res.data);
      } else {
        navigate('/set-avatar');
      }
    }
  }, []);

  return (
    <Container>
      <div className="container">Chat</div>
    </Container>
  );
};

export default Chat;
