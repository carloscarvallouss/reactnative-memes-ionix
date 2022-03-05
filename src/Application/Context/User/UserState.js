import React, { useReducer } from 'react';
import UserReducer from './UserReducer';
import { UserContext } from './UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMemes, searchMemes } from '../../../Infrastructure/Services/RedditWS';

const UserState = (props) => {
    const initialState = {
        config: null,
        memes: null,
        search: null,
    };

    const [state, dispatch] = useReducer(UserReducer, initialState);

    const getConfigState = async () => {
        var config = await AsyncStorage.getItem('CONFIG_STATUS')
        dispatch({
            type: 'GET_CONFIG_STATUS',
            payload: config ? "viewed" : "unviewed",
        });
    }

    const setConfigState = async () => {
        await AsyncStorage.setItem('CONFIG_STATUS', "viewed")
        dispatch({
            type: 'SET_CONFIG_STATUS',
            payload: true,
        })
    }

    const getMemesState = ({ cancelSource, paginate = false, lastItem = "" }) => {
        getMemes({ cancelSource, paginate, lastItem }, res => {
            let filtered = res.filter(i => i.data.link_flair_text === "Shitposting").filter(i => i.data.post_hint === "image")
            dispatch({
                type: paginate ? 'PUSH_MEMES' : 'GET_MEMES',
                payload: filtered
            })
        })
    }

    const searchMemesState = ({ cancelSource, text, paginate = false, lastItem = "" }) => {
        searchMemes({ text, cancelSource, paginate, lastItem }, response => {
            if (response.status !== "cancel") {
                let filtered = response.data.filter(i => i.data.link_flair_text === "Shitposting").filter(i => i.data.post_hint === "image")
                dispatch({
                    type: paginate ? 'PUSH_SEARCH_MEMES' : 'SEARCH_MEMES',
                    payload: filtered
                })
            }
        })
    }

    return (
        <UserContext.Provider value={{
            config: state.config,
            memes: state.memes,
            search: state.search,
            getMemesState,
            searchMemesState,
            getConfigState,
            setConfigState
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;
