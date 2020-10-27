import React, { useEffect, useState, useContext, useCallback } from 'react'
import {
  View, Text, Button, StyleSheet, Image,
  TouchableOpacity, TouchableNativeFeedback,
  Dimensions, TouchableWithoutFeedback
} from 'react-native';
import auth from '@react-native-firebase/auth'
import firebase from '../components/Firebase'
import { Avatar } from 'react-native-paper';
import AnimatedLoader from "react-native-animated-loader";
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather'

const Userscreen = props => {

  let users = [];
  const user = auth().currentUser.displayName;
  const uEmail = auth().currentUser.email;
  const uid = auth().currentUser.uid;
  const [refreshing, setRefreshing] = useState(false)
  const [image, setImage] = useState('')
  const [userList, setUserList] = useState([]);
  const [trans, setTrans] = useState('fadeInUpBig')
  const [name, setName] = useState('fadeIn')
  const [userInfo, setUserInfo] = useState({
    from: {
      opacity: 0
    },
    to: {
      opacity: 0
    },
  });

  const [back, setBack] = useState({
    from: {
      top: 0,
      left: -100
    },
    to: {
      top: 0,
      left: -50
    },
  })

  const [pic, setPic] = useState(
    {
      0: {
        height: 75,
        width: 75
      },
      1: {
        height: 75,
        width: 75
      },
    });

  const [pic1, setPic1] = useState({
    from: {
      height: 75,
      width: 75
    },
    to: {
      height: 75,
      width: 75
    },
  });

  useEffect(() => {
    getUsers();
    getImage();
  }, []);

  const getUsers = () => {
    setRefreshing(true)
    firebase
      .database()
      .ref(`users`)
      .once('value')
      .then(data => {
        data.forEach(snapshot => {
          if (snapshot.key !== uid) {
            const id = snapshot.key;
            const data = snapshot.val();
            users.push({ id: id, data: data })
          }
        })
        setUserList(users);
        setRefreshing(false)
      })
      .catch(error => {
        setRefreshing(false)
        console.log(error)
      })

    setBack({
      from: {
        top: 0,
        left: -100
      },
      to: {
        top: 0,
        left: -50
      },
    });

    setPic({
      0: {
        top: 15,
        right: 10,
        height: 75,
        width: 75

      },
      1: {
        top: 15,
        right: 10,
        height: 75,
        width: 75
      }
    });

    setPic1({
      0: {
        scale: 1,
        height: 75,
        width: 75
      },
      1: {
        scale: 1,
        height: 75,
        width: 75
      }
    });

    setUserInfo({
      from: {
        opacity: 0
      },
      to: {
        opacity: 0
      },
    });
  }

  const getImage = () => {
    firebase
      .database()
      .ref(`users/${uid}`)
      .child('url')
      .on("value", snap => {
        setImage(snap.val())
      })
  }


  const list = () => {
    return userList.map(item => {
      return (
        <TouchableNativeFeedback key={item.id} onPress={() => {
          props.navigation.navigate({
            routeName: 'Chat',
            params: {
              id: item.id,
              name: item.data.name
            }
          })
        }}>
          <View style={styles.item}>
            <Avatar.Image size={50} source={{ uri: item.data.url }} />
            <View style={styles.data}>
              <Text style={{ fontSize: 18 }}>
                {item.data.name}
              </Text>
            </View>
            <Avatar.Icon
              style={styles.icon}
              size={35}
              icon="chevron-right"
              color="#7765e3" />
          </View>
        </TouchableNativeFeedback>
      )
    })
  }

  const _openInbox = () => {
    props.navigation.navigate('Inbox')
  }

  const _showProfile = () => {
    setName('fadeOut')
    setTrans('fadeOutDownBig')
    setPic({
      0: {
        top: 15,
        right: 10,
        height: 75,
        width: 75
      },
      1: {
        height: 150,
        width: 150,
        top: 100,
        right: 123,
      },
    });

    setPic1({
      0: {
        height: 75,
        width: 75
      },
      1: {
        height: 145,
        width: 145,
      },
    });

    setBack({
      from: {
        top: 0,
        left: -50
      },
      to: {
        top: 30,
        left: 25
      },
    });

    setUserInfo({
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      },
    })

  }

  const _hideProfile = () => {
    setTrans('fadeInUpBig')
    setPic({
      from: {
        height: 150,
        width: 150,
        top: 100,
        right: 123,
      },
      to: {
        top: 15,
        right: 10,
        height: 75,
        width: 75
      },
    });
    setPic1({
      from: {
        height: 145,
        width: 145,
      },
      to: {
        height: 75,
        width: 75
      },
    });

    setBack({
      from: {
        top: 30,
        left: 25
      },
      to: {
        top: 0,
        left: -50
      },
    });
    setUserInfo({
      from: {
        opacity: 0
      },
      to: {
        opacity: 0
      },
    })
    setName('fadeIn');

  }


  const _logout = () => {
    auth().signOut().then(() => {
      props.navigation.navigate('Auth');
    })
  }

  const Touchable = Animatable.createAnimatableComponent(TouchableOpacity);

  return (
    <View style={styles.container}>
      <Touchable animation={back} style={styles.touchable} onPress={_hideProfile}>
        <Feather name="chevron-left" color="black" size={35} />
      </Touchable>
      <Animatable.Text
        animation={name}
        style={styles.name}>
        Hi {user}
      </Animatable.Text>
      <Animatable.View
        delay={2000}
        animation={userInfo}
        style={styles.userInfo}>
        <Text style={styles.userName}>
          {user}
        </Text>
        <Text style={styles.userEmail}>
          {uEmail}
        </Text>
        <TouchableOpacity onPress={_logout}>
          <View style={styles.logoutBtn}>
            <Text style={styles.logout}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
      <Touchable
        animation={pic}
        style={styles.avatar}
        onPress={_showProfile}>
        <Animatable.Image
          style={{ borderRadius: 50, resizeMode: "cover" }}
          animation={pic1}
          source={{ uri: image }} />
      </Touchable>
      <Animatable.View
        animation={trans}
        duration={800}
        style={styles.chatContainer}>
        <TouchableWithoutFeedback onPress={getUsers}>
          <Avatar.Icon
            style={styles.refresh}
            size={35}
            icon="reload"
            color="#7765e3" />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={_openInbox}>
          <Avatar.Icon
            style={styles.inbox}
            size={35}
            icon="message"
            color="#7765e3" />
        </TouchableWithoutFeedback>
        <Text style={styles.users}>All Users</Text>
        <View style={styles.list}>
          {list()}
        </View>
        <AnimatedLoader
          visible={refreshing}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../assets/loader.json")}
          speed={1}
          animationStyle={styles.lottie}
        />
      </Animatable.View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#35ce8d',
    flex: 1
  },
  touchable: {
    backgroundColor: "white",
    borderRadius: 100,
    zIndex: 10,
    position: "absolute"
  },
  chatContainer: {
    width: "100%",
    height: "100%",
    marginTop: 100,
    backgroundColor: "#f1f1f1",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: 'hidden'
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    position: 'absolute',
    top: 40,
    left: 30
  },
  avatar: {
    position: 'absolute',
    top: 15,
    right: 10,
    borderWidth: 3,
    borderRadius: 50,
    borderColor: "white",
    resizeMode: "contain",
    overflow: "hidden"
  },
  users: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 32,
    marginTop: 30
  },
  list: {
    marginHorizontal: 20,
    marginTop: 20
  },
  item: {
    margin: 6,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 1,
    flexDirection: "row"
  },
  lottie: {
    height: 100,
    width: 100
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
  refresh: {
    position: "absolute",
    right: 70,
    top: 20,
    backgroundColor: "white",
    zIndex: 100,
    elevation: 3
  },
  inbox: {
    position: "absolute",
    right: 20,
    top: 20,
    backgroundColor: "white",
    zIndex: 100,
    elevation: 3
  },
  back: {
    position: "absolute",
    top: 20,
    left: -50
  },
  userInfo: {
    position: "absolute",
    top: 250,
    left: 70,
    flex: 1,
    backgroundColor: "#35ce8d",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  logout: {
    fontSize: 20,
    padding: 10,
    color: "#35ce8d",
    fontWeight: "bold"
  },
  logoutBtn: {
    backgroundColor: "white",
    width: 250,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 50,
    borderRadius: 30,
    elevation: 4
  },
  userName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white"
  },
  userEmail: {
    fontSize: 18,
    color: "white",
    fontWeight: 'bold'
  }

});


export default Userscreen
