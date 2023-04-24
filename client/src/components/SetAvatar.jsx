import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Buffer } from 'buffer';
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

import 'react-toastify/dist/ReactToastify.css';

import loader from '../assets/loader.gif';
// import { JSON_API } from '../services/api';
import { AVATAR_GEN } from '../constants/data';

const Container = styled.div``;

const toastOptions = {
  position: 'bottom-right',
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
};

const SetAvatar = () => {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    const data = [];
    async function fetchImg() {
      for (let i = 0; i < 4; i++) {
        // Generate random avatars
        // await axios
        //   .get(`${AVATAR_GEN}/${Math.round(Math.random() * 1000)}`)

        // https://www.dicebear.com/how-to-use/js-library
        const avatar = createAvatar(lorelei, {
          seed: 'Felix',
          flip: 'false',
        });

        await avatar
          .toDataUri()
          .then((file) => {
            console.log('image', file);
            // const buffer = new Buffer(file.data);
            // data.push(buffer.toString('base64'));
            data.push(file);
          })
          .catch((err) => {
            console.log('Avatar get error due to ', err);
          });
      }
    }
    fetchImg();
    setAvatars(data);
    setIsLoading(false);
  }, []);

  const setProfilePicture = async () => {};

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick an avatar as your profile picture.</h1>
          <div className="avatars">
            {avatars.map((item, idx) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar == idx ? 'selected' : ''
                  }`}
                  key={idx}
                >
                  <img
                    src={item}
                    alt="avatar"
                    key={item}
                    onClick={() => setSelectedAvatar(idx)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default SetAvatar;
