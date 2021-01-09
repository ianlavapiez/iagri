import React from "react";
import { ScrollView, View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { category } from "../data/category";
import agriculturalEconomicsArray from "../data/agriculturalEconomicsArray";
import agriculturalExtensionArray from "../data/agriculturalExtensionArray";
import animalScienceArray from "../data/animalScienceArray";
import cropProtectionArray from "../data/cropProtectionArray";
import cropScienceArray from "../data/cropScienceArray";
import soilScienceArray from "../data/soilScienceArray";

const MenuScreen = ({ navigation }) => {
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Quiz", { name: category.cropScience, quiz: shuffleArray(cropScienceArray) })
          }
        >
          <Image style={styles.logo} source={require("../assets/crops.png")} />
          <Text>{category.cropScience}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Quiz", { name: category.animalScience, quiz: shuffleArray(animalScienceArray) })
          }
        >
          <Image style={styles.logo} source={require("../assets/pawprint.png")} />
          <Text>{category.animalScience}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Quiz", { name: category.soilScience, quiz: shuffleArray(soilScienceArray) })
          }
        >
          <Image style={styles.logo} source={require("../assets/plant.png")} />
          <Text>{category.soilScience}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Quiz", {
              name: category.cropProtection,
              quiz: shuffleArray(cropProtectionArray),
            })
          }
        >
          <Image style={styles.logo} source={require("../assets/protect.png")} />
          <Text>{category.cropProtection}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Quiz", { name: category.economics, quiz: shuffleArray(agriculturalEconomicsArray) })
          }
        >
          <Image style={styles.logo} source={require("../assets/megaphone.png")} />
          <Text>{category.economics}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Quiz", {
              name: category.communication,
              quiz: shuffleArray(agriculturalExtensionArray),
            })
          }
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
