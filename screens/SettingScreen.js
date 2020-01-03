import React from "react";
import { Button, View, StyleSheet, Text, ScrollView } from "react-native";
import Constants from "expo-constants"
/*
  Taryn Pratt
  SettingScreen Deletes Specified category name and all 
  asociated in the category name
*/ 
export default class SettingsScreen extends React.Component {
  //Delete is manly operated in App.js as it is passed with
  //screenProps with the targeted category name
  delete = (catName) => {
    this.props.screenProps.onRemove(catName)    
  }  
  render() {
    return (
      <View style={styles.container}>          
          <ScrollView style={styles.scroll}>
            {this.props.screenProps.catagories.map((item, key) => {
              return(               
                <View key ={key} style={styles.container}>
                <Button 
                  title='Delete' 
                  onPress={() => this.delete(item.name)}
                />
                <Text style = {styles.text}> {'Category ' + item.category + " "  + key + ":: "} 
                  {item.name} {item.number}
                </Text> 
                <View style = {styles.separator}/>
                </View>
              )
            })}
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    justifyContent: "flex-end",
  },
  text: {
    textAlign: "center",
    fontSize: 16
  }
});
