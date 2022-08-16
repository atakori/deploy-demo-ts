import { useState } from 'react';
import { usePostsContext } from '../context/postsContext';
import { useUserProfileContext } from '../context/profileContext';
import { IUserProfile, PostsContextType } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { transformPostMessage } from '../utils';

const CreateCommentContainer = styled.div`
    width: 100%;
    background-color: #f1f4f8;
    border-radius: 100px;
    min-height: 40px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 10px;
    margin-bottom: 16px;
`;

const InputField = styled.span`
    color: rgba(18, 21, 29, 0.6);
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    width: 90%;
    padding: 10px;

    &[placeholder]:empty:before {
        content: attr(placeholder);
    }

    &:focus-visible {
        outline: none;
    }

    @media(max-width: 440px) {
        width: 83%;
    }
`;

const ActionButton = styled.button`
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
    color: rgba(18, 21, 29, 0.6);
    background-color: transparent;
    border: none;
    padding: 0;

    &:hover {
        cursor: pointer;
        background-color: rgba(25, 118, 210, 0.04);
    }
`;

const CreateCommentComponent = ({ parentId }: any) => {
    const { savePost } = usePostsContext() as PostsContextType;
    const { profileUsername } = useUserProfileContext() as IUserProfile;
    const [ commentMessage, setCommentMessage ] = useState("");

    // Submits the Comment to the savePost API
    const handleSubmit = (e: KeyboardEvent) => {
        if(e.key === 'Enter') {
            e.preventDefault();

            // Does not allow empty messages
            // Validation can be added here in the future
            if(commentMessage.trim().length === 0)
                return;

            const postMessage = transformPostMessage(commentMessage, profileUsername, parentId)
            savePost(postMessage);

            // Erase Comment After successful submission
            const element = e.currentTarget as Element

            if (element) 
                element.textContent = ""
            setCommentMessage("");
        }
    }

    return (
        <CreateCommentContainer>
            <ActionButton>
                <FontAwesomeIcon icon={faMessage} />
            </ActionButton>
            <InputField
                data-testid="commentInputField"
                placeholder='Add Comment'
                onInput={(e) =>
                    setCommentMessage(e.currentTarget.textContent || '')
                }
                onKeyDown={(e : any)=> {handleSubmit(e)}}
                contentEditable
            ></InputField>
            <ActionButton>
                <FontAwesomeIcon icon={faCirclePlus} />
            </ActionButton>
        </CreateCommentContainer>
    );
};

export default CreateCommentComponent;
