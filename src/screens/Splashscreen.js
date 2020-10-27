import React, { useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'
import auth from '@react-native-firebase/auth'

const Splashscreen = ({ navigation }) => {

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      user ?
        setTimeout(() => {
          navigation.navigate('Home')
        }, 5000)
        :
        setTimeout(() => {
          navigation.navigate('Auth')
        }, 5000)
    })

    return () => { unsubscribe(); }
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        style={{ height: 300, width: 300 }}
        source={require('../assets/chat.json')}
        autoPlay
        loop />
      <View>
        <ActivityIndicator size={60} color="white" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    alignContent: "center",
    backgroundColor: "#35ce8d"
  },
  lottie: {
    height: "70%",
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#f1f1f1"
  },
});

export default React.memo(Splashscreen)
