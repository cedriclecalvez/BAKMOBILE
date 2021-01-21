import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Text, StyleSheet, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import {DISTANT_HOST} from '../variable'


function SignUpScreens({ onSubmitToken, navigation, typeOfAction }) {
  
  const [gender, setGender] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumb, setPhoneNumb] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [isConnect, setIsConnect] = useState(false)
  const [isNotConnect, setIsNotConnect] = useState('')
  const [token, setToken] = useState('')
  const [tokenIsSubmited, setTokenIsSubmited] = useState(false)

  // FUNCTION TO CLEAN ALL INPUTS
  function clickToClean() {
    setFirstName("");
    setLastName("");
    setMail("");
    setPassword("");
    setPhoneNumb("");
    setAddress("");
    setPostalCode("");
    setCity("");

  }

  useEffect(() => {
    AsyncStorage.getItem('userToken', (err, value) => {
      if (value) {
        setToken(value);
        onSubmitToken(value);
        setTokenIsSubmited(true);
      }
    })
  }, []);


  var handleClick = async () => {

    const dataUsers = await fetch(`${DISTANT_HOST}/users/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `gender=${gender}&firstName=${firstName}&lastName=${lastName}&email=${email}&password=${password}&phoneNumb=${phoneNumb}&address=${address}&postalCode=${postalCode}&city=${city}`
    });


    const dataConsumers = await dataUsers.json()

    setIsConnect(dataConsumers.result)
    setIsNotConnect(dataConsumers.error)
    console.log(dataConsumers.saveUser.token)
    onSubmitToken(dataConsumers.saveUser.token)
    AsyncStorage.setItem('userToken', dataConsumers.saveUser.token);
  }

  if (isConnect == true) {
    if (typeOfAction == 'acheteur') {
      navigation.navigate('Basket');
    }
    else {
      navigation.navigate('Sell')
    }
  }



  return (

    <View style={{ flex: 1, marginTop: 50, width: '95%', marginLeft: 10 }}>

      <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 20 }}>Inscription</Text>


      {/* <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={150}> */}

        <ScrollView>

          <Input name="firstName" placeholder='Nom' value={firstName} autoCorrect={false} returnKeyType="next"
            onChangeText={(val) => setFirstName(val)} />

          <Input name="lastName" placeholder='Prénom' value={lastName} autoCorrect={false} returnKeyType="next"
            onChangeText={(val) => setLastName(val)} />

          <Input name="mail" placeholder='e-mail' value={email} autoCorrect={false} returnKeyType="next" keyboardType="email-address" autoCapitalize="none"
            onChangeText={(val) => setMail(val)} />

          <Input name="password" placeholder='Mot de passe' value={password} autoCorrect={false} returnKeyType="next" autoCapitalize="none"
            onChangeText={(val) => setPassword(val)}
            secureTextEntry={true} />

          <Input name="PhoneNumb" placeholder='Tél.' value={phoneNumb} keyboardType='numeric' returnKeyType="next"
            onChangeText={(val) => setPhoneNumb(val)} />

          <Input name="Address" placeholder='Adresse' value={address} autoCorrect={false} returnKeyType="next"
            onChangeText={(val) => setAddress(val)} />

          <Input name="Zip" placeholder='CP' value={postalCode} keyboardType='numeric' returnKeyType="next"
            onChangeText={(val) => setPostalCode(val)} />

          <Input name="City" placeholder='Ville' value={city} autoCorrect={false} returnKeyType="next"
            onChangeText={(val) => setCity(val)} />

          <Button style={{ marginTop: 20 }}
            title="M'inscrire"
            buttonStyle={{ backgroundColor: "#82589F" }}
            type="solid"
            onPress={() => { handleClick(); clickToClean() }
            }
          />
          <Text>{isNotConnect}</Text>
          <Button
            title="J'ai déjà un compte"
            type='outline'
            titleStyle={{ fontSize: 15, color: "#82589F" }}
            buttonStyle={{ justifyContent: 'flex-start', borderColor: 'white' }}
            onPress={() => { navigation.navigate('SignIn') }}
          />

        </ScrollView>

      {/* </KeyboardAvoidingView> */}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


function mapDispatchToProps(dispatch) {
  return {
    onSubmitToken: function (token) {
      dispatch({ type: 'informationFromSignUp', token: token })
    }
  }
}

function mapStateToProps(state) {
  return { typeOfAction: state.typeOfAction }
}


export default connect(

  mapStateToProps,
  mapDispatchToProps

)(SignUpScreens);