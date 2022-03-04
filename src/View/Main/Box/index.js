import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

const imageTest = require("../../../Assets/Images/Artwork.png")
const commentIcon = require("../../../Assets/Images/Icons/Comment.png")

const Box = ({ meme }) => {
    const { title, score, num_comments, url } = meme.data
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image} source={{ uri: url }} resizeMode={"cover"} />
            </View>
            <View style={styles.footer}>
                <View style={styles.counterBox}>
                    <Text style={styles.counterText}>{score}</Text>
                </View>
                <View style={styles.contentBox}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.comment}>
                        <Image style={styles.commentIcon} resizeMode={"stretch"} source={commentIcon} />
                        <Text style={styles.commentText}>{num_comments}</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        elevation: 2,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    image: {
        width: "100%",
        height: 200,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    header: {

    },
    footer: {
        flexDirection: "row",
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    counterBox: {
        marginRight: 10,
    },
    counterText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#D8D8D8"
    },
    contentBox: {
        flex: 1,
    },
    title: {
        fontSize: 20,
    },
    comment: {
        flexDirection: "row",
        marginTop: 30,
    },
    commentIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    commentText: {
        color: "#D9D9D9"
    }
})

export default Box;