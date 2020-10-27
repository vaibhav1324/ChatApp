import React, { useState, useCallback, useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import firebase from "../components/Firebase"
import { GiftedChat } from 'react-native-gifted-chat'


const Chatscreen = props => {
  const id = props.navigation.getParam('id');
  const uid = auth().currentUser.uid;
  const [messages, setMessages] = useState([]);
  const name = auth().currentUser.displayName;

  useEffect(() => {
    firebase
      .database()
      .ref('messages')
      .child(uid)
      .child(id)
      .on('value', (value) => {
        let msg = [];
        value.forEach(snap => {
          msg.unshift(snap.val())
        })
        setMessages(msg)
      })
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    let updates = {};
    let msgId = firebase.database().ref(`messages`).child(uid).child(id).push().key;
    updates[`messages/${uid}/${id}/${msgId}`] = messages[0]
    updates[`messages/${id}/${uid}/${msgId}`] = messages[0]
    firebase
      .database()
      .ref()
      .update(updates)
  }, [])


  return (
    <GiftedChat
      inverted={true}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: uid,
        name: name
      }}
    />
  )
}

Chatscreen.navigationOptions = props => {
  const name = props.navigation.getParam('name');
  return {
    headerTitle: name
  }
}

export default Chatscreen
