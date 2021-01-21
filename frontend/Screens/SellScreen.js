import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Picker, AsyncStorage } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {DISTANT_HOST} from '../variable'


function SellScreen(props) {

  const [titleInput, setTitleInput] = useState("");
  const [desc, setDesc] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [shippingFees, setShippingFees] = useState("");
  const [age, setAge] = useState('');

  const [catName, setCatName] = useState('');
  const [selectedCatName, setSelectedCatName] = useState(false)
  const [DisplaySubCat, setDisplaySubCat] = useState([]);
  const [subCatName, setSubCatName] = useState('');
  const [selectedValueState, setSelectedValueState] = useState("");
  
  // FUNCTION TO CLEAN ALL INPUTS
  function clickToClean() {
    setTitleInput("");
    setDesc("");
    setBrand("");
    setPrice("");
    setShippingFees("");
    setAge("");
    setAge("");
    setCatName("");
    setSubCatName("");
    setSelectedValueState(false);
    setDisplaySubCat([]);
  }

  useEffect(() => {
    AsyncStorage.getItem('userToken', (err, value) => {
      if (value) {
        props.onSubmitToken(value);
      }
    })
  }, []);

  var typeOfAction = 'vendeur';

  // FUNCTION TO PASS ALL ARTICLE'S DATA
  
  var handleClick = async () => {

    if (props.takeToken != '') {
      clickToClean();
      props.onSubmitDecreasePhoto();
      var image = JSON.stringify(props.addPhoto);
      const dataArticle = await fetch(`${DISTANT_HOST}/articles/create-article`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `title=${titleInput}&description=${desc}&brand=${brand}&price=${price}&shippingFees=${shippingFees}&age=${age}&category=${catName}&subcategory=${subCatName}&state=${selectedValueState}&images=${image}&sellerToken=${props.takeToken}`
      });

      const dataAnnonce = await dataArticle.json()
      props.navigation.navigate('ArticleSell')
    }
    else {
      props.navigation.navigate('SignIn')
    }
  }
  // FILTERS FOR PICKERS
  var subCat1 = [
    { subcategory: "Sièges Auto" },
    { subcategory: "Nacelles" },
    { subcategory: "Poussettes" },
    { subcategory: "Landeaux" },
    { subcategory: "Portes-Bébé" },
    { subcategory: "Sacs à Langer" },
    { subcategory: "Se déplacer / Autre" },
  ]

  var subCat2 = [
    { subcategory: "de 0 à 3 mois" },
    { subcategory: "de 4 à 6 mois" },
    { subcategory: "de 7 à 12 mois" },
    { subcategory: "de 13 à 18 mois" },
    { subcategory: "de 19 à 24 mois" },
    { subcategory: "de 2 à 3 ans" },
    { subcategory: "Autres" },
  ]

  var subCat3 = [
    { subcategory: "Baignoires" },
    { subcategory: "Transats de bain" },
    { subcategory: "Lingettes-Serviettes" },
    { subcategory: "Thermometres" },
    { subcategory: "Jouets de bain" },
    { subcategory: "Se baigner / Autre" },
  ]

  var subCat4 = [
    { subcategory: "Lits bébé" },
    { subcategory: "Lits de voyage" },
    { subcategory: "Linges de lit" },
    { subcategory: "Gigoteuses" },
    { subcategory: "Veilleuses" },
    { subcategory: "Babyphones" },
    { subcategory: "Dormir / Autre" },
  ]

  var subCat5 = [
    { subcategory: "Biberons" },
    { subcategory: "Chauffe-Biberons" },
    { subcategory: "Stérilisateurs" },
    { subcategory: "Robots de Cuisine" },
    { subcategory: "Vaiselles" },
    { subcategory: "Accessoires" },
    { subcategory: "Manger / Autre" },
  ]

  if (catName == "Se déplacer" && selectedCatName == true) {
    setDisplaySubCat(subCat1)
    setSelectedCatName(false)

  }
  else if (catName == "S'habiller" && selectedCatName == true) {
    setDisplaySubCat(subCat2)
    setSelectedCatName(false)
  }
  else if (catName == "Se baigner" && selectedCatName == true) {
    setDisplaySubCat(subCat3)
    setSelectedCatName(false)
  }
  else if (catName == "Dormir" && selectedCatName == true) {
    setDisplaySubCat(subCat4)
    setSelectedCatName(false)
  }
  else if (catName == "Manger" && selectedCatName == true) {
    setDisplaySubCat(subCat5)
    setSelectedCatName(false)
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '90%' }}>

        <Button
          buttonStyle={{ marginTop: 60, marginBottom: 40, borderColor: "#82589F" }}
          titleStyle={{ fontSize: 25, color: "#82589F" }}
          icon={
            <FontAwesome name="camera" size={24} color="#82589F" />
          }
          title=" Ajouter des photos"
          type="outline"
          onPress={() => props.navigation.navigate('AddPic')}
        />

        <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 20, justifyContent: "space-between" }}>
          <View>
            <Image source={{ uri: props.addPhoto[0] }} style={{ height: 70, width: 60 }} />
          </View>
          <View>
            <Image source={{ uri: props.addPhoto[1] }} style={{ height: 70, width: 60 }} />
          </View>
          <View>
            <Image source={{ uri: props.addPhoto[2] }} style={{ height: 70, width: 60 }} />
          </View>
          <View>
            <Image source={{ uri: props.addPhoto[3] }} style={{ height: 70, width: 60 }} />
          </View>
          <View>
            <Image source={{ uri: props.addPhoto[4] }} style={{ height: 70, width: 60 }} />
          </View>
        </View>

        <Input style={{ width: '90%' }}
          placeholder='Titre'
          value={titleInput}
          onChangeText={(val) => setTitleInput(val)}
        />
        <Input style={{ width: '90%' }} multiline={true}
          placeholder="Description de l'article"
          value={desc}
          onChangeText={(val) => setDesc(val)}
        />
        <Input style={{ width: '90%' }}
          placeholder="Marque"
          value={brand}
          onChangeText={(val) => setBrand(val)}
        />
        <Input style={{ width: '90%' }}
          placeholder='Prix'
          value={price}
          onChangeText={(val) => setPrice(val)}
          keyboardType='numeric'
        />
        <Input style={{ width: '90%' }}
          placeholder='Frais de port'
          value={shippingFees}
          keyboardType='numeric'
          onChangeText={(val) => setShippingFees(val)}
          keyboardType='numeric'
        />
        <Input style={{ width: '90%' }}
          placeholder='Age'
          value={age}
          onChangeText={(val) => setAge(val)}
        />

        <View style={styles.buttonRow2}>
          <Picker
            selectedValue={catName}
            style={{ height: 50, width: 250, justifyContent: 'center' }}

            onValueChange={(itemValue, itemIndex) => {
              setCatName(itemValue);
              setSelectedCatName(true)
            }
            }>
            <Picker.Item label="Catégories" value="" />
            <Picker.Item label="Se déplacer" value="Se déplacer" />
            <Picker.Item label="S'habiller" value="S'habiller" />
            <Picker.Item label="Se baigner" value="Se baigner" />
            <Picker.Item label="Dormir" value="Dormir" />
            <Picker.Item label="Manger" value="Manger" />
          </Picker>
        </View>

        <View style={styles.buttonRow2}>
          <Picker
            selectedValue={subCatName}
            style={{ height: 50, width: 250, justifyContent: 'center' }}

            onValueChange={(itemValue, itemIndex) => {
              setSubCatName(itemValue)
            }}>

            {DisplaySubCat.map((e, i) => {
              return (
                <Picker.Item label={e.subcategory} value={e.subcategory} />
              )
            }
            )}
          </Picker>
        </View>

        <View style={styles.buttonRow2}>
          <Picker
            selectedValue={selectedValueState}
            style={{ height: 50, width: 250, justifyContent: 'center' }}

            onValueChange={(itemValue, itemIndex) => {
              setSelectedValueState(itemValue);

            }
            }>
            <Picker.Item label="Etat" value="" />
            <Picker.Item label="Neuf" value="Neuf" />
            <Picker.Item label="Bon état" value="Bon état" />
            <Picker.Item label="Etat d'usage" value="Etat d'usage" />
          </Picker>
        </View>

        <Button
          title="Ajouter mon annonce"
          type="solid"
          buttonStyle={{ backgroundColor: "#82589F" }}
          onPress={() => { handleClick(); props.onSubmitTypeOfAction(typeOfAction) }}
          containerStyle={{ marginBottom: 20 }}
        />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
  },
  buttonRow2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 70,
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

function mapDispatchToProps(dispatch) {
  return {
    onSubmitTypeOfAction: function (typeOfAction) {
      dispatch({ type: 'sell', typeOfAction })
    },
    onSubmitToken: function (token) {
      dispatch({ type: 'informationFromSellScreen', token: token })
    },
    onSubmitDecreasePhoto: function () {
      dispatch({ type: 'decrease', picture: null })
    }
  }
}

function mapStateToProps(state) {
  return { addPhoto: state.photo, takeToken: state.token }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellScreen);
