
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
                memes: payload
            }
        case 'PUSH_MEMES':
            return {
                ...state,
                memes: state.memes.concat(payload)
            }
        case 'SEARCH_MEMES':
            return {
                ...state,
                search: payload
            }
        case 'PUSH_SEARCH_MEMES':
            return {
                ...state,
                search: state.search.concat(payload)
            }
        default:
            return state;
    }
}

export default UserReducer;