import * as React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground,TouchableOpacity,TextInput, Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { ToastAndroid } from 'react-native';


export default class LoginScreen extends React.Component {

  constructor(){
    super();
    this.state={
      emailId:'',
      password:'',
    }
  }

login=async(email, password)=>{ 
  if(email && password){    
    try{
        const response = await firebase.auth().signInWithEmailAndPassword(email, password);
        if(response){
            this.props.navigation.navigate('ReadScreen');
        }
      
    }
    catch(error){
        console.log(error);
        switch (error.code){
            case "auth/user-not-found": ToastAndroid('User does not exist ...', ToastAndroid.SHORT);
        break;
            case "auth/invalid-email": ToastAndroid('Incorrect email or passcode', ToastAndroid.SHORT);
        default: break;
    }
}
  }                 
    else{
        ToastAndroid('Enter your Email and Passcode !',ToastAndroid.SHORT)
    }
}

  render() {
    return (
      <View > 
     <ImageBackground source={{
       uri:'https://www.wallpapertip.com/wmimgs/48-486364_story-background.jpg'
     }} style={{width: '100%', height: '100%'}}>

          <TextInput
              style={{
                height: 40,
             borderColor: '#65c6bb',
                borderWidth: 1.5,
                placeholderTextColor: '#65c6bb',
                textAlign: 'center',
                marginRight: 35,
                marginLeft:35,
                marginTop:130,
                color:'#65c6bb',
                marginBottom:100

              }}
              placeholder="example@gmail.com"
             keyboardType="email-address"
              onChangeText={(text) =>
                this.setState({
                  emailId: text,
                })
              }
            />

            <TextInput
              style={{
                height: 40,
                borderColor: '#65c6bb',
                borderWidth: 1.5,
                placeholderTextColor: '#65c6bb',
                textAlign: 'center',
                   marginRight: 40,
                marginLeft:40,
                marginTop:70,
                marginBottom:100,
                color:'#65c6bb'
              }}
              placeholder="* * * * * * * *"
             secureTextEntry={true}
              onChangeText={(text) =>
                this.setState({
                  password: text,
                })
              }
            />

                <TouchableOpacity
        style={{ alignItems: "center",
    backgroundColor: 'rgba(101, 198, 187, 0.8)',
    padding: 10, 
       marginRight: 30,
                marginLeft:30,
                marginTop:100,
                marginBottom:25
    
    }}
       onPress={()=>{
this.login(this.state.emailId, this.state.password)

       }}
      >
        <Text style={{fontFamily:'cursive', color:'white', fontWeight:'bold'}}>LOG IN</Text>
      </TouchableOpacity>

      </ImageBackground>

      </View>



    );
  }
}


