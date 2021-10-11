import { IStock } from "../utils/types";

export interface IProfileUser {
    email: string;
    stocks?: IStock[];
}

type Action =
 | { type: "LOGIN_BEGIN" }
 | { type: "LOGIN_SUCCESS", data: IProfileUser; }
 | { type: "LOGIN_FAIL" }
 | { type: "FETCH_FUNDS"}
 | { type: "FETCH_FUNDS_ERROR"}
 | { type: "SET_FUNDS", data: number};

export interface ProfileState {
    isLoggingIn: boolean;
    isLoggedIn: boolean;
    profile?: IProfileUser;
    isFetchingFunds: boolean;
    funds: number;
    loginUser: Function;
    getFunds: Function;
};


const profileReducer = (state: any, action: Action) => {
    if (action.type === 'LOGIN_BEGIN') {
      return {...state, isLoggedIn: false, isLoggingIn: true};
    }
   
    if (action.type === 'LOGIN_SUCCESS') {
      return {...state, isLoggedIn: true, isLoggingIn: false, profile: action.data};
    }

    if (action.type === 'LOGIN_FAIL') {
        return {...state, isLoggedIn: false, isLoggingIn: false, profile: undefined};
    }

    if (action.type === 'FETCH_FUNDS') {
        return {...state, isFetchingFunds: true};
    }

    if (action.type === 'FETCH_FUNDS_ERROR') {
        return {...state, isFetchingFunds: false};
    }

    if (action.type === 'SET_FUNDS') {
        const funds = action.data ? action.data : 0;
        return {...state, isFetchingFunds: false, funds: funds };
    }
   
    return state;
};
export default profileReducer;