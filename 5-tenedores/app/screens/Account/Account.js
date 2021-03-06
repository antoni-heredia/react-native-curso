import React, { useState, useEffect } from 'react'
import * as firebase from "firebase"
import Loading from "../../components/Loading"

import UserGuest from "./UserGuest"
import UserLogeed from "./UserLogeed"

export default function Account() {
    const [login, setLogin] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(
            (user) => {
                !user ? setLogin(false) : setLogin(true)
            }
        )
    }, []);

    if (login === null) return <Loading isVisible={true} text="Cargando..." />;

    return login ? <UserLogeed /> : <UserGuest />;

}
