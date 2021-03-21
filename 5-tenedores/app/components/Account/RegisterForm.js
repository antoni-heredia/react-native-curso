import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Icon, Button } from "react-native-elements"
import { size, isEmpty } from "lodash"
import Loading from "../Loading"
import { validateEmail } from "../../utils/Validations"
import * as firebase from "firebase"
import { useNavigation } from "@react-navigation/native"
export default function RegisterForm(props) {
    const { toastRef } = props

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordRepite, setShowPasswordRepite] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState(defaultFormValue());
    const navigation = useNavigation()

    const onSubmit = () => {
        if (isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.passwordRepite)) {
            toastRef.current.show("Todos los campos obligatorios")
        } else if (!validateEmail(formData.email)) {
            toastRef.current.show("Email no valido")

        } else if (formData.password != formData.passwordRepite) {
            toastRef.current.show("Contraseñas no iguales")
        } else if (size(formData.password) < 6) {
            toastRef.current.show("Tamaño minimo de contraseña 6 caracteres")
        } else {
            setLoading(true)
            firebase
                .auth()
                .createUserWithEmailAndPassword(formData.email, formData.password)
                .then(
                    (response) => {
                        setLoading(false)
                        navigation.navigate("account")
                    })
                .catch(
                    (err) => {
                        setLoading(false)
                        toastRef.current.show("El email ya esta en uso")
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

                onChange={(e) => {
                    onChange(e, "email")
                }}

                rightIcon={
                    <Icon
                        iconStyle={styles.iconRight}
                        type="material-community"
                        name="at"
                    />
                }
            />

            <Input
                passwordRules={true}
                secureTextEntry={showPassword ? false : true}
                placeholder="Contraseña"
                containerStyle={styles.inputForm}

                onChange={(e) => {
                    onChange(e, "password")
                }}

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
            />
            <Input
                passwordRules={true}
                secureTextEntry={showPasswordRepite ? false : true}
                placeholder="Repetir contraseña"
                containerStyle={styles.inputForm}

                onChange={(e) => {
                    onChange(e, "passwordRepite")
                }}

                rightIcon={
                    <Icon
                        iconStyle={styles.iconRight}
                        type="material-community"
                        name={showPasswordRepite ? "eye-off-outline" : "eye-outline"}
                        onPress={() => {
                            setShowPasswordRepite(!showPasswordRepite)
                        }}

                    />
                }
            />

            <Button
                title="Unirse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={onSubmit}
            />
            <Loading isVisible={loading} text="Cargando cuenta..." />
        </View>
    )
}
function defaultFormValue() {
    return {
        email: "",
        password: "",
        passwordRepite: ""
    }
}
const styles = StyleSheet.create(
    {
        formContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
        inputForm: {
            width: "100%",
            marginTop: 20
        },
        btnContainerRegister: {
            marginTop: 20,
            width: "95%"
        },
        btnRegister: {
            backgroundColor: "#b967ff"
        },
        iconRight: {
            color: "#c1c1c1"
        }
    }
)