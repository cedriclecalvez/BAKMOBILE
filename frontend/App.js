console.disableYellowBox = true;
import React from 'react';
import FilterScreen from './Screens/FilterScreen'
import ProfileScreen from './Screens/ProfileScreen'
import SellScreen from './Screens/SellScreen'
import BasketScreens from './Screens/BasketScreens'
import ProductScreens from './Screens/ProductScreens'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import { FontAwesome } from '@expo/vector-icons'; 
import {createAppContainer }  from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreens from './Screens/HomeScreens'
import ResultScreens from './Screens/ResultScreens';
import AddPicScreen from './Screens/AddPicScreen';
import product from '../frontend/reducers/Article.reducer';
import typeOfAction from './reducers/typeOfAction.reducer'
import ProfileMenuScreen from './Screens/ProfileMenuScreen'
import SignUpScreen from './Screens/SignupScreens'
import photo from '../frontend/reducers/Pic.reducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
import ProfileBoughtArticleScreen from './Screens/ProfileBoughtArticleScreen'
import ProfileSellingArticleScreen from './Screens/ProfileSellingArticleScreen'
import SigninScreens from './Screens/SigninScreens';
import token from './reducers/Token.reducer'
import WalletScreens from './Screens/WalletScreens'
import ProfileUpdateScreen from './Screens/ProfileUpdateScreen'
import subcat from './reducers/Filtre.reducer';


const store = createStore(combineReducers({photo,product,token,typeOfAction,subcat}));


var StackNavigatorSearch = createStackNavigator({ 

  
  Filter:  FilterScreen,  
  Result: ResultScreens, 
  Product: ProductScreens,
  Basket: BasketScreens,

}, 
{headerMode: 'none'}
);  
  
var stackNavigatorSell =  createStackNavigator({  
  
  Sell: SellScreen,
  AddPic: AddPicScreen,
  AddArticle :ProfileSellingArticleScreen,

},
{headerMode: 'none'})

var StackNavigatorProfile = createStackNavigator({ 

  Menu: ProfileMenuScreen,
  ProfileUser:ProfileScreen, 
  ArticleBought: ProfileBoughtArticleScreen, 
  ArticleSell: ProfileSellingArticleScreen,
  MyWallet:WalletScreens,
  ProfileUp:ProfileUpdateScreen,
  SignUp: SignUpScreen, 
  SignIn:SigninScreens
}, 

{headerMode: 'none'}

);  

var BottomNavigator = createBottomTabNavigator({
  
  Home:HomeScreens,
  Vendre: stackNavigatorSell,
  Rechercher: StackNavigatorSearch,
  'Mon Profil': StackNavigatorProfile,
  
 },
  {
   defaultNavigationOptions: ({ navigation }) => ({
     tabBarIcon: ({ tintColor }) => {
      var iconName;
         if (navigation.state.routeName == 'Home') {
        iconName = 'home';
       }
         else if (navigation.state.routeName == 'Vendre') {
        iconName = 'plus';
       } else if (navigation.state.routeName == 'Rechercher') {
         iconName = 'search';
       } else if (navigation.state.routeName == 'Mon Profil') {
         iconName = 'user-o';
      }
       return <FontAwesome name={iconName} size={25} color={tintColor} />;
      },
    }),
     tabBarOptions: {
      activeTintColor: '#82589F',
      inactiveTintColor: '#FFFFFF',
      style: {
       backgroundColor: '#D6A2E8',
      }
    }
   

  });



const Navigation = createAppContainer(BottomNavigator);

export default function App(){
    return (

      <Provider store={store}>
        <Navigation/>
      </Provider>

      )
}
