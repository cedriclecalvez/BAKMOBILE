import React from 'react';
import { View,AsyncStorage } from 'react-native';
import { ListItem } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import { connect } from 'react-redux';
  
  const ProfileMenuScreen = ({navigation,onSubmitToken}) => {
    return (

      <View style={{marginTop: 50}}>

        <ListItem bottomDivider onPress= {() => navigation.navigate('ProfileUser')}>
          <FontAwesome name="user-circle-o" size={20}  color="#82589F"/>
          <ListItem.Content>
            <ListItem.Title >Mon Profil</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem bottomDivider onPress= {() => navigation.navigate('ArticleSell')}>
          <FontAwesome5 name="store" size={18} color="#82589F" />
          <ListItem.Content>
            <ListItem.Title>Mes ventes</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem bottomDivider onPress= {() => navigation.navigate('ArticleBought')}>
          <FontAwesome name="shopping-cart" size={20}  color="#82589F"/>
          <ListItem.Content>
            <ListItem.Title >Mes achats</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem bottomDivider onPress= {() => navigation.navigate('MyWallet')}>
          <FontAwesome name="euro" size={24} color="#82589F" />
          <ListItem.Content>
            <ListItem.Title >Mon porte-monnaie</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem bottomDivider onPress= {() => {navigation.navigate('Home');AsyncStorage.removeItem("userToken");onSubmitToken()}}>
          <FontAwesome name="sign-out" size={24} color="#82589F" />
          <ListItem.Content>
            <ListItem.Title >Log Out</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    );
  }

  function mapDispatchToProps(dispatch) {
    return {
      onSubmitToken: function (token) {
        dispatch({ type: 'informationFromLogOut', token:token})
      }
    }
  }

  export default connect(
  
    null,
    mapDispatchToProps
  
  )(ProfileMenuScreen);