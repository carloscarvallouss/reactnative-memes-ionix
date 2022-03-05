import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from "react-native";
import NotFoundScreen from "../Common/NotFound";
import { searchMemes } from "../../Infraestructure/Services/RedditWS";
import axios from "axios";
import Box from "../Main/Box";

const Search = ({ searchText }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [findedMemes, setFindedMemes] = useState([])
    const cancelSource = axios.CancelToken.source();

    useEffect(() => {
        if (searchText !== "") {
            setIsLoading(true)
            searchMemes({ text: searchText, cancelSource }, response => {
                console.log("data", response)
                if (response.status !== "cancel") {
                    let filtered = response.data.filter(i => i.data.link_flair_text === "Shitposting").filter(i => i.data.post_hint === "image")
                    setFindedMemes(filtered)
                    setIsLoading(false)
                }
            })
        }
        return () => {
            cancelSource.cancel("cancel")
        }
    }, [searchText])

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
        >
            {
                findedMemes.map((meme, index) => (
                    <Box key={index} meme={meme} />
                ))
            }
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