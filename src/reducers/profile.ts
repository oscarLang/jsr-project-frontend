import { IStock } from "../utils/types";

export interface IProfileUser {
    email: string;
    stocks?: IStock[];
    funds: number;
}

type Action =
 | { type: "LOGIN_BEGIN" }
 | { type: "LOGIN_SUCCESS", data: IProfileUser; }
 | { type: "LOGIN_FAIL" }
 | { type: "FETCH_USER_BEGIN" }
 | { type: "FETCH_USER_SUCCESS", data: IProfileUser }
 | { type: "FETCH_USER_FAIL" }
 | { type: "FETCH_FUNDS"}
 | { type: "FETCH_FUNDS_ERROR"}
 | { type: "SET_FUNDS", data: any}
 | { type: "LOGOUT"};

export interface ProfileState {
    isLoggingIn: boolean;
    isLoggedIn: boolean;
    profile?: IProfileUser;
    isFetchingFunds: boolean;
    funds: number;
    isFetchingUser: boolean;
    loginUser: Function;
    getProfile: Function;
    getFunds: Function;
    logout: Function;
};


const profileReducer = (state: any, action: Action) => {
    switch (action.type) {
        case 'LOGIN_BEGIN':
            return {...state, isLoggedIn: false, isLoggingIn: true};
        case 'LOGIN_SUCCESS':
            return {...state,
                isLoggedIn: true,
                isLoggingIn: false,
                profile: action.data,
                funds: action.data.funds || 0
            };
        case 'LOGIN_FAIL':
            return {...state, isLoggedIn: false, isLoggingIn: false, profile: undefined};
        case 'FETCH_USER_BEGIN':
            return {...state, isFetchingUser: true};
        case 'FETCH_USER_SUCCESS':
            return {
                ...state,
                isFetchingUser: false,
                isLoggedIn: true,
                profile: action.data,
                funds: action.data.funds || 0,
            };
        case 'FETCH_USER_FAIL':
            return {...state, isFetchingUser: false, isLoggedIn: false};
        case 'FETCH_FUNDS':
            return {...state, isFetchingFunds: true};
        case 'FETCH_FUNDS_ERROR':
            return {...state, isFetchingFunds: false};
        case 'SET_FUNDS':
            return {...state, isFetchingFunds: false, funds: action.data.funds || 0 };
        case 'LOGOUT':
            return {...state, 
                isLoggingIn: false,
                isLoggedIn: false,
                profile: {} as IProfileUser,
                isFetchingFunds: false,
                funds: 0,
                isFetchingUser: false};
        default:
            return state;
    };
};
export default profileReducer;