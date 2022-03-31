import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native-gesture-handler";
import PostCard from '../screens/PostCard'
import firebase from 'firebase'
import { Alert } from "react-native-web";

export default class Feed extends Component {
  constructor(props){
    super(props)
    this.state={
      fontsLoaded:false,
      light_theme:true,
      posts: []
    }
  }

  
  fetchPosts=()=>{
    firebase.database().ref("/posts/")
    .on("value",(snapshot)=>{
      let posts=[]
      if(snapshot.val()){
        console.log(snapshot.val())
        Object.keys(snapshot.val()).forEach(function(key){
          posts.push({
            key:key,
            value:snapshot.val()[key]

          })
        })
      }
      this.setState({posts:posts})
      this.props.setUpdateToFalse()
    },
    function(errorObject){
      console.log("The read failed :" + errorObject.code)
    })
  }
  renderItem = ({ item: post }) => {
    return <PostCard post={post} navigation={this.props.navigation} />;
  };

  async addPost(){
    if(this.state.caption){
      let postData={
        preview_image:this.state.previewImage,
        caption:this.state.caption,
        author:firebase.auth().currentUser.displayName,
        created_on:new Date(),
        author_uid:firebase.auth().currentUser.uid,
        profile_image:this.state.profile_image,
        likes:0
      };
      await firebase 
                    .database()
                    .ref("/posts/"+Math.random().toString(36).slice(2))
                    .set(postData)
                    .then(function (snapshot){});
            this.props.setUpdateToTrue();
            this.props.navigation.navigate("Feed")
    }else{
      Alert.alert("Error","all fields are required!",[{text:"OK",onPress:()=>console.log("OK Pressed")}],{cancelable:false})
    }
  }
  
    render() {
        return (
           <View style={StyleSheet.container}>
           <SafeAreaView style={styles.droidSafeArea}/>
           <View style={styles.appTitle}>
            <View style={styles.appIcon}>
             <Image source={require("../assets/logo.png")} style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
                <Text styles={styles.appTitleText}Spectogram></Text>
            </View>
           </View>
           <View style={styles.cardContainer}>
            <FlatList 
            keyExtractor={this.keyExtractor}
            data={posts}
            renderItem={this.renderItem}/>
           </View>
           </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black"
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row"
    },
    appIcon: {
      flex: 0.2,
      justifyContent: "center",
      alignItems: "center"
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
    },
    appTitleTextContainer: {
      flex: 0.8,
      justifyContent: "center"
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(28),
      
    },
    cardContainer: {
      flex: 0.85
    }
  });