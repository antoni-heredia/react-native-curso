import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import RestaurantsStack from "../navigations/RestaurantsStack"
import FavoritesStack from "../navigations/FavoritesStack"
import AccountStack from "../navigations/AccountStack"
import SearchStack from "../navigations/SearchStack"
import TopRestaurantsStack from "../navigations/TopRestaurantsStack"


const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="restaurants"
                tabBarOptions={{
                    inactiveTintColor: "#646464",
                    activeTintColor: "#b967ff"
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color)
                })}>
                <Tab.Screen name="restaurants" component={RestaurantsStack}
                    options={{ title: "Restaurantes" }} />
                <Tab.Screen name="favorites" component={FavoritesStack}
                    options={{ title: "Favoritos" }} />
                <Tab.Screen name="top-restaurants" component={TopRestaurantsStack}
                    options={{ title: "Top 5" }} />
                <Tab.Screen name="search" component={SearchStack}
                    options={{ title: "Busqueda" }} />
                <Tab.Screen name="account" component={AccountStack}
                    options={{ title: "Cuenta" }} />
            </Tab.Navigator>
        </NavigationContainer >
    )
}

function screenOptions(route, color) {
    let iconNAme;
    switch (route.name) {
        case "restaurants":
            iconName = "silverware-fork-knife"
            break;
        case "favorites":
            iconName = "heart-outline"
            break;
        case "top-restaurants":
            iconName = "star-outline"
            break;
        case "search":
            iconName = "magnify"
            break;
        case "account":
            iconName = "account"
            break;
        default:
            break;
    }
    return (
        <Icon type="material-community" name={iconName} size={22} color={color} />
    )
}