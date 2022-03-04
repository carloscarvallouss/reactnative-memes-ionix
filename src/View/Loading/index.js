import React, { useEffect } from "react";
import { View, ImageBackground, Image, StyleSheet, ActivityIndicator } from "react-native";

const imageLogo = require("../../Assets/Images/reddit-1.png")
const imageBackground = require("../../Assets/Images/Background.png")

const LoadingScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace("Config")
        }, 2000);
    }, [])
    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.backgroundImage}
                source={imageBackground}
                resizeMode="cover">
                <Image
                    style={styles.logo}
                    source={imageLogo}
                    resizeMode="contain"
                />
                <ActivityIndicator />
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 150,
        marginBottom: 10,
    }
})
export default LoadingScreen;