import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { JSON_API } from '../services/api';

// Components
import Contacts from '../components/Contacts';

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

  useEffect(() => {
    let chatUser;

    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    } else {
      chatUser = JSON.parse(localStorage.getItem('chat-app-user'));
    }

    setCurrentUser(chatUser);

    if (chatUser && chatUser.isAvatarImageSet === true) {
      const getContacts = async () => {
        let res = await JSON_API['getContacts']();

        if (res.isSuccess) {
          setContacts(res.data.data);
        } else {
          navigate('/set-avatar');
        }
      };

      getContacts();
    }
  }, []);

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} />
      </div>
    </Container>
  );
};

export default Chat;
