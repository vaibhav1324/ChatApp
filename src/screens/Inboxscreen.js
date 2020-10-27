import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import auth from '@react-native-firebase/auth'
import firebase from '../components/Firebase'
import ChatItem from '../components/ChatItem'
import AnimatedLoader from "react-native-animated-loader";

const Inboxscreen = ({ navigation }) => {

  const uid = auth().currentUser.uid;
  const [allChat, setAllChat] = useState([]);
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    getChat();
  }, [])

  const getChat = () => {
    setLoader(true)
    firebase
      .database()
      .ref(`messages/${uid}`)
      .once('value')
      .then(snapshot => {
        let chat = [];
        snapshot.forEach(snap => {
          const id = snap.key;
          chat.push(id)
        })
        setAllChat(chat);
        setLoader(false);
      })
      .catch(err => {
        aler(err)
      });
    setLoader(false);
  }

  const list = () => {
    return allChat.map(item => {
      return (
        <View key={item}>
          <ChatItem
            id={item}
            navigation={navigation} />
        </View>
      )
    })
  }


  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 30, marginLeft: 5, marginBottom: 20, marginTop: 20, fontWeight: "bold" }} >
        My Chats
      </Text>
      {list()}
      <AnimatedLoader
        visible={loader}
        source={require("../assets/loader.json")}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={{ height: 100, width: 100 }}
        speed={1} />
    </SafeAreaView>
  )
}

export default Inboxscreen;