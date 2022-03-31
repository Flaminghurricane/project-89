import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feed from '../screens/Feed'
import CreatePost from '../screens/CreatePost' 
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createBottomTabNavigator();

export default class BottomTabNavigator extends Component {
  constructor() {
    constructor(props); {
      super(props);
      this.state = {
        light_theme: true
      };
    }

    componentDidMount(); {
      let theme;
      firebase
        .database()
        .ref("/users/" + firebase.auth().currentUser.uid)
        .on("value", function (snapshot) {
          theme = snapshot.val().current_theme;
        });
      this.setState({ light_theme: theme === "light" ? true : false });
    }
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Feed') {
              iconName = focused
                ? 'book'
                : 'book-outline';
            } else if (route.name === 'CreatePost') {
              iconName = focused ? 'create' : 'create-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="CreatePost" component={CreatePost} />
      </Tab.Navigator>
    );
  }
}

