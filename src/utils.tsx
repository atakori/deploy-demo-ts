import { IComment } from './types';
import { v4 as uuidv4 } from 'uuid';

export function transformPostMessage (message: string, username: string, parentId= null): IComment {
    const currentTimestamp = new Date();
    const id = uuidv4()

    return {
        id,
        parentId,
        message,
        username,
        dateCreated: currentTimestamp,
        likes: []
    }
}