import styled from 'styled-components';
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
`;

const ChatInput = ({ handleSendMsg }) => {
  return (
    <Container>
      <div className="btn-container">
        <div className="emoji">
          <BsEmojiSmileFill />
        </div>
      </div>
      <form action="" className="input-container">
        <input
          type="text"
          name=""
          id=""
          placeholder="Type your message here..."
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

export default ChatInput;
