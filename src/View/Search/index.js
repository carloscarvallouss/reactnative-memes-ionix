import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from "react-native";
import NotFoundScreen from "../Common/NotFound";
import axios from "axios";
import Box from "../Main/Box";
import ErrorConnection from "../Common/ErrorConnection";

import { UserContext } from "../../Application/Context/User/UserContext";

const Search = ({ searchText }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [paginate, setPaginate] = useState(false)
    const [findedMemes, setFindedMemes] = useState([])
    const cancelSource = axios.CancelToken.source();
    const { search, searchMemesState, isError } = useContext(UserContext);

    useEffect(() => {
        if (searchText !== "") {
            setIsLoading(true)
            searchMemesState({ text: searchText, cancelSource })
        }
        return () => {
            cancelSource.cancel("cancel")
        }
    }, [searchText])

    useEffect(() => {
        if (paginate && search.length > 0) {
            let lastItem = search[search.length - 1].data.name
            searchMemesState({ text: searchText, cancelSource, paginate, lastItem })
            setTimeout(() => {
                setPaginate(false)
            }, 2000);
        }

    }, [paginate])

    useEffect(() => {
        if (search) {
            setFindedMemes(search)
            setIsLoading(false)
        }
    }, [search])

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height;
    };

    if (isError)
        return (<ErrorConnection />)

    if (isLoading)
        return (<View style={styles.loadingBox}>
            <ActivityIndicator />
            <Text style={styles.textLoading}>Buscando memes...</Text>
        </View>)
    if (findedMemes.length <= 0)
        return (
            <NotFoundScreen />
        )
    return (
        <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    if (!paginate)
                        setPaginate(true)
                }
            }}
            scrollEventThrottle={1}
        >
            {
                findedMemes.map((meme, index) => (
                    <Box key={index} meme={meme} />
                ))
            }
            {paginate && <ActivityIndicator size={"large"} />}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    loadingBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textLoading: {
        marginTop: 10,
        color: "#9b9b9b",
        fontWeight: "300",
        fontSize: 16,
    },
    content: {
        flex: 1,
        marginTop: 20
    }
})
export default Search;