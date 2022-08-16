import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faVideo } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { transformPostMessage } from '../utils';
import { useUserProfileContext }from '../context/profileContext'
import { usePostsContext } from '../context/postsContext';
import { IUserProfile, PostsContextType } from '../types';

const ActionButton = styled.button`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: rgba(18, 21, 29, 0.6);
  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: rgba(25, 118, 210, 0.04);
  }
`;

const PostButton = styled.button`
  display: flex;
  background: #006cfa;
  color: white;
  gap: 10px;
  border: 1px solid;
  border-radius: 8px;
  width: 80px;
  height: 39px;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 12px;
  line-height: 125%;

  &:hover {
    cursor: pointer;
    background-color: #1565c0;
  }
`;

const PostTweetContainer = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 16px;
  border: 1px solid #ced7e7;
  border-radius: 10px;
  justify-content: center;
  margin-top: 20px;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TextInput = styled.textarea`
  padding: 15px 20px;
  box-sizing: border-box;
  border: 1px solid #ced7e7;
  border-radius: 8px;
  width: 100%;
  resize: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  display: flex;
  align-items: center;

  &:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
  }
`;
const PostTweetButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PostTweetComponent = () => {
    const [ postMessage, setPostMessage ] = useState("")
    const { savePost } = usePostsContext() as PostsContextType;
    const { profileUsername } = useUserProfileContext() as IUserProfile;

    const handleSubmit = () => {

      // Does not allow submission of empty comment
      // Can add validation here in the future
      if(postMessage.trim().length === 0)
        return;

        const transformedPayload = transformPostMessage(postMessage, profileUsername);
        savePost(transformedPayload);
        setPostMessage("");
    }

  return (
    <PostTweetContainer>
      <TextInput data-testid="textInput" onChange={(e) => {setPostMessage(e.target.value)}} value={postMessage} placeholder="What's on your mind?"></TextInput>
      <PostTweetButtonsContainer>
        <ActionButtonsContainer>
          <ActionButton>
            <FontAwesomeIcon icon={faCamera} /> Add Media
          </ActionButton>
          <ActionButton>
            <FontAwesomeIcon icon={faVideo} /> Go Live
          </ActionButton>
        </ActionButtonsContainer>
        <PostButton data-testid="postButton" onClick={handleSubmit}>Post</PostButton>
      </PostTweetButtonsContainer>
    </PostTweetContainer>
  );
};

export default PostTweetComponent;
