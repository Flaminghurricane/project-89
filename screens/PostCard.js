import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
 
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";


export default class PostCard extends Component {
  constructor(props){
    super(props);
    this.state={
      light_theme:true,
      post_id:this.props.posts.key,
      post_data:this.props.posts.value
    }
  }
  render() {
      return (
        <View style={styles.container}>
         <View style={styles.cardContainer}>
         <View style={styles.authorContainer}>
          <View style={styles.authorImageContainer}> 
        <Image>
            source={require("../assets/profile_img.png")}
            style={styles.profileImage}
        </Image>
          </View>
          <View style={styles.authorNameContainer}>
          <Text style={styles.authorNameText}>{this.props.post.author}</Text>
          </View>
         </View>
         <Image source={require("../assets/post.jpeg")} style={styles.postImage}/>
         <View style={styles.actionContainer}>
          <Text style={styles.captionText}>{this.props.post.caption}</Text>
         </View>
         <View style={styles.actionContainer}>
           <View style={styles.likeButton}>
             <Ionicons name={"heart"} size={RFValue(30)} color={"white"}/>
             <Text style={styles.likeText}>12K</Text>
           </View>
         </View>
         </View>
        </View>
      );
    }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  profileImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  authorContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  storyTitleText: {
    fontSize: RFValue(25),
    
    color: "white"
  },
  authorNameText: {
    fontSize: RFValue(18),
    
    color: "white"
  },
  descriptionText: {
   
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10)
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});
