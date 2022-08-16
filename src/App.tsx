import NavigationBarComponent from './Components/NavigationBarComponent';
import PostTweetComponent from './Components/PostTweetComponent';
import ProfileFeedComponent from './Components/ProfileFeedComponent';
import { PostsProvider } from './context/postsContext';
import { ProfileProvider } from './context/profileContext'
import styled from 'styled-components';

function App() {
  const PageContentContainer = styled.div`
  margin: 0% 5%;
`;

  return (
    <div className="app">
      <ProfileProvider>
        <PostsProvider>
          <NavigationBarComponent />
          <PageContentContainer>
            <PostTweetComponent />
            <ProfileFeedComponent/>
          </PageContentContainer>
        </PostsProvider>
      </ProfileProvider>
    </div>
  );
}

export default App;
