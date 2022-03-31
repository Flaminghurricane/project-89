import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
 
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";
import { Alert } from "react-native-web";


export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: "image_1",
      light_theme: true,
      dropdownHeight: 40
    };
  }


  async addPost(){
    if(this.state.caption){
      let postData={
        preview_images:this.state.preview_images,
        caption:this.state.caption,
        author:firebase.auth().currentUser.displayName,
        created_on:new Date(),
        author_uid:firebase.auth.currentUser.uid,
        profile_image:this.state.profile_image,
        likes:0
      };
      await firebase
            .database()
              .ref(
                "/posts/"+
                Math.random()
                .toString(36)
                .slice(2)
              )
              .set(postData)
              .then(function(snapshot){});
      this.props.setUpdateToTrue();
      this.props.navigation.navigate("Feed");
            
    }else{
      Alert.alert(
        "Error",
        "All fields are required!",
        [{text:"OK",onPress:()=>console.log("Ok Pressed")}],
        {cancelable:false}
      );
    }
  }
  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };
    render() {
        return (
            <View style={styles.container}>
             <SafeAreaView style={styles.droidSafeArea}/>
             <View style={styles.appTitle}>
              <View style={styles.appIcon}>
                 <Image
                 source={require("../assets/logo.png")}
                 style={styles.iconImage}></Image>
              </View>
              <View style={styles.appTitleTextContainer}>
               <Text style={styles.appTitleText}>New Post</Text>
              </View>
             </View>
             <View style={styles.fieldsContainer}>
                 <ScrollView>
                     <Image
                     source={preview_images[this.state.previewImage]}
                     style={styles.previewImage}></Image>
                     <View style={{height:RFValue(this.state.dropdownHeight)}}>
                         <DropDownPicker
                           items={[
                               {label:'Image1',value:'image_1'},
                               {label:'Image2',value:'image_2'},
                               {label:'Image3',value:'image_3'},
                               {label:'Image4',value:'image_4'},
                               {label:'Image5',value:'image_5'},
                               {label:'Image6',value:'image_6'},
                               {label:'Image7',value:'image_7'}
                           ]}
                           defaultValue={this.state.previewImage}
                           containerStyle={{
                               height:40,
                               borderRadius:20,
                               marginBottom:10
                           }}
                           onOpen={()=>{this.setState({dropdownHeight:170});}}
                           onClose={()=>{this.setState({dropdownHeight:40});}}
                           style={{backgroundColor:"transparent"}}
                           itemStyle={{justifyContent:"flex-start"}}
                           dropDownStyle={{backgroundColor:"2a2a2a"}}
                           labelStyle={{color:"white"}}
                           arrowStyle={{color:"white"}}
                           onChangeItem={(item)=>{this.setState({previewImage:item.value})}}
                           />
                     </View>
                     <TextInput 
                     style={styles.inputFont}
                     onChangeText={(caption)=>{this.setState({caption})}}
                     placeholder={"caption"}
                     placeholderTextColor="white"/>
                 <View>
                 <Button 
              onPress={()=>{this.addPost()}}
              title="Submit"
              color="#841584"/>
                 </View>
                 </ScrollView>
             </View>
             <View style={{flex:0.08}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row"
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center"
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(28),
     
    },
    fieldsContainer: {
      flex: 0.85
    },
    previewImage: {
      width: "93%",
      height: RFValue(250),
      alignSelf: "center",
      borderRadius: RFValue(10),
      marginVertical: RFValue(10),
      resizeMode: "contain"
    },
    inputFont: {
      height: RFValue(40),
      borderColor: "white",
      borderWidth: RFValue(1),
      borderRadius: RFValue(10),
      paddingLeft: RFValue(10),
      color: "white",
     
    },
    inputFontExtra: {
      marginTop: RFValue(15)
    },
    inputTextBig: {
      textAlignVertical: "top",
      padding: RFValue(5)
    },
    PostCardLight: {
      margin: RFValue(20),
      backgroundColor: "#eaeaea",
      borderRadius: RFValue(20)
    },
    authorNameText:{
      color:"black",
      fontSize:RFValue(20)
    },
    authorNameTextLight:{
      color:"white",
      fontSize:RFValue(20)
    }
  });
  