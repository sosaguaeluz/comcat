import { SENDCODE, TOKEN, USER, USERNAME } from '../actions/index';
import { initialState } from '../state/index';

export const reducer = (state = initialState, action: any) => {
    switch(action.type){
        case TOKEN:
            return { ...state, token: action.token }

        case USER:
            return { ...state, user: action.user }

        case SENDCODE:
            return { ...state, sendcode: action.sendcode }

        case USERNAME:
            return { ...state, username: action.username }

        default:
            return { ...state };
    }
}