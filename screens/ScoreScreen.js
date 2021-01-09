import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ScoreScreen = ({ navigation }) => {
  const score = navigation.state.params.score;

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/trophy.png")} />
      <Text style={styles.description}>Your Total Score</Text>
      <Text style={styles.title}>{score}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Menu")}>
        <Text style={styles.buttonText}>Go Back to Main Menu</Text>
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
  logo: {
    margin: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4FB767",
  },
  description: {
    marginBottom: 10,
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
});

export default ScoreScreen;
