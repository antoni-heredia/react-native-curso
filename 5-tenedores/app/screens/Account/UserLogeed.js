import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from "react-native-elements"
import Toast from "react-native-easy-toast"
import Loading from "../../components/Loading"

import * as firebase from "firebase"

import InfoUser from "../Account/InfoUser"
export default function UserLogeed() {
    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const toastRef = useRef();

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser
            setUserInfo(user)
        })()
    }, [])

    return (
        <View style={styles.viewUserInfo}>
            {userInfo && <InfoUser userInfo={userInfo} />}
            <Button
                title="Cerrar sesión"
                buttonStyle={styles.btnCloseSesion}
                titleStyle={styles.btnCloseSesionText}
                onPress={() => {
                    firebase.auth().signOut()
                }}
            />
            <Toast
                ref={toastRef}
                position="center"
                opacity={0.9}
            />
            <Loading
                text={loadingText}
                isVisible={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        viewUserInfo: {
            minHeight: "100%",
            backgroundColor: "#f2f2f2"

        },
        btnCloseSesion: {
            marginTop: 20,
            borderRadius: 0,
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#e3e3e3",
            borderBottomWidth: 1,
            borderBottomColor: "#e3e3e3"
        },
        btnCloseSesionText: {
            color: "#b967ff"
        }
    }
)
