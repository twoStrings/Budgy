import React from "react";
import { View, StyleSheet, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import Constants from "expo-constants"
import { TextInput } from "react-native-gesture-handler";
/*
    Taryn Pratt
    ViewScreen only has one state value named search. As text is 
    input into the text box handleSearchChange will update the Search
    and output all category names that fit the characters currently 
    given
*/
export default class ViewScreen extends React.Component {
    state = {
        search: ''
    }
    
    
    handleSearchChange = (search) => {
        this.setState({search})
    }
    
    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Search Categories'
                    value={this.state.search}
                    onChangeText={this.handleSearchChange}
                />
                <ScrollView style={styles.scroll}>
                    {this.props.screenProps.catagories.map( (item, key) => {
                        if (item.name.substring(0, this.state.search.length) === this.state.search) {
                            return(
                                <View key ={key} style={styles.container}>                                
                                    <Text style = {styles.text}> {'Category ' + item.category + " "  + key + ":: "} 
                                        {item.name} {item.number}
                                    </Text> 
                                    <View style = {styles.separator}/>
                                </View>
                            )
                        }
                    })}
                </ScrollView>
            </KeyboardAvoidingView>
        )
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

});