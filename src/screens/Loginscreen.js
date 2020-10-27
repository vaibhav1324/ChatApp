import React, { useState, useEffect } from 'react'
import {
  View, Text, StyleSheet, Keyboard,
  TouchableOpacity, ActivityIndicator, TextInput
} from 'react-native'
import auth from '@react-native-firebase/auth'
import * as Animatable from 'react-native-animatable'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'

const Loginscreen = props => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loader, setLoader] = useState(false)

  const _loginHandler = () => {
    
    Keyboard.dismiss()
    if((email || password) === ''){
      alert("please provide input")
    }
    else{
      setLoader(true);
      setTimeout(() => {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(result => {
            setLoader(false)
            if (result) {
              props.navigation.navigate('Home')
            }
          }).catch(error => {
            setLoader(false)
            alert(error);
          })
      }, 3000);
    }
   
  }

  const _register = () => {
    Keyboard.dismiss()
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
      props.navigation.navigate('Register')
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>
          Welcome!
        </Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}>
        <Text style={styles.text_footer}>
          Email
        </Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            color="grey"
            size={20} />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => setEmail(val)}
          />
        </View>
        <Text style={styles.text_footer}>Password</Text>
        <View style={styles.action}>
          <Feather
            name="lock"
            color="grey"
            size={20}
          />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={true}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => setPassword(val)}
          />
          <TouchableOpacity>
            <Feather
              name="eye-off"
              color="grey"
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={_loginHandler} style={styles.signIn}>
            <View style={styles.signIn}>
              <Text style={styles.textSign}>
                Sign In
            </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={_register} style={styles.signUp}>
            <Text style={[styles.textSign, { color: "#35ce8d" }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      <ActivityIndicator
        style={styles.loader}
        animating={loader}
        size="large"
        color="#009387" />
      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#35ce8d'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
    marginTop: 20
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: 'grey',
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: "#35ce8d"
  },
  signUp: {
    marginTop: 20,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: "#35ce8d",
    borderWidth: 2
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "white"
  },
  loader: {
    marginTop: 50
  },
});

export default Loginscreen
