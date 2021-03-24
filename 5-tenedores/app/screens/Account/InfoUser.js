import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import * as firebase from "firebase"
import * as Permission from "expo-permissions"
import * as ImagePicker from "expo-image-picker"
export default function InfoUser(props) {
    const { userInfo: {
        uid,
        photoURL,
        displayName,
        email
    }, toastRef,
        setLoading,
        setLoadingText } = props
    const changeAvatar = async () => {

        const resultPermission = await Permission.askAsync(Permission.CAMERA)
        const resultPermissionCamera = resultPermission.permissions.camera
        if (resultPermissionCamera === "denied") {
            toastRef.current.show("Es necesario aceptar los permisos de camara")
        } else {
            const result = await ImagePicker.launchImageLibraryAsync(
                {
                    allowsEditing: true,
                    aspect: [4, 3]
                })
            if (result.cancelled) {
                toastRef.current.show("No has selecionado nada")
            } else {
                uploadImage(result.uri).then(() => {
                    toastRef.current.show("Imagen subida correctamente")
                    updatePhotoUrl()

                }).catch(() => {
                    toastRef.current.show("Error en la subida")
                })
            }
        }
    }
    const uploadImage = async (uri) => {
        setLoadingText("Actualizando avatar")
        setLoading(true)
        const response = await fetch(uri)
        const blob = await response.blob()
        const ref = firebase.storage().ref().child(`avatar/${uid}`)
        return ref.put(blob)
    }

    const updatePhotoUrl = () => {
        firebase.storage().ref(`avatar/${uid}`).
            getDownloadURL().
            then(async (response) => {
                const update = {
                    photoURL: response
                }
                await firebase.auth().currentUser.updateProfile(update)
                setLoading(false)

            }).catch(() => {
                toastRef.current.show("Error al actualizar el avatar")
            })
    }
    return (
        <View style={styles.viewUserInfo} >
            <Avatar
                rounded
                size="large"
                showEditButton
                containerStyle={styles.userInfoAvatar}
                onEditPress={changeAvatar}
                source={photoURL ? { uri: photoURL } : require("../../../assets/img/avatar-default.jpg")}
            />
            <View>
                <Text style={styles.displayName} >{displayName ? displayName : "Anonimo"}</Text>
                <Text>{email ? email : "Social login"}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        viewUserInfo: {
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            backgroundColor: "#f2f2f2",
            paddingTop: 20,
            paddingBottom: 30

        },
        userInfoAvatar: {
            marginRight: 20
        },
        displayName: {
            fontWeight: "bold",
            paddingBottom: 5
        }
    }
)