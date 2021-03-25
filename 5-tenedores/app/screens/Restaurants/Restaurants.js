import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Icon } from "react-native-elements"
import { firebaseApp } from "../../utils/firebase"
import firebase from "firebase/app"

export default function Restaurants() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((useInfo) => {
            setUser(useInfo)
        })
    }, [])
    return (
        <View style={styles.viewBody}>
            <Text>Restaurantes...</Text>
            {user &&
                (<Icon
                    type="material-community"
                    name="plus"
                    reverse
                    color="#b967ff"
                    containerStyle={styles.btnContainer}

                />)
            }
        </View>
    )
}

const styles = StyleSheet.create(
    {
        viewBody: {
            flex: 1,
            backgroundColor: "#fff"
        },
        btnContainer: {
            position: "absolute",
            bottom: 10,
            right: 10,
            shadowColor: "black",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.5
        }
    }
)