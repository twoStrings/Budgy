import React from 'react';
import { StyleSheet, View, Button, Text, ScrollView } from 'react-native';
import Constants from "expo-constants";


export default class StudentList extends React.Component {

  state = {
  isFormValid: false,
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Home',
    headerRight: (
      <Button
        title='Add Category'
        color='#00ff02'
        onPress={() => {
          navigation.navigate('AddCategoryScreen');
        }}
      />),
  })
  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Text style={styles.counter}>
		  {'Total Spent'}
      </Text>
	  <Text style={styles.counter2}>
		  {this.props.screenProps.totalSpent}
      </Text>
	  <Text style={styles.counter}>
		  {'Cash Remaining'}
      </Text>
	  <Text style={styles.counter2}>
		  {this.props.screenProps.cashRemain}
      </Text>
      <ScrollView style={styles.scroll}>
        {this.props.screenProps.catagories.map((item, key) => {
          return(
            <View key ={key} style={styles.container}>
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
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    justifyContent: "flex-end",
  },
  scroll: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#707080',
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
    counter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "flex-end",
    fontSize: 48,
    textAlign: 'center',
    height: 60,
    margin: 10,
  },
    counter2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "flex-end",
    fontSize: 38,
    textAlign: 'center',
    height: 60,
    margin: 10,
    backgroundColor: '#fff'
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  }
});

