import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const image = require("../../Assets/Images/Artwork-Search.png")
const NotFoundScreen = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={image} resizeMode="contain" />
            <Text style={styles.title}>Sin resultados</Text>
            <Text>
                No se encontraron memes :c
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },
    image: {
        width: 200
    }
})

export default NotFoundScreen;