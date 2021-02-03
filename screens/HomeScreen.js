import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TouchableHighlight } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

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
              <Text style={styles.modalText}>Important notes to consider before using this application:</Text>
              <Text style={styles.descText}>
                1. This application has 5 topics to choose from: <Text style={styles.boldMe}>Animal Science</Text>,
                <Text style={styles.boldMe}>Agricultural Extension and Communication</Text>,{" "}
                <Text style={styles.boldMe}>Crop Protection</Text>, <Text style={styles.boldMe}>Crop Science</Text>,{" "}
                <Text style={styles.boldMe}>Economics and Agricultural Marketing</Text>, and{" "}
                <Text style={styles.boldMe}>Soil Science</Text>.
              </Text>
              <Text style={styles.descText}>
                2. When choosing a category, you will be asked if what <Text style={styles.boldMe}>Game Mode</Text> are
                you will to choose, either with time trial or not.
              </Text>
              <Text style={styles.descText}>3. In time trial, you will only have 30 seconds to answer a question.</Text>
              <Text style={styles.descText}>
                4. Without time trial, you can patiently choose an answer at your own time.
              </Text>
              <Text style={styles.descText}>
                5. In every question, there's a corresponding message if your answer is correct or not and there will be
                a short explanation about the correct answer.
              </Text>
              <Text style={styles.descText}>
                6. After you take a quiz, you will be redirected to your score and you can also view your history score.
              </Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>I Understand</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
      <Image style={styles.logo} source={require("../assets/home-logo.png")} />
      <Text style={styles.title}>iReview</Text>
      <Text style={styles.description}>An ISCOF Board Exam E-Reviewer</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Menu")}>
        <Text style={styles.buttonText}>Let's Get Started</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Guidelines</Text>
      </TouchableOpacity>
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
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButtonView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
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
    textAlign: "left",
    fontWeight: "bold",
  },
  descText: {
    marginBottom: 15,
  },
  boldMe: {
    fontWeight: "bold",
  },
});

export default HomeScreen;
