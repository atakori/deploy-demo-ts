import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'

const NoPostsContainer = styled.div`
    text-align: center;
    color: #006CFA;
    margin-top: 20px;
`

const Title = styled.h1`
    text-align: center;
    color: #006CFA;
    margin: 10px;
`


const NoPostsFoundComponent = () => {
    return (
        <NoPostsContainer>
            <FontAwesomeIcon icon={faCameraRetro} fontSize={"100px"}/>
            <Title>No Posts Yet</Title>
        </NoPostsContainer>
    )
}

export default NoPostsFoundComponent;