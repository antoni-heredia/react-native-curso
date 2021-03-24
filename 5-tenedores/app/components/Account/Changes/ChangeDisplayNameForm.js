import React, { useState } from 'react'
import { StyleSheet, View, } from 'react-native'
import { Button, Input } from "react-native-elements"

import * as firebase from "firebase"

export default function ChangeDisplayNameForm(props) {
    const {
        displayName,
        setShowModal,
        toastRef,
        setReloadUserInfo
    } = props
    const [newDisplayName, setNewDisplayName] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    
    const onSubmit = () => {
        setError(null)
        if (!newDisplayName || newDisplayName == "") {
            setError("El nombre no puede ser nulo")
        } else if (displayName === newDisplayName) {
            setError("El nombre no puede ser igual que el actual")
        } else {
            setIsLoading(true)
            const update = {
                displayName: newDisplayName
            }
            firebase.auth().currentUser.updateProfile(update).then(
                () => {
                    console.log("nombre cambiado")
                    setIsLoading(false)
                    setReloadUserInfo(true)
                    setShowModal(false)
                }
            ).catch(
                () => {
                    console.log("no se ha  cambiado")
                    setIsLoading(false)
                    setShowModal(false)

                }
            )
        }
    }
    return (
        <View style={styles.view}>
            <Input
                placeholder="Nombre y apellidos"
                containerStyle={styles.input}
                defaultValue={displayName || ""}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    colo: "#c2c2c2"
                }}
                onChange={e => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button
                title="Cambiar nombre"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        marginTop: 20,
        width: "95%"
    },
    btn: {
        backgroundColor: "#b967ff"
    }
})