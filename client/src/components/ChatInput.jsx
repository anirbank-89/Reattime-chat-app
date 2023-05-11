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
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  .btn-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #fff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -450px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .epr-category-nav {
          button {
            filter: contrast(0);
          }
        }
        .epr-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .epr-body {
          background-color: #080420;
          &::-webkit-scrollbar {
            width: 3px;
          }

          /* Track */
          &::-webkit-scrollbar-track {
            // background: #f1f1f1;
          }

          /* Handle */
          &::-webkit-scrollbar-thumb {
            background: #888;
          }

          /* Handle on hover */
          &::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-content: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
        &:focus {
          outline: none;
        }
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');

  const hideAndShowEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji, event) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = () => {};

  return (
    <Container>
      <div className="btn-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={hideAndShowEmojiPicker} />
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiClick={(emoji, event) => handleEmojiSelect(emoji, event)}
            />
          )}
        </div>
      </div>
      <form action="" className="input-container">
        <input
          type="text"
          name="msg"
          id=""
          placeholder="Type your message here..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

export default ChatInput;
