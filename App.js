import React from "react";
import { Image } from "react-native";
import ReadStoryScreen from "./screens/ReadStory";
import WriteStoryScreen from "./screens/WriteStory";
import LoginScreen from "./screens/LoginScreen";
import { createAppContainer,createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class App extends React.Component {
 
  render() {
   
    return( 
      <SafeAreaProvider>
    <AppContainer />
    </SafeAreaProvider>
    )

   
  }
  
}



const TabNavigator = createBottomTabNavigator({
  Read: {
    screen: ReadStoryScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("./assets/read.png")}
          style={{ width: 50, height: 50 }}
        />
      ),
      tabBarLabel: "ReadStory"
    },
  },
  Write: {
    screen: WriteStoryScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("./assets/write.png")}
          style={{ width: 50, height: 50 }}
        />
      ),
      tabBarLabel: "WriteStory"
    },
  },
  
});
// {defaultNavigationOptions: ({navigation})=>({
//   tabBarIcon: ()=>{
//     const routeName = navigation.state.routeName;
//     console.log(routeName)
//     if(routeName === "ReadStory"){
//       return(
//         <Image
//         source={require("./assets/read.png")}
//         style={{width:35, height:35}}
//        />
//       )
      
//     }
//     else if(routeName === "WriteStory"){
//       return(
//         <Image
//         source={require("./assets/write.png")}
//         style={{width:35, height:35}}
//        />
//       )
      
//     }
    
const switchNavigator= createSwitchNavigator({
  LoginScreen: LoginScreen,
  TabNavigator: TabNavigator
})

const AppContainer = createAppContainer(switchNavigator);