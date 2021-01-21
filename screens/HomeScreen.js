import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TouchableHighlight } from "react-native";
import * as DocumentPicker from "expo-document-picker";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectFile = async () => {
    const getFile = await DocumentPicker.getDocumentAsync();

    if (
      getFile.name === "agriculturalEconomicsArray.js" ||
      getFile.name === "agriculturalExtensionArray.js" ||
      getFile.name === "animalScienceArray.js" ||
      getFile.name === "cropProtectionArray.js" ||
      getFile.name === "cropScienceArray.js" ||
      getFile.name === "soilScienceArray.js"
    ) {
      setTimeout(() => {
        alert("File has successfully replaced.");
      }, 3000);
    } else {
      alert("File is invalid.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.containerCenter}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Take note that the import data only accepts the following js file names:
              </Text>
              <Text style={styles.descText}>1. agriculturalEconomicsArray.js</Text>
              <Text style={styles.descText}>2. agriculturalExtensionArray.js</Text>
              <Text style={styles.descText}>3. animalScienceArray.js</Text>
              <Text style={styles.descText}>4. cropProtectionArray.js</Text>
              <Text style={styles.descText}>5. cropScienceArray.js</Text>
              <Text style={styles.descText}>6. soilScienceArray.js</Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => selectFile()}
              >
                <Text style={styles.textStyle}>Import Data</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "maroon", marginTop: 10 }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.errorStyle}>Exit</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
      <Image style={styles.logo} source={require("../assets/home-logo.png")} />
      <Text style={styles.title}>iAgri</Text>
      <Text style={styles.description}>An Agriculturist Board Exam E-Reviewer</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Menu")}>
        <Text style={styles.buttonText}>Let's Get Started</Text>
      </TouchableOpacity>
      <View style={styles.upperContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Import Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  containerCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    display: "flex",
  },
  upperContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 70,
    marginBottom: 20,
  },
  logo: {
    margin: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4FB767",
  },
  description: {
    marginTop: 10,
    fontSize: 18,
    color: "#4FB767",
  },
  button: {
    position: "relative",
    color: "#199A8E",
    width: 300,
    height: 50,
    backgroundColor: "#199A8E",
    borderRadius: 5,
    shadowColor: "#C0C0C0",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    margin: 20,
    display: "flex",
    justifyContent: "center",
    elevation: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  errorStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  descText: {
    marginBottom: 15,
    textAlign: "left",
  },
});

export default HomeScreen;
