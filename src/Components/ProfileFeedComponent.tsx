import { PostsContextType, IComment, IUserProfile } from '../types';
import { usePostsContext } from '../context/postsContext';
import NoPostsFoundComponent from './NoPostsFoundComponent';
import styled from 'styled-components';
import MenuComponent from './MenuComponent';
import CreateCommentComponent from './CreateCommentComponent';
import CommentsComponent from './CommentsComponent';
import PostInfoComponent from './PostInfoComponent';
import PostInteractionsContainer from './PostInteractionsComponent';
import { useUserProfileContext } from '../context/profileContext';

const ProfileFeedPostContainer = styled.div`
    border: 1px solid #ced7e7;
    border-radius: 10px;
    padding: 30px;
    margin: 20px 0px;
`;

const ProfileFeedComponent = () => {
    const { posts } = usePostsContext() as PostsContextType;
    const { profileUsername } = useUserProfileContext() as IUserProfile;

    function renderPosts(posts: IComment[]) {
        const basePosts = posts.filter((posts) => {
            return posts.parentId === null
        });

        return basePosts.map((post) => {
            const { id, username, dateCreated, message, likes } = post;
            const comments = posts.filter((posts) => {
                return posts.parentId === id;
            })
            const isLiked = likes.includes(profileUsername);
            const amountOfLikes = likes.length;

            // Looks at each comment where the parentId == current id
            const amountOfComments = comments.filter((comment) => comment.parentId === id).length

            return (
                <ProfileFeedPostContainer data-testid="postContainer" key={id}>
                    <MenuComponent />
                    <PostInfoComponent message={message} dateCreated={dateCreated} username={username} isComment={false}/>
                    <PostInteractionsContainer amountOfLikes={amountOfLikes} amountOfComments={amountOfComments} isLiked={isLiked} commentId={id} isComment={false}/>
                    <CreateCommentComponent parentId={id} />
                    <CommentsComponent comments={comments} data-testid="commentsContainer"/>
                </ProfileFeedPostContainer>
            );
        });
    }

    return posts.length === 0 ? (
        <NoPostsFoundComponent data-testid="noPostsFoundComponent"/>
    ) : (
        <div data-testid="profileFeedContainer">
            {renderPosts(posts)}
        </div>
    );
};

export default ProfileFeedComponent;
