import React, { useState, useEffect, useCallback } from 'react'
import Navigator from './src/Navigator'
import auth from '@react-native-firebase/auth'
import firebase from "./src/components/Firebase"
import RNLocation from 'react-native-location'

export default function App() {

  useEffect(() => {
    if (auth().currentUser.uid !== null) {
      setInterval(() => {
        RNLocation.configure({ distanceFilter: 1 });
        RNLocation.getLatestLocation({ timeout: 60000 })
          .then(latestLocation => {
            firebase
            .database()
            .ref(`users/${auth().currentUser.uid}`)
            .child(`location`)
            .set({
              lat:latestLocation.latitude,
              long:latestLocation.longitude
            })
          })
      }, 5000);
    }
    else {
      return null;
    }
  }, [])



  return (
    <Navigator />

  )
}

