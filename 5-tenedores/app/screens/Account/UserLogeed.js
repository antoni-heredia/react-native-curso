import React from 'react'
import { View, Text, Button } from 'react-native'
import * as firebase from "firebase"
export default function UserLogeed() {
    return (
        <View>
            <Text>Usuario logueado....</Text>
            <Button
                title="Cerrar sesión"
                onPress={() => {
                    firebase.auth().signOut()
                }} />
        </View>
    )
}
