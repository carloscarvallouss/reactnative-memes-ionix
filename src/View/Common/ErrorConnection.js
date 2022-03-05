import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const errorImage = require("../../Assets/Images/disconnected.png")

const ErrorConnection = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={errorImage} resizeMode={"contain"} />
            <Text style={styles.title}>Error de conexión</Text>
            <Text style={styles.message}>Desliza hacia abajo para intentar nuevamente</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 120,
        height: 120,
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        marginTop: 20,
        fontWeight: "600"
    },
    message: {
        marginTop: 10,
        marginHorizontal: 30,
        color: "#9d9d9d",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "300"
    }
})

export default ErrorConnection;