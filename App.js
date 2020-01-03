import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingScreen from './screens/SettingScreen';
import ViewScreen from './screens/ViewScreen';
import AddCategoryScreen from './screens/AddCategoryScreen';
import CategoryListScreen from './screens/CategoryListScreen';

//First Tab directed to. Contains the cash summary screen (CategoryListScreen.js)
//and the screen to Add a new category (AddcategoryScreen.js)
const HomeTab = createStackNavigator(
  {
    'CategoryListScreen': CategoryListScreen,
    'AddCategoryScreen': AddCategoryScreen,
  },
  {
    initialRouteName: 'CategoryListScreen',
    //stack header config
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#00ff02',
      },
    },
  });
  
  //Tab contains an option to search through categories (ViewScreen.js)
  const ViewTab = createStackNavigator(
    {
      View: ViewScreen,
    },
    {
      defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerTitle: 'View',
        headerStyle: {
          backgroundColor: '#00ff02',
        }
      }
    }
  )
  //Last Tab, Enables the user to delete a category from the app
  const SettingsTab = createStackNavigator(
    {
      Settings: SettingScreen,
    },
    {
      defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerTitle: 'Settings',
        headerStyle: {
          backgroundColor: '#00ff02',
        }
      }
    }
  )


const mainNagivator = createBottomTabNavigator(
  {
    Home: HomeTab,
    View: ViewTab,
    Settings: SettingsTab,    
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-${focused ? 'home' : 'home'}`;
        }
        else if (routeName === 'Settings') {
          iconName = `ios-${focused ? 'options' : 'cog'}`;
        }
        else if (routeName === 'View') {
          iconName = `ios-${focused ? 'list' : 'search'}`;
        }
        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#00ff02',
      inactiveTintColor: 'gray',
    },
  }
);

const AppContainer = createAppContainer(mainNagivator);

export default class App extends React.Component {
  //amount1 contains the total expense
  //amount2 contains the total remaining
  //Catagories stores all created categories to the array
  state = {
    catagories: [],
    amount1: 0,
    amount2: 0
  }

  //Screen prop passed that is mainly used in the Add screen. 
  //Function also totals the two ammounts 
  addCatagories = (std) => {
    if (std.category === 'Receipt')
    {
      this.state.amount2 += Number(std.number)
    }
    else
    {
      this.state.amount2 -= Number(std.number)
      this.state.amount1 += Number(std.number)
    }
    this.setState({ catagories: [...this.state.catagories, std] });
  }

  //screen prop passed deletes all instances of given category from array
  removeCatagories = (catName) => {
    this.setState({
      catagories: this.state.catagories.filter(item => item.name !== catName)
    })
  }

  //in addition to the two funcitons passed, the state values are also sent as screen props
  render() {
    return <AppContainer screenProps={{
      onSubmit: this.addCatagories,
      onRemove: this.removeCatagories,
      catagories: this.state.catagories,
      totalSpent: this.state.amount1,
      cashRemain: this.state.amount2,
    }} />;
  }
}