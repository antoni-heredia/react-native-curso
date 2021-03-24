import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ListItem } from "react-native-elements"
import { map } from "lodash"

import Modal from "../../components/Modal"

import ChangeDisplayNameForm from "../../components/Account/Changes/ChangeDisplayNameForm"
import ChangeEmailForm from "../../components/Account/Changes/ChangeEmailForm"

export default function AccountOptions(props) {
    const { userInfo, toastRef, setReloadUserInfo } = props
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);
    const selectComponents = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm setReloadUserInfo={setReloadUserInfo}
                        displayName={userInfo.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                    />
                )
                setShowModal(true)
                break;
            case "email":
                setRenderComponent(
                    <ChangeEmailForm
                        setReloadUserInfo={setReloadUserInfo}
                        email={userInfo.email}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                    />
                )
                setShowModal(true)
                break
            case "password":
                setRenderComponent(
                    <Text>Cambiando password</Text>
                )
                setShowModal(true)
                break
            default:
                setRenderComponent(null)
                setShowModal(false)
                break;
        }
    }
    const menuOptions = generateOptions(selectComponents)
    return (

        < View >
            {map(menuOptions, (menu, index) => (
                <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight
                    }}
                    containerStyle={styles.menuItem}
                    onPress={menu.onPress}
                />
            ))}
            {renderComponent &&
                <Modal isVisible={showModal} setIsVisible={setShowModal}>
                    {renderComponent}
                </Modal>
            }

        </View >
    )
}

function generateOptions(selectComponents) {
    return [

        {
            title: "Cambiar nombre",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponents("displayName")
        },
        {
            title: "Cambiar email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponents("email")

        },
        {
            title: "Cambiar contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponents("password")

        }

    ]
}

const styles = StyleSheet.create(
    {
        menuItem: {
            borderBottomWidth: 1,
            borderBottomColor: "#e3e3e3"
        }
    }
)