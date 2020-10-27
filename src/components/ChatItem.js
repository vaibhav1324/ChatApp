import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableNativeFeedback, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import firebase from '../components/Firebase'
import AnimatedLoader from "react-native-animated-loader";

const ChatItem = ({ id, navigation }) => {

  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setLoader(true)
    firebase
      .database()
      .ref(`users/${id}`)
      .once('value')
      .then(snap => {
        setName(snap.val().name)
        setUrl(snap.val().url);
        setLoader(false);
      })
  }, []);

  return (
    <TouchableNativeFeedback
      onPress={() => {
        navigation.navigate({
          routeName:'Chat',
          params: {
            id: id,
            name: name
          }
        })
      }}>
      <View style={styles.item}>
        <Avatar.Image size={50} source={{ uri: url }} />
        <View style={styles.data}>
          <Text style={{ fontSize: 18 }}>
            {name}
          </Text>
        </View>
        <Avatar.Icon style={styles.icon} size={35} icon="chevron-right" color="blue" />
        <AnimatedLoader
          visible={loader}
          source={require("../assets/loader.json")}
          overlayColor="rgba(255,255,255,0.75)"
          animationStyle={{ height: 100, width: 100 }}
          speed={1} />
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({

  item: {
    margin: 5,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 1,
    flexDirection: "row"
  },
  data: {
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 20
  },
  icon: {
    backgroundColor: "white",
    position: "absolute",
    right: 10,
    top: 10
  },
})

export default ChatItem

