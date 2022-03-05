import React, { useState, useEffect } from "react";
import { Text, Platform } from "react-native";
import { check, PERMISSIONS, RESULTS, request, checkNotifications, requestNotifications, checkLocationAccuracy } from 'react-native-permissions';
import Button from "../../Common/Button";

const PermisionButton = ({ permissionId, nextStep }) => {
    const [permisionState, setPermisionState] = useState("Cargando")

    useEffect(() => {
        if (permissionId === 'CAMERA') {
            checkPermision(Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA, message => {
                setPermisionState(message)
            })
            return
        }
        if (permissionId === "NOTIFICATION") {
            if (Platform.OS === "android") {
                setPermisionState("Permitido")
                return
            }
            checkNotifications().then(({ status, settings }) => {
                if (status == "granted") {
                    setPermisionState("Permitido")
                    return
                }
                if (status == "blocked") {
                    setPermisionState("No permitido")
                    return
                }
                else {
                    setPermisionState("Permitir")
                    return
                }
            });
        }
        if (permissionId === "LOCATION") {
            checkPermision(Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, message => {
                setPermisionState(message)
            })
            return
        }

    }, [])

    const checkPermision = (permission, res) => {
        check(permission)
            .then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log(result)
                        res("No disponible")
                        break;
                    case RESULTS.DENIED:
                        console.log(result)
                        res("Permitir")
                        break;
                    case RESULTS.LIMITED:
                        console.log(result)
                        res("Permitido")
                        break;
                    case RESULTS.GRANTED:
                        console.log(result)
                        res("Permitido")
                        break;
                    case RESULTS.BLOCKED:
                        console.log(result)
                        res("No permitido")
                        break;
                }
            })
            .catch((error) => {
                console.log(error)
                res("No disponible")
            });
    }
    const toAction = () => {
        if (permissionId === "NOTIFICATION") {
            requestNotifications(['alert', 'sound']).then(({ status, settings }) => {
                if (status === "granted")
                    setPermisionState("Permitido")
                else
                    setPermisionState("No permitido")

                nextStep()
            });
        }
        if (permissionId === "CAMERA") {
            request(Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then((result) => {
                if (result === "granted")
                    setPermisionState("Permitido")
                else
                    setPermisionState("No permitido")

                nextStep()
            });
        }
        if (permissionId === "LOCATION") {
            request(Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_ALWAYS : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then((result) => {
                if (result === "granted")
                    setPermisionState("Permitido")
                else
                    setPermisionState("No permitido")

                nextStep()
            });
        }

    }

    return (<Button
        withBackground={true}
        onPress={() => toAction()}
    >
        <Text style={{ color: "#fff" }}>{permisionState}</Text>
    </Button>)
}

export default PermisionButton;