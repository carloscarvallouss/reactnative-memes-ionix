import React, { useState, useEffect, useContext } from "react"
import { UserContext } from "../Context/User/UserContext"
import axios from "axios"

const useMemes = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [mainMemes, setMainMemes] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [pagintation, setPagination] = useState(false)
    const { memes, getMemesState, isError } = useContext(UserContext);
    const cancelSource = axios.CancelToken.source();

    useEffect(() => {
        getMemesState({ cancelSource })
        return () => { cancelSource(cancel) }
    }, [])

    useEffect(() => {
        if (memes) {
            setIsLoading(false)
            setMainMemes(memes)
        }
    }, [memes])

    useEffect(() => {
        if (refreshing) {
            setTimeout(() => {
                getMemesState({ cancelSource })
                setRefreshing(false)
            }, 2000);
        }
    }, [refreshing])

    useEffect(() => {
        if (pagintation && memes.length > 0) {
            let lastItem = memes[memes.length - 1].data.name;
            let paginate = true;
            getMemesState({ cancelSource, paginate, lastItem })
            setTimeout(() => {
                setPagination(false);
            }, 2000);

        }
    }, [pagintation])

    return [isLoading, mainMemes, refreshing, setRefreshing, pagintation, setPagination, isError]
}

export default useMemes;