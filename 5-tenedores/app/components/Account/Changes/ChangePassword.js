import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button, Input } from "react-native-elements"
import * as fireabse from "firebase"
import { size } from "lodash"

import { reauthenticate } from "../../../utils/api"

export default function ChangePassword(props) {

    const {
        setShowModal,
        toastRef,
    } = props

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);
    const [formData, setFormData] = useState(defaultValue());
    const [isLoading, setIsLoading] = useState(false)

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const onSubmit = async () => {
        let errorsTemp = {}
        let isSetError = true
        setErrors({})

        if (!formData.password)
            errorsTemp = {
                ...errorsTemp, password: "La contraseña no puede estar vacia"
            }
        if (!formData.newPassword)
            errorsTemp = {
                ...errorsTemp, newPassword: "La contraseña no puede estar vacia"
            }

        if (!formData.repeatNewPassword)
            errorsTemp = {
                ...errorsTemp, repeatNewPassword: "La contraseña no puede estar vacia"
            }

        if (formData.password && formData.newPassword && formData.repeatNewPassword)
            if (formData.newPassword !== formData.repeatNewPassword) {
                errorsTemp = {
                    newPassword: "La contraseñas no coinciden",
                    repeatNewPassword: "La contraseñas no coinciden",
                }
            } else if (size(formData.newPassword) < 6) {
                errorsTemp = {
                    newPassword: "La contraseñas debe tener más de 5 caracteres",
                    repeatNewPassword: "La contraseñas debe tener más de 5 caracteres",
                }
            } else {
                setIsLoading(true)
                await reauthenticate(formData.password).then(
                    async () => {
                        await fireabse.auth()
                            .currentUser
                            .updatePassword(formData.newPassword)
                            .then(
                                () => {
                                    setIsLoading(false)
                                    setShowModal(false)
                                    fireabse.auth().signOut()
                                    isSetError(false)
                                }
                            ).catch(
                                () => {
                                    errorsTemp = {
                                        other: "Error al actualizar la contraseña"
                                    }
                                    setIsLoading(false)
                                }
                            )

                    }
                ).catch(
                    (e) => {
                        console.log(e)
                        errorsTemp = {
                            password: "Contraseña incorrecta"
                        }
                        setIsLoading(false)

                    }
                )
            }

        isSetError && setErrors(errorsTemp)
    }
    return (
        <View style={styles.view}>
            <Input
                placeholder="Contraseña actual"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                errorMessage={errors.password}
                onChange={(e) => onChange(e, "password")}

            />
            <Input
                placeholder="Nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={!showNewPassword}
                rightIcon={{
                    type: "material-community",
                    name: showNewPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowNewPassword(!showNewPassword)
                }}
                errorMessage={errors.newPassword}
                onChange={(e) => onChange(e, "newPassword")}

            />
            <Input
                placeholder="Repetir nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={!showRepeatNewPassword}
                rightIcon={{
                    type: "material-community",
                    name: showRepeatNewPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowRepeatNewPassword(!showRepeatNewPassword)
                }}
                errorMessage={errors.repeatNewPassword}
                onChange={(e) => onChange(e, "repeatNewPassword")}

            />
            <Button
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}

            />
            <Text>{errors.other}</Text>
        </View>
    )
}

function defaultValue() {
    return {
        password: "",
        newPassword: "",
        repeatNewPassword: ""
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