import React, { useEffect, useState } from "react";
import { Keyboard, View, ScrollView, Image, TextInput, StyleSheet, Text, ActivityIndicator, RefreshControl, StatusBar } from "react-native";
import Button from "../Common/Button";
import MainContainer from '../Common/MainContainer'
import Box from "./Box";
import { getMemes } from "../../Infraestructure/Services/RedditWS";

const ConfigIcon = require("../../Assets/Images/Bitmap.png")
const SearchIcon = require("../../Assets/Images/SearchIcon.png")

const MainScreen = ({ navigation }) => {
    const [mainData, setMainData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState("")
    useEffect(() => {
        setTimeout(() => {
            getMemes("page", res => {
                let filtered = res.filter(i => i.data.link_flair_text === "Shitposting").filter(i => i.data.post_hint === "image")
                setMainData(filtered)
                setIsLoading(false)
            })
        }, 2000);

    }, [])
    const onRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            getMemes("page", res => {
                let filtered = res.filter(i => i.data.link_flair_text === "Shitposting").filter(i => i.data.post_hint === "image")
                setMainData(filtered)
                setIsLoading(false)
                setRefreshing(false)
            })
        }, 2000);
    }
    const goToConfig = () => {
        navigation.navigate("Config")
    }
    const configSection = () => (
        <View style={styles.config}>
            <Button onPress={() => goToConfig()}>
                <Image source={ConfigIcon} />
            </Button>
        </View>
    )
    const search = (text) => {
        setSearchText(text)
        setIsLoading(true)
    }
    const searchBox = () => (<View style={styles.searchBox}>
        <Image style={styles.searchIcon} source={SearchIcon} />
        <TextInput
            value={searchText}
            onChangeText={(text) => search(text)}
            style={styles.inputBox}
            placeholder="Buscar"
        />
    </View>)
    return (
        <MainContainer>
            <StatusBar translucent backgroundColor={"#fff"} />
            {configSection()}
            {searchBox()}
            {
                isLoading
                    ?
                    <View onTouchStart={() => Keyboard.dismiss()} style={styles.loadingBox}>
                        <ActivityIndicator />
                        <Text style={styles.textLoading}>Cargando memes...</Text>
                    </View>
                    : <ScrollView
                        style={styles.content}
                        showsVerticalScrollIndicator={false}
                        onTouchStart={() => Keyboard.dismiss()}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        {mainData.map((meme, index) => (
                            <Box key={index} meme={meme} />
                        ))}

                    </ScrollView>
            }


        </MainContainer>
    )
}
const styles = StyleSheet.create({
    config: {
        width: 30
    },
    searchBox: {
        flexDirection: "row",
        backgroundColor: "#D8D8D8",
        borderRadius: 8,
        justifyContent: "center",
    },
    searchIcon: {
        marginVertical: 12,
        marginLeft: 10,
    },
    inputBox: {
        width: "90%",
        marginHorizontal: 10,
        height: 40,
    },
    content: {
        flex: 1,
        marginTop: 20
    },
    loadingBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textLoading: {
        marginTop: 10,
        color: "#666",
        fontWeight: "300",
        fontSize: 16,
    }
})
export default MainScreen;