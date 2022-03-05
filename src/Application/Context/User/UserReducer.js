
const UserReducer = (state, action) => {

    const { type, payload } = action;

    switch (type) {
        case 'GET_CONFIG_STATUS':
            return {
                ...state,
                config: payload
            }
        case 'SET_CONFIG_STATUS':
            return {
                ...state,
                config: payload
            }
        case 'GET_MEMES':
            return {
                ...state,
                memes: payload,
                isError: false,
            }
        case 'PUSH_MEMES':
            return {
                ...state,
                memes: state.memes.concat(payload),
                isError: false,
            }
        case 'SEARCH_MEMES':
            return {
                ...state,
                search: payload,
                isError: false,
            }
        case 'PUSH_SEARCH_MEMES':
            return {
                ...state,
                search: state.search.concat(payload),
                isError: false,
            }
        case 'ERROR_CONNECTION':
            return {
                ...state,
                isError: true,
                memes: []
            }
        default:
            return state;
    }
}

export default UserReducer;