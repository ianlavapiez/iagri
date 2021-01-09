import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import QuizScreen from "./screens/QuizScreen";
import ScoreScreen from "./screens/ScoreScreen";

const navigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Home",
        headerShown: null,
      },
    },
    Menu: {
      screen: MenuScreen,
      navigationOptions: {
        title: "Select Reviewer",
      },
    },
    Quiz: {
      screen: QuizScreen,
      navigationOptions: {
        title: "Quiz",
      },
    },
    Score: {
      screen: ScoreScreen,
      navigationOptions: {
        title: "Score",
      },
    },
  },
  {
    initialRouteName: "Home",
  }
);

const App = createAppContainer(navigator);

export default () => {
  return <App />;
};
