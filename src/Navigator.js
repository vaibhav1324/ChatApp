import React from 'react'
import { createAppContainer,createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import {
    Splashscreen,
    Loginscreen,
    Registerscreen,
    Setupscreen,
    Userscreen,
    Chatscreen,
    Inboxscreen
}from './screens'


const AuthNav = createStackNavigator({
    Login:Loginscreen,
    Register:Registerscreen,
    Setup:Setupscreen
},
  {
    headerMode: 'none',
    initialRouteName: "Login",
});

const Chat = createStackNavigator({
    Chat:Chatscreen
})

const HomeNav = createStackNavigator({
    User:Userscreen,
    Chat,
    Inbox:Inboxscreen
},
{
    headerMode:'none',
    initialRouteName:"User"
})

const Navigator = createSwitchNavigator({
    Splashscreen,
    Auth:AuthNav,
    Home:HomeNav
    
},{
    headerMode:'none',
    initialRouteName:'Splashscreen'
})

export default createAppContainer(Navigator);