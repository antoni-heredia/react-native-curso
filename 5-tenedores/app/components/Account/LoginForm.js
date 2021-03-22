import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { isEmpty } from "lodash"
import * as firebase from "firebase"
import { useNavigation } from "@react-navigation/native"

import Loading from "../Loading"
import { validateEmail } from "../../utils/Validations"

export default function LoginForm(props) {
    const { toastRef } = props

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    const onSubmit = () => {

        if (isEmpty(formData.email) || isEmpty(formData.password)) {
            toastRef.current.show("Todos los campos obligatorios")
        } else if (!validateEmail(formData.email)) {
            toastRef.current.show("Email no valido")

        } else {
            setLoading(true)

            firebase
                .auth()
                .signInWithEmailAndPassword(formData.email, formData.password).then(
                    () => {
                        setLoading(false)
                        navigation.navigate("account")
                    }
                ).catch(
                    () => {
                        setLoading(false)
                        toastRef.current.show("Email o password incorrecto")
                    }
                )
        }
    }
    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    }
    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo electronico"
                containerStyle={styles.inputForm}
                rightIcon={
                    <Icon
                        iconStyle={styles.iconRight}
                        type="material-community"
                        name="at"
                    />
                }
                onChange={(e) => {
                    onChange(e, "email")
                }}
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                    <Icon
                        iconStyle={styles.iconRight}
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        onPress={() => {
                            setShowPassword(!showPassword)
                        }}
                    />
                }
                onChange={(e) => {
                    onChange(e, "password")
                }}
            />
            <Button
                title="Iniciar sesión"
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={onSubmit}
            />
            <Loading isVisible={loading} text="Cargando cuenta..." />

        </View>
    )
}

const styles = StyleSheet.create(
    {
        formContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30
        },
        inputForm: {
            width: "100%",
            marginTop: 20
        },
        btnContainerLogin: {
            marginTop: 20,
            width: "95%"
        },
        btnLogin: {
            backgroundColor: "#b967ff",
        },
        iconRight: {
            color: "#b967ff"
        }
    }
)

function defaultFormValue() {
    return {
        email: "",
        password: ""
    }
}