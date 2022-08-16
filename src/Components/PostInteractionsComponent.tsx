import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFireFlameSimple,
    faMessage,
    faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import { PostsContextType, IUpdateCommentLikes, IUserProfile } from '../types';
import { usePostsContext } from '../context/postsContext';
import { useUserProfileContext } from '../context/profileContext';

type PostInteractionsContainerProps = {
    commentId: string;
    isComment: boolean;
    isLiked: boolean;
    amountOfLikes: number;
    amountOfComments: number;
};

interface InteractionButtonProps {
    color: string;
    backgroundColor: string;
};

interface LikeInteractionButtonProps extends InteractionButtonProps {
    isLiked: boolean;
};

type LikeInteractionButtonNumberProps = {
    isLiked: boolean
}

const PostInteractionsContainer = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 440px) {
        display: grid;
        grid-template-columns: repeat(4, auto);
        margin-bottom: 15px;
    }
`;

const InteractionButton = styled.button<InteractionButtonProps>`
    padding: 0;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    border: none;
    background: transparent;
    height:30px;
    width: 30px;
    border-radius: 100px;

    &:hover {
        background: ${(props) => props.backgroundColor}
        color: ${(props) => props.color}
        cursor: pointer;
    }
`;

const LikeInteractionButton = styled(InteractionButton)<LikeInteractionButtonProps>`
    color: ${(props) => props.isLiked ?  "#F44900;" : 'inherit;'}
    border-radius: 100px;
    
    &:hover{
        background: ${(props) => props.isLiked ?  "#F44900;" : "inherit"}
        color: ${(props) => props.isLiked ?  "white;" : props.color}
    }
`

const InteractionButtonNumber = styled.span`
    color: #12151d;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    margin-right: 2px;
`;

const LikeInteractionButtonNumber = styled(InteractionButtonNumber)<LikeInteractionButtonNumberProps>`
    color: ${(props) => props.isLiked ? '#F44900;' : 'inherit'}
`

const InteractionButtonText = styled.span`
    font-weight: 400;
    font-size: 12px;
`;

const InteractionButtonContainer = styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    margin-right: 5px;
    height: 30px;
    align-self: baseline;

    @media(max-width: 440px) {
        height: inherit;
        text-align: center;
    }
`;

const ViewsContainer = styled(InteractionButtonContainer)`
    @media(max-width: 440px) {
        display: flex;
        align-items: center;
        align-self: inherit;
    }
`

const PostInteractionsComponent = ({
    commentId,
    isComment,
    isLiked,
    amountOfLikes,
    amountOfComments,
}: PostInteractionsContainerProps) => {
    const { updateLikes } = usePostsContext() as PostsContextType;
    const { profileUsername } = useUserProfileContext() as IUserProfile;

    //Calls on the ContextAPI method to update this comment's "Likes"
    const handleLikeUpdate = () => {
        const updateLikesObject: IUpdateCommentLikes = {
            username: profileUsername,
            commentId: commentId,
        };

        updateLikes(updateLikesObject);
    };

    const renderViews = () => {
        if (!isComment) {
            return (
                <ViewsContainer data-testid="viewsContainer">
                    <InteractionButtonNumber>100</InteractionButtonNumber>
                    <InteractionButtonText>Views</InteractionButtonText>
                </ViewsContainer>
            );
        }
    };

    return (
        <PostInteractionsContainer>
            <InteractionButtonContainer>
                <LikeInteractionButton
                    data-testid="likeButton"
                    onClick={() => handleLikeUpdate()}
                    color='#F44900;'
                    backgroundColor='rgba(244, 73, 0, 0.3);'
                    isLiked={isLiked}
                >
                    <FontAwesomeIcon icon={faFireFlameSimple} />
                </LikeInteractionButton>
                <LikeInteractionButtonNumber isLiked={isLiked}>{amountOfLikes}</LikeInteractionButtonNumber>
                <InteractionButtonText>Hypes</InteractionButtonText>
            </InteractionButtonContainer>
            <InteractionButtonContainer>
                <InteractionButton
                    color='#006CFA;'
                    backgroundColor='rgba(0, 108, 250, 0.3);'
                >
                    <FontAwesomeIcon icon={faMessage} />
                </InteractionButton>
                <InteractionButtonNumber>{amountOfComments}</InteractionButtonNumber>
                <InteractionButtonText>
                    {isComment ? 'Replies' : 'Comment'}
                </InteractionButtonText>
            </InteractionButtonContainer>
            <InteractionButtonContainer>
                <InteractionButton
                    color='rgba(18, 21, 29, 0.87);'
                    backgroundColor='rgba(18, 21, 29, 0.3);'
                >
                    <FontAwesomeIcon icon={faShareNodes} />
                </InteractionButton>
                <InteractionButtonNumber>13</InteractionButtonNumber>
                <InteractionButtonText>Shares</InteractionButtonText>
            </InteractionButtonContainer>
            {renderViews()}
        </PostInteractionsContainer>
    );
};

export default PostInteractionsComponent;
