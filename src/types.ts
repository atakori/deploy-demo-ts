export interface IUserPost {
    message: string;
    username: string;
    datePosted: Date;
}
export interface IUserProfile {
    profileUsername: string;
    photoUrl: string;
}

export type PostsContextType = {
    posts: IComment[];
    savePost: (post: IComment) => void;
    updateLikes: (updateLikes: IUpdateCommentLikes) => void;
}

export interface IComment {
    id: string;
    parentId: string | null;
    message: string;
    username: string;
    dateCreated: Date;
    likes: string[];
}

export interface IUpdateCommentLikes {
    username: string;
    commentId: string;
}

export interface CommentsComponentProps{
    comments: IComment[];
}