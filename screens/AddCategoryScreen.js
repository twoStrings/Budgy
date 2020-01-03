import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Picker } from 'react-native';
import Constants from "expo-constants";
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
  },

  homeScreenButton: {
    alignItems: 'center',
    backgroundColor: '#00ff02',
    padding: 10,
  }
});


export default class AddStudentForm extends React.Component {

  static navigationOptions = {
    headerTitle: 'Add Category',
  }

  state = {
    name: '',
    number: '',
    isFormValid: false,
    category: 'Choose',
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.name !== prevState.name || this.state.number !== prevState.number
      || this.state.category !== prevState.category)
      this.validateForm();
  }

  validateForm = () => {
    console.log(this.state);
    if (isNaN(Number(this.state.name)) === true && isNaN(Number(this.state.number)) === false &&
      this.state.category !== 'Choose')
      this.setState({ isFormValid: true })
    else
      this.setState({ isFormValid: false })
  }


  handleNameChange = (name) => {
    //todo2 complete this function
    this.setState({ name })
  }

  handleNumberChange = (number) => {
    //todo2 complete this function
    this.setState({ number })
  }

  handleSubmit = () => {
    if (this.state.isFormValid) {
      this.props.screenProps.onSubmit(
        {
          name: this.state.name,
          number: this.state.number,
          category: this.state.category
        });
      this.props.navigation.navigate('CategoryListScreen');
    }
    else {
      alert('Form is invalid!');
    }
  }

  render() {
    console.log(this.state);
    return (
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Name of Category'
          value={this.state.name}
          onChangeText={this.handleNameChange}
        />
        <TextInput
          style={styles.input}
          value={this.state.number}
          keyboardType='numeric'
          maxLength={10}
          placeholder='Numeric Value'
          onChangeText={this.handleNumberChange}
        />
        <Picker
          selectedValue={this.state.display}
          style={styles.counter2}
          onValueChange={(itemValue) =>
            this.setState({ category: itemValue })
          }>
          <Picker.Item label="Choose a Type" value="Choose" />
          <Picker.Item label="Receipt" value="Receipt" />
          <Picker.Item label="Expense" value="Expense" />
        </Picker>
        <Button
          title='Add Category'
          onPress={this.handleSubmit}
          disabled={!this.state.isFormValid}
        />
        <TouchableOpacity style={styles.homeScreenButton} onPress={() => this.props.navigation.navigate('CategoryListScreen')}>
          <Text style={{ fontSize: 20 }}>Home Screen</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
