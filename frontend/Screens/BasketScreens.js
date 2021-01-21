import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import { connect } from 'react-redux';
import Carousel from '../components/Carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DISTANT_HOST} from '../variable'

function BasketScreens({ navigation, productId, takeToken }) {

  console.log(productId);
  const [buyer, setBuyer] = useState({});
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  console.log('seller token in BasketScreen', productId.sellerToken);
  useEffect(() => {
    const findBuyer = async () => {
      const data = await fetch(`${DISTANT_HOST}/users/get-user?UserToken=${takeToken}`)
      const body = await data.json()
      setBuyer(body.data)

    }

    findBuyer();

  }, [])

  useEffect(() => {
    const findSeller = async () => {
      const data = await fetch(`${DISTANT_HOST}/users/get-seller?SellerToken=${productId.sellerToken}`)
      const body = await data.json()
      setFirstName(body.firstName)
      setLastName(body.lastName)

    }

    findSeller();

  }, [])


  var handleClick = async () => {

    const dataOrder = await fetch(`${DISTANT_HOST}/orders/validate-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `articleId=${productId._id}&clientToken=${takeToken}`
    });

    const dataAnnonce = await dataArticle.json()

  }

  let totalPrice = parseInt(productId.price) + parseInt(productId.shippingFees);
  const [selectedValue, setSelectedValue] = useState(false);
  var userData
  if (selectedValue == true) {
    userData = <View style={{ flexDirection: 'column', justifyContent: 'flex-start', margin: 10 }}>
      <Text>Mon adresse de livraison: </Text>
      <Text>{buyer.firstName}</Text>
      <Text>{buyer.lastName}</Text>
      <Text>{buyer.email}</Text>
      <Text>{buyer.address}</Text>
      <Text>{buyer.postalCode}</Text>
      <Text>{buyer.city}</Text>
    </View>
  }

  return (

    <View style={{ flex: 1, marginTop: 40, width: '95%', marginLeft: 10 }}>
      <FontAwesome name="long-arrow-left" size={24} color="#82589F"
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <Carousel />
        <View style={{ flexDirection: 'row', marginTop: 10 }}>

          <View style={{ marginLeft: 10 }}>
            <Text >{firstName} {lastName}</Text>
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
              <Icon name='star-o'
                color='#f9ca24'
                size={20}
              />
              <Icon name='star-o'
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
          <Text>Prix : {productId.price} €</Text>
        </View>
        <View style={styles.containerCarac}>
          <Text>Marque : {productId.brand}</Text>
          <Text>Frais de Port : {productId.shippingFees} €</Text>
        </View>
        <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginLeft: 10 }}>
          <Text> Total : {totalPrice} €</Text>
        </View>
        <DropDownPicker
          items={[
            { label: 'Colissimo', value: 'Colissimo' },
            { label: 'DHL', value: 'DHL' },
            { label: 'Happy-Post', value: 'Happy-Post' },
          ]}
          defaultIndex={0}
          defaultNull
          placeholder="Choisissez votre mode de livraison"
          containerStyle={{ height: 40, margin: 10 }}
          onChangeItem={() => { setSelectedValue(true) }}
        />
        {userData}

        <Button
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#82589F' }}
          title='Finaliser le paiement'
          onPress={() => { handleClick(); setModalVisible(true) }} />


        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Merci pour votre achat ! Le vendeur {firstName} {lastName} prépare votre colis !</Text>
              <Text style={styles.modalText}>Une fois la commande reçue, vous pourrez valider celle-ci sur votre compte utilisateur</Text>


              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#82589F" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate('ArticleBought')
                }}
              >
                <Text style={styles.textStyle}>Voir ma commande</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  containerCarac: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10

  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",

    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
});

function mapStateToProps(state) {
  console.log("state is stable", state.product)
  return { productId: state.product, takeToken: state.token }
};

export default connect(
  mapStateToProps,
  null
)(BasketScreens);
