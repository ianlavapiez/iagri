import React, { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import { ScrollView, View, Image, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";
import { category } from "../data/category";

const MenuScreen = ({ navigation }) => {
  let db;

  const [agriculturalEconomicsArray, setAgriculturalEconomicsArray] = useState([]);
  const [agriculturalExtensionArray, setAgriculturalExtensionArray] = useState([]);
  const [animalScienceArray, setAnimalScienceArray] = useState([]);
  const [cropProtectionArray, setCropProtectionArray] = useState([]);
  const [cropScienceArray, setCropScienceArray] = useState([]);
  const [soilScienceArray, setSoilScienceArray] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };

  const gameMode = (name, quiz) => {
    Alert.alert(
      "Game Mode",
      "Do you want to use time trial?",
      [
        {
          text: "Yes",
          onPress: () => navigation.navigate("Quiz", { name, quiz, timeTrial: true }),
          style: "cancel",
        },
        { text: "No", onPress: () => navigation.navigate("Quiz", { name, quiz, timeTrial: false }), style: "cancel" },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    async function openDatabase() {
      if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite")).exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "SQLite");
      }
      await FileSystem.downloadAsync(
        Asset.fromModule(require("../assets/database/iagri.sqlite3")).uri,
        FileSystem.documentDirectory + "SQLite/iagri.db"
      );

      db = SQLite.openDatabase("iagri.db");

      db.transaction((tx) => {
        tx.executeSql(
          "select * from agriculturaleconomics",
          (_, { rows: { _array } }) => setAgriculturalEconomicsArray(_array),
          (t, error) => setAgriculturalEconomicsArray(error.rows["_array"])
        );
      });

      // db.transaction((tx) => {
      //   tx.executeSql(
      //     "select * from agriculturalextension",
      //     (_, { rows: { _array } }) => setAgriculturalExtensionArray(_array),
      //     (t, error) => setAgriculturalExtensionArray(error.rows["_array"])
      //   );
      // });

      db.transaction((tx) => {
        tx.executeSql(
          "select * from animalscience",
          (_, { rows: { _array } }) => setAnimalScienceArray(_array),
          (t, error) => setAnimalScienceArray(error.rows["_array"])
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          "select * from cropprotection",
          (_, { rows: { _array } }) => setCropProtectionArray(_array),
          (t, error) => setCropProtectionArray(error.rows["_array"])
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          "select * from cropscience",
          (_, { rows: { _array } }) => setCropScienceArray(_array),
          (t, error) => setCropScienceArray(error.rows["_array"])
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          "select * from soilscience",
          (_, { rows: { _array } }) => setSoilScienceArray(_array),
          (t, error) => setSoilScienceArray(error.rows["_array"])
        );
      });

      return db;
    }

    openDatabase();
  }, []);

  console.log(
    agriculturalEconomicsArray.length,
    agriculturalExtensionArray.length,
    animalScienceArray.length,
    cropProtectionArray.length,
    cropScienceArray.length,
    soilScienceArray.length
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => gameMode(category.cropScience, shuffleArray(cropScienceArray))}
        >
          <Image style={styles.logo} source={require("../assets/crops.png")} />
          <Text>{category.cropScience}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => gameMode(category.animalScience, shuffleArray(animalScienceArray))}
        >
          <Image style={styles.logo} source={require("../assets/pawprint.png")} />
          <Text>{category.animalScience}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => gameMode(category.soilScience, shuffleArray(soilScienceArray))}
        >
          <Image style={styles.logo} source={require("../assets/plant.png")} />
          <Text>{category.soilScience}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => gameMode(category.cropProtection, shuffleArray(cropProtectionArray))}
        >
          <Image style={styles.logo} source={require("../assets/protect.png")} />
          <Text>{category.cropProtection}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => gameMode(category.economics, shuffleArray(agriculturalEconomicsArray))}
        >
          <Image style={styles.logo} source={require("../assets/megaphone.png")} />
          <Text>{category.economics}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => gameMode(category.communication, shuffleArray(agriculturalExtensionArray))}
        >
          <Image style={styles.logo} source={require("../assets/chat.png")} />
          <Text>{category.communication}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  button: {
    position: "relative",
    color: "#199A8E",
    width: 300,
    height: 200,
    backgroundColor: "white",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    borderRadius: 10,
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
  logo: {
    margin: 20,
  },
});

export default MenuScreen;
