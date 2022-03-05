import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

const commentIcon = require("../../../Assets/Images/Icons/Comment.png")
const arrowUpIcon = require("../../../Assets/Images/arrow-up.png")
const arrowDownIcon = require("../../../Assets/Images/arrow-down.png")

const Box = ({ meme }) => {
    const { title, score, num_comments, url } = meme.data
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image} source={{ uri: url }} resizeMode={"cover"} />
            </View>
            <View style={styles.footer}>
                <View style={styles.counterBox}>
                    <Image source={arrowUpIcon} />
                    <Text style={styles.counterText}>{score}</Text>
                    <Image source={arrowDownIcon} />
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
        shadowOpacity: 0.3,
        backgroundColor: "#fff",
        marginBottom: 15,
        marginRight: 2,
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
        alignItems: "center"
    },
    counterText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#9B9B9B",
        marginVertical: 10,
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
        color: "#9B9B9B"
    }
})

export default Box;