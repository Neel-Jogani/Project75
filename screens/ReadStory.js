import * as React from 'react';

import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as firebase from 'firebase';
import db from '../config';
import { SearchBar } from 'react-native-elements';

export default class Read extends React.Component {
  constructor() {
    super();
    this.state = {
      lastVisibleTransaction: null,
      allTransactions: [],
      search:''
    };
  }

  fetchMoreTransactions = async ()=>{
    var text = this.state.search.toUpperCase()
    var enteredText = text.split("")

    
    if (enteredText[0].toUpperCase() ==='S'){
    const query = await db.collection("stories").where('stories','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
    query.docs.map((doc)=>{
      this.setState({
        allTransactions: [...this.state.allTransactions, doc.data()],
        lastVisibleTransaction: doc
      })
    
    })
    }
    }
    searchStory= async(text) =>{
      var enteredText = text.split("")  
      if (enteredText[0].toUpperCase() ==='S'){
        const story =  await db.collection("stories").where('story','==',text).get()
        story.docs.map((doc)=>{
          this.setState({
            allTransactions:[...this.state.allTransactions,doc.data()],
            lastVisibleTransaction: doc
          })
        })
      }
    }  
    
    componentDidMount = async ()=>{
      const query = await db.collection("stories").limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransactions: [],
          lastVisibleTransaction: doc
        })
      })
    }
  
  render() {
    return (
      <View style={{ backgroundColor: '#A8D1DF', margin: 0, height: 700 }}>

        <View style={styles.head}>
          <Text style={styles.headT}> Read Stories ...</Text>
        </View>

        <TextInput
          style={styles.inputBox}

          placeholder="Search Here - Title of The Story"
          onChangeText={(text) => {
            this.setState({
              search: text,
            });
          }}
        />
        <TouchableOpacity
          onPress={() => {
            this.searchStory(this.state.search);
          }}
          style={styles.button}>
          <Text style={{color: 'white',fontSize: 20,fontWeight: 'bold'}}> 
            Go
          </Text>
        </TouchableOpacity>
        <View>
        <FlatList
          data={this.state.allTransactions}
          renderItem={({item})=>(
            <View style={{borderBottomWidth: 2}}>
              <Text>{"title " + item.title}</Text>
              <Text>{"story: " + item.story}</Text>
              <Text>{"author: " + item.author}</Text>
            </View>
          )}
          keyExtractor= {(item, index)=> index.toString()}
          onEndReached ={this.fetchMoreTransactions}
          onEndReachedThreshold={0.7}
        /> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  head: {
    backgroundColor: '#FFD700',
    marginTop: 3,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    borderWidth: 2,
    borderColor: 'white',
    padding: 5,
  },

  headT: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 20,
    fontWeight: 'bold',
  },

  inputBox:{
    height: 40,
    borderColor: 'white',
    borderWidth: 2,
    textAlign: 'center',
    borderRadius: 30,
    marginRight: 15,
    marginTop: 30,
    width: 260,
    color: 'white',
  },

  button:{
    backgroundColor: '#FFD700',
    marginBottom: 5,
    textAlign: 'center',
    borderRadius: 100,
    borderWidth: 3,
    marginRight: 0,
    marginLeft: 270,
    borderColor: 'white',
    marginTop: -40,
    width: 50,
    alignItems: 'center'
  },

});
