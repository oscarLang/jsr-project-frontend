import profileReducer, { IProfileUser, ProfileState } from "../reducers/profile";
import React, { createContext, FC, useReducer } from 'react';
import apiRequest from "../utils/apiRequest";

const initial: ProfileState = {
    isLoggingIn: false,
    isLoggedIn: false,
    profile: {} as IProfileUser,
    isFetchingFunds: false,
    funds: 0,
    isFetchingUser: false,
    loginUser: async (email: string, password: string) => false,
    getProfile: async () => false,
    getFunds: async () => 0,
    logout: Function
};
export const ProfileContext = React.createContext(initial);


const ProfileProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(profileReducer, initial);
    
    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            dispatch({ type: 'LOGIN_BEGIN'});
            const result = await apiRequest("/user/login/", "POST", {email: email, password: password});
            dispatch({ type: 'LOGIN_SUCCESS', data: result.data});
            return true;
        } catch (error) {
            dispatch({ type: 'LOGIN_FAIL'});
            return false;
        }
    };

    const getProfile = async (): Promise<boolean> => {
        try {
            dispatch({ type: 'FETCH_USER_BEGIN'});
            const result = await apiRequest("/user/profile/", "GET");
            dispatch({ type: 'FETCH_USER_SUCCESS', data: result.data});
            return true;
        } catch (error) {
            dispatch({ type: 'FETCH_USER_FAIL'});
            return false;
        }
    };

    const getFunds = async (): Promise<number> => {
        try {
            dispatch({ type: 'FETCH_FUNDS'});
            const result = await apiRequest("/user/funds/", "GET");
            dispatch({ type: 'SET_FUNDS', data: result.data});
            return result.data;
        } catch (error) {
            dispatch({ type: 'FETCH_FUNDS_ERROR'});
            return 0;
        }
    };

    const logout = (): void => {
        document.cookie = "jwt=; Max-Age=-99999999;"; 
        dispatch({ type: 'LOGOUT'});
    };
    
    return (
        <ProfileContext.Provider value={{
            ...state,
            getProfile,
            loginUser,
            getFunds,
            logout
        }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;