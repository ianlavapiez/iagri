import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

const HistoryScoreScreen = ({ navigation }) => {
  const mode = navigation.state.params.mode;

  const [score, setScore] = useState([]);

  useEffect(() => {
    async function getScore() {
      try {
        const value = await AsyncStorage.getItem(mode ? "timeTrialTotalScore" : "notTimeTrialTotalScore");

        if (value !== null) {
          setScore(value.split(","));
        } else {
          setScore([]);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getScore();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{mode ? "Time Trial Mode" : "Regular Mode"}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      <View style={styles.questionBox}>
        <ScrollView horizontal={false} contentContainerStyle={styles.scoreBox}>
          {score.length > 0 &&
            score.map((item, idx) => {
              if (item === "" || item === null) {
                return null;
              } else {
                return (
                  <View style={styles.scoreContainer} key={idx}>
                    <Text style={styles.questionHeader}>Game {idx + 1}</Text>
                    <Text style={styles.questionHeader}>{item}</Text>
                  </View>
                );
              }
            })}
        </ScrollView>
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
  scoreContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "100%",
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  questionHeader: {
    fontSize: 13,
    color: "#4FB767",
    fontWeight: "bold",
    marginBottom: 10,
  },
  scoreBox: {
    color: "#199A8E",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 270,
  },
  questionBox: {
    color: "#199A8E",
    width: 300,
    height: 600,
    backgroundColor: "white",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#C0C0C0",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    margin: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 1,
    alignItems: "flex-start",
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

export default HistoryScoreScreen;
