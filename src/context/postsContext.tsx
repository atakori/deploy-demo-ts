import React, { useContext, useState } from "react";
import { IComment, IUpdateCommentLikes, PostsContextType } from "../types";

export const PostsContext = React.createContext<PostsContextType | null>(null);

export function usePostsContext() {
    return useContext(PostsContext);
}

export function PostsProvider ({children}: any) {

    const [userPosts, setUserPosts] = useState<IComment[]>([])

    // POST: Create a new message/comment
    // To be replaced by Backend Call which stores posts & comments
    // Storing using Context API for purposes of MVP
    const savePost = (post: IComment) => {
        const { id, parentId, message, username, dateCreated, likes } = post

        const newPost: IComment = {
            id,
            parentId,
            message,
            username,
            dateCreated,
            likes
        }

        const updatedPosts = [...userPosts, newPost ]
        setUserPosts(updatedPosts)
    }

    // PUT: Adds/Removes a User from a post or comments "likes"
    // To be replaced by backend call
    const updateLikesInPost = (updateLikes: IUpdateCommentLikes) => {
        console.log("Activate!!!");

        const { username, commentId } = updateLikes

        // Finds Id of comment in the userPosts
        const updatedPosts = [...userPosts];

        // Find the comment in question...
        const comment = updatedPosts.find((comment) => commentId === comment.id);

        // Look to see if the like needs to be added or removed...
        if(comment) {
            const currentCommentIndex = updatedPosts.findIndex((comment) => comment.id === commentId)
            let currentLikes = comment.likes;
            const currentlyLikedByUser = currentLikes.find((name) => name === username)
            
            // Remove the name from the list of people who liked the post
            if(currentlyLikedByUser) 
                currentLikes = currentLikes.filter((user) => user !== username);                
            // Add name from the list of people who liked the post
            else
                currentLikes.push(username);
            
            // Since we do not have an API to use the PUT method,
            // We will replace the entire list for the purposes of the demo
            updatedPosts[currentCommentIndex].likes = currentLikes
            setUserPosts(updatedPosts)
        }
    }

    return (
        <PostsContext.Provider value={{posts: userPosts, savePost, updateLikes: updateLikesInPost}}>
            {children}
        </PostsContext.Provider>
    )
}