import React from "react";
import { TouchableOpacity, StyleSheet, ImageBackground } from "react-native";

const Rectangle = require("../../Assets/Images/Rectangle.png")
const Button = (props) => {
    if (props.withBackground)
        return (
            <ImageBackground source={Rectangle} resizeMode="cover">
                <TouchableOpacity {...props} style={styles.button}>
                    {props.children}
                </TouchableOpacity>
            </ImageBackground>

        )
    return (
        <TouchableOpacity {...props} style={styles.button}>
            {props.children}
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 20,
    }
})
export default Button;