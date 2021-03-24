import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input } from "react-native-elements"
import * as fireabse from "firebase"

import { validateEmail } from "../../../utils/Validations"
import { reauthenticate } from "../../../utils/api"

export default function ChangeEmailForm(props) {

    const {
        email,
        setShowModal,
        toastRef,
        setReloadUserInfo
    } = props

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState(defaultValue())
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }


    const onSubmit = () => {

        setErrors({})
        if (!formData.email || formData.email === "" || email === formData.email) {

            setErrors({ email: "El email no puede ser igual que el actual" })
        } else if (!validateEmail(formData.email)) {
            setErrors({ email: "El email noes correcto" })

        } else if (!formData.password) {
            setErrors({ password: "La contraseña esta vacia" })
        } else {
            setIsLoading(true)

            reauthenticate(formData.password).then(response => {
                fireabse.auth().currentUser.updateEmail(formData.email)
                    .then(() => {

                        setIsLoading(false)
                        setReloadUserInfo(true)
                        toastRef.current.show("Email actualizado correctamente")
                        setShowModal(false)
                    })
                    .catch(() => {
                        setErrors({ email: "Error al actualizar el email" })
                        setIsLoading(false)
                    })

            }).catch(() => {
                setErrors({ password: "Contraseña incorrecta" })
                setIsLoading(false)

            })

        }
    }

    return (
        <View>
            <Input
                placeholder="Correo electronicio"
                containerStyle={styles.input}
                defaultValue={email || ""}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    colo: "#c2c2c2"
                }}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errors.email}
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errors.password}

            />
            <Button
                title="Cambiar email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    )
}

function defaultValue() {
    return {
        email: "",
        password: ""
    }
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