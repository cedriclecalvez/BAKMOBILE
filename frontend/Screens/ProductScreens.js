import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from '../components/Carousel';
import {DISTANT_HOST} from '../variable'




function ProductScreens({ navigation, productId, onSubmitTypeOfAction,takeToken }) {

  var typeOfAction = 'acheteur';
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  var typeOfAction = 'acheteur';

  var handleClick = async () => {

    if(takeToken){
      navigation.navigate('Basket')
    }else{
      navigation.navigate('SignIn')
    }
  }
  console.log(productId.sellerToken)
  useEffect(() => {
    const findSeller = async () => {
      const data = await fetch(`${DISTANT_HOST}/users/get-seller?SellerToken=${productId.sellerToken}`)
      const body = await data.json()
      setFirstName(body.firstName)
      setLastName(body.lastName)
      
    }

    findSeller();

  }, [])
  
  return (
    <View style={{ flex: 1, marginTop: 40, width: '95%', marginLeft: 10 }}>
      <FontAwesome name="long-arrow-left" size={24} color="#82589F"
        onPress={() => navigation.goBack()}
      />
      
      <ScrollView>
        <Carousel />
        <View style={{ flexDirection: 'row', marginTop: 10 }}>

          <View style={{ marginLeft: 10 }}>
            <Text style={{color:"black"}}>{firstName} {lastName}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon name='star'
                color='#f9ca24'
                size={20}
              />
              <Icon name='star'
                color='#f9ca24'
                size={20}
              />
              <Icon name='star'
                color='#f9ca24'
                size={20}
              />
              <Icon name='star'
                color='#f9ca24'
                size={20}
              />
              <Icon name='star'
                color='#f9ca24'
                size={20}
              />
              <Text style={{ marginLeft: 10 }}>46 évaluations</Text>
            </View>
          </View>
          <Icon style={{ marginLeft: 150 }}
            name='heart-o'
            color='#82589F'
            size={20}
          />
        </View>
        <View style={styles.containerCarac}>
          <Text style={{ fontWeight: 'bold' }}>{productId.title}</Text>
          <Text>Prix: {productId.price} €</Text>
        </View>
        <View style={styles.containerCarac}>
          <Text>Marque : {productId.brand}</Text>
          <Text>Frais de Port: {productId.shippingFees}€</Text>
        </View>
        <View style={styles.containerCarac}>
          <Text>Age : {productId.kidsAge}</Text>
        </View>
        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 10 }}>
          <ScrollView>
            <Text style={{ fontStyle: 'italic' }}>Description :</Text>
            <Text>{productId.description}</Text>
          </ScrollView>
        </View>
        <Button
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#82589F" }}
          type='solid'
          title='Acheter'
          onPress={() => { handleClick(); onSubmitTypeOfAction(typeOfAction) }}
        />
      </ScrollView>


    </View>



  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 30
  },

  image: {
    width: 355,
    height: 400,
  },

  containerCarac: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10

  }
});


function mapStateToProps(state) {
  return { productId: state.product, takeToken:state.token }
};

function mapDispatchToProps(dispatch) {
  return {
    onSubmitTypeOfAction: function (typeOfAction) {
      dispatch({ type: 'buy', typeOfAction })
    }
  }
}

export default connect(

  mapStateToProps,
  mapDispatchToProps


)(ProductScreens); 