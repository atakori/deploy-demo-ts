import React, { useContext } from 'react';
import { USERNAME, PROFILEPHOTOURL }from '../constants';
import { IUserProfile } from '../types';

export const ProfileContext = React.createContext<IUserProfile | null>(null);

export function useUserProfileContext() {
    return useContext(ProfileContext);
}

export function ProfileProvider({children}: any) {
    return (
        <ProfileContext.Provider value={{profileUsername: USERNAME, photoUrl: PROFILEPHOTOURL}}>
            {children}
        </ProfileContext.Provider>
    )
}