import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  TouchableOpacity, ActivityIndicator,
  Keyboard, TextInput
} from 'react-native'
import auth from '@react-native-firebase/auth'
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';


const RegisterScreen = ({ navigation }) => {

  const [CPassword, setCPassword] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loader, setLoader] = useState(false)

  const _RegisterHandler = () => {
    Keyboard.dismiss();
    if ((email || password) === '') {
      alert("please provide all input")
    }
    else {
      setLoader(true);
      if (password === CPassword) {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            setLoader(false);
            navigation.navigate('Setup');
          })
          .catch(error => {
            setLoader(false)
            alert(error)
          })
      }
      else {
        alert("error! password do not match")
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>
          Register Now!
        </Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}>
        <View>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#05375a"
              size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setEmail(val)} />
          </View>
          <Text style={styles.text_footer}>Password</Text>
          <View style={styles.action}>
            <Feather
              name="lock"
              color="#05375a"
              size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={true}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setPassword(val)} />
          </View>
          <Text style={styles.text_footer}>
            Confirm Password
            </Text>
          <View style={styles.action}>
            <Feather
              name="lock"
              color="#05375a"
              size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={true}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setCPassword(val)} />
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>By signing up you agree to our</Text>
            <Text style={styles.color_textPrivate}>{" "}Terms of service</Text>
            <Text style={styles.color_textPrivate}>{" "}and</Text>
            <Text style={styles.color_textPrivate}>{" "}Privacy policy</Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={_RegisterHandler} style={styles.signIn}>
              <View style={styles.signIn}>
                <Text style={styles.textSign}>
                  Sign In
                </Text>
              </View>
            </TouchableOpacity>
          </View>
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
    flex: 5,
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
    borderBottomColor: '#f2f2f2'
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: '#05375a',
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
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "white"
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30
  },
  color_textPrivate: {
    color: 'grey'
  },
  loader: {
    marginTop: 50
  },
});

export default RegisterScreen;
