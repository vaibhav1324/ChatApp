import React, { useState } from 'react'
import {
  View, Text, StyleSheet,
  TouchableOpacity, TextInput, ActivityIndicator,
  Keyboard, Image
} from 'react-native'
import { Avatar } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import ImagePicker from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'
import firebase from '../components/Firebase'
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';



const Setupscreen = (props) => {


  const [iloader, setILoader] = useState(false)
  const [loader, setLoader] = useState(false)
  const [name, setName] = useState('');
  const [contact, setContact] = useState('')

  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

  const pickImage = () => {
    return new Promise((resolve, reject) => {
      ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) return;
        if (response.error) {
          const message = `An error was occurred: ${response.error}`;
          reject(new Error(message));
          return;
        }
        const { path: uri } = response;
        resolve(uri);
        const dataa = response.data;
        setImage(dataa);
      });
    });
  };

  const uploadImage = async (fileName, uri) => {
    const user = auth().currentUser.uid;
    console.log(user);
    return new Promise(
      (resolve, reject) => {
        setILoader(true);
        setLoader(false);
        storage()
          .ref(`users/${user}/${fileName}`)
          .putFile(uri)
          .then(res => {
            storage()
              .ref(`users/${user}/Profile_Picture.jpg`)
              .getDownloadURL()
              .then(res => {
                firebase.database().ref(`users/${user}`).child('url').set(res);
              })
              .catch(error => {
                setLoader(false);
                alert(error);
              })
          })
          .catch(reject);
      }
    );
  }

  const pickImageAndUpload = async () => {
    const uri = await pickImage();
    const fileName = 'Profile_Picture.jpg';
    await uploadImage(fileName, uri);
  }


  const [image, setImage] = useState(null);
  const renderFileData = () => {
    if (image) {
      return (
        <Image
          source={{ uri: 'data:image/jpeg;base64,' + image }}
          style={styles.image1} />
      )
    }
    else {
      return (
        <Avatar.Icon style={styles.icon}
          size={110} icon="plus" />
      )
    }
  };

  const _submit = () => {
    Keyboard.dismiss();
    if ((name || contact) === '') {
      alert("please provide all input")
    }
    else {
      setLoader(true);
      const id = auth().currentUser.uid;
      const email = auth().currentUser.email;
      if (!image) {
        setLoader(false);
        alert("please upload an image");
      }
      else {
        firebase
          .database()
          .ref(`users/${id}`)
          .set({
            name: name,
            email: email,
            contact: contact
          })
          .then(result => {
            const user = auth().currentUser
            user.updateProfile({
              displayName: name
            })
          })
          .then(() => {
            setLoader(false);
            props.navigation.navigate('Home')
          })
          .catch(err => { alert(err) })
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>
          Setup Profile
        </Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.text}>Upload your picture</Text>
          <TouchableOpacity onPress={pickImageAndUpload}>
            <View style={styles.imagee}>
              {renderFileData()}
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#05375a"
              size={20} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setName(val)} />
          </View>
          <Text style={styles.text_footer}>Phone</Text>
          <View style={styles.action}>
            <Feather
              name="phone"
              color="#05375a"
              size={20} />
            <TextInput
              placeholder="Your Phone"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setContact(val)} />
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={_submit} style={styles.signIn}>
            <View style={styles.signIn}>
              <Text style={styles.textSign}>
                Save
                </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ActivityIndicator
          style={styles.loader}
          animating={loader}
          size="large"
          color="blue" />
      </Animatable.View>
    </View>
  )
}


const styles = StyleSheet.create({
  imagee: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginTop: 10,
    borderColor: "white",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  image1: {
    resizeMode: "contain",
    width: "100%",
    height: 132,
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 3
  },
  icon: {
    alignSelf: "center",
    justifyContent: "center",
    elevation: 10,
    marginVertical: 20,
    backgroundColor: "#35ce8d"
  },
  lottie: {
    height: 100,
    width: 100
  },
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
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: "#35ce8d",
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
  text: {
    fontSize: 20,
    fontWeight: "bold",

  }
});


export default Setupscreen
