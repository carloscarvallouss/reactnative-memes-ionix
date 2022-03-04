import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from "react-native";
import Button from "../Common/Button";

const { width } = Dimensions.get("window")
const STEPPER_LIST = [
    {
        title: "Acceso a Cámara",
        message: "Por favor, admite el acceso a tu cámara para tomar fotos",
        image: require("../../Assets/Images/Artwork-Camera.png")
    },
    {
        title: "Permitir notificaciones push",
        message: "Permite notificaciones push para que podamos enviarte noticias personales y actualizaciones",
        image: require("../../Assets/Images/Artwork.png")
    },
    {
        title: "Permitir servicios de localización",
        message: "Buscamos acceder a tu ubicación solo para entregar una mejor experiencia",
        image: require("../../Assets/Images/Artwork-Location.png")
    }
]
const ConfigurationScreen = ({ navigation }) => {
    const [step, setStep] = useState(0);
    const scrollRef = useRef();

    useEffect(() => {
        if (scrollRef.current !== null)
            scrollRef.current.scrollTo({ x: step * width, animated: true, })
    }, [step, scrollRef.current])

    const nextStep = (action) => {
        if (step > STEPPER_LIST.length - 2) {
            //Salir de la vista y navegar al Home
            console.log("salir de la vista")
            toMain()
            return
        }
        setStep(step + 1)
        return
    }
    const toMain = () => {
        navigation.replace("Main")
    }
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollContainer}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                ref={scrollRef}
            >
                {
                    STEPPER_LIST.map((item, index) => (
                        <View style={styles.box} key={index}>
                            <Image
                                style={styles.image}
                                source={item.image}
                                resizeMode="contain"
                            />
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.message}>{item.message}</Text>
                            <View style={styles.actionBox}>
                                <Button
                                    withBackground={true}
                                    onPress={() => nextStep()}
                                >
                                    <Text style={styles.textButton}>Permitir</Text>
                                </Button>
                                <Button
                                    onPress={() => backStep()}
                                ><Text style={styles.cancelTextButton}>Cancelar</Text>
                                </Button>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    scrollContainer: {
        flex: 1,
    },
    image: {
        width: 200,
    },
    box: {
        width: width,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50,
        flex: 1,
    },
    title: {
        textAlign: "center",
        marginBottom: 10,
    },
    message: {
        textAlign: "center"
    },
    actionBox: {
        marginVertical: 15,
        width: width / 2
    },
    textButton: {
        color: "#fff"
    },
    cancelTextButton: {
        color: "#9B9B9B"
    }
})

export default ConfigurationScreen;