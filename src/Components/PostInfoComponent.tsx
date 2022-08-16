import styled from 'styled-components';
import { PROFILEPHOTOURL } from '../constants';
import TimeAgo from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Avatar from '@mui/material/Avatar';

const ProfileFeedHeaderContainer = styled.div`
    display: flex;
    align-items: center;
`;

const PosterInformationContainer = styled.div`
    margin-left: 5px;

    time {
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
        color: rgba(18, 21, 29, 0.6);
    }
`;

const PosterInformationHeader = styled.h2<PosterInformationHeaderProps>`
    margin: 0;
    font-weight: 500;
    font-size: ${props => props.isComment ? '16px;' : '18px;'}
    line-height: ${props => props.isComment ? '22px;' : '24px;'}
    color: #12151d;
`

const PostMessageContainer = styled.div`
    display: flex;
`;


const PostMessage = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: rgba(18, 21, 29, 0.87);
`;

const PostInfoContainer = styled.div<PostInfoContainerProps>`
    border-top: ${props => props.isComment ? '1px solid #CED7E7;' : 'none;'}
    padding: ${props => props.isComment ? '16px 0px;' : 'none;'}
`

interface CommentInfo {
    username: string;
    dateCreated: Date;
    message: string;
    isComment: boolean;
}

type PosterInformationHeaderProps = {
    isComment: boolean;
}

type PostInfoContainerProps = {
    isComment: boolean;
}

// Adding locale Time for "Time Since Posted"
TimeAgo.addDefaultLocale(en);

const PostInfoComponent = ({
    username,
    dateCreated,
    message,
    isComment,
}: CommentInfo) => {
    return (
        <PostInfoContainer data-testid="postInfoContainer" isComment={isComment}>
            <ProfileFeedHeaderContainer>
                <Avatar
                    data-testid="avatar"
                    alt={username}
                    src={PROFILEPHOTOURL}
                    sx={{ width: isComment ? 40: 60, height: isComment ? 40: 60 }}
                />
                <PosterInformationContainer>
                    <PosterInformationHeader data-testid="informationHeader" isComment={isComment}>{username}</PosterInformationHeader>
                    <ReactTimeAgo date={dateCreated} locale='en-US' />
                </PosterInformationContainer>
            </ProfileFeedHeaderContainer>
            <PostMessageContainer>
                <PostMessage>{message}</PostMessage>
            </PostMessageContainer>
        </PostInfoContainer>
    );
};

export default PostInfoComponent;
