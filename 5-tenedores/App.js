import React from 'react';
import { firebaseApp } from "./app/utils/firebase"
import { LogBox } from "react-native"

import Navigation from './app/navigations/Navigation'

LogBox.ignoreLogs(["Setting a timer"])

export default function App() {
  return (
    <Navigation />
  );
}

