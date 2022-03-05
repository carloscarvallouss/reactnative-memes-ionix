import React, { useState } from "react";
import { Keyboard, View, ScrollView, Image, TextInput, StyleSheet, Text, ActivityIndicator, RefreshControl, StatusBar } from "react-native";
import Button from "../Common/Button";
import MainContainer from '../Common/MainContainer'
import Box from "./Box";
import SearchScreen from "../Search";
import NotFoundScreen from "../Common/NotFound";
import useMemes from "../../Application/Hooks/useMemes";

const ConfigIcon = require("../../Assets/Images/Bitmap.png")
const SearchIcon = require("../../Assets/Images/SearchIcon.png")

const MainScreen = ({ navigation }) => {

    const [searchText, setSearchText] = useState("")
    const [isLoading, mainMemes, refreshing, setRefreshing, pagintation, setPagination] = useMemes()

    const goToConfig = () => {
        navigation.navigate("Config")
    }
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height;
    };

    const configSection = () => (
        <View style={styles.config}>
            <Button onPress={() => goToConfig()}>
                <Image source={ConfigIcon} />
            </Button>
        </View>
    )
    const search = (text) => {
        setSearchText(text)
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
                searchText === "" ? (
                    <>
                        {
                            isLoading
                                ?
                                <View onTouchStart={() => Keyboard.dismiss()} style={styles.loadingBox}>
                                    <ActivityIndicator />
                                    <Text style={styles.textLoading}>Cargando memes...</Text>
                                </View>
                                : <ScrollView
                                    style={styles.content}
                                    scrollEventThrottle={1}
                                    showsVerticalScrollIndicator={false}
                                    onTouchStart={() => Keyboard.dismiss()}
                                    onScroll={({ nativeEvent }) => {
                                        if (isCloseToBottom(nativeEvent)) {
                                            if (!pagintation)
                                                setPagination(true)
                                        }
                                    }}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={() => setRefreshing(true)}
                                        />
                                    }
                                >
                                    {mainMemes.length > 0
                                        ? <>
                                            {mainMemes.map((meme, index) => (
                                                <Box key={index} meme={meme} />
                                            ))}
                                            {pagintation && <>
                                                <ActivityIndicator size={"large"} />
                                            </>}
                                        </>
                                        : <NotFoundScreen />
                                    }
                                </ScrollView>
                        }

                    </>
                ) : (
                    <SearchScreen searchText={searchText} />
                )
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
        marginVertical: 20
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