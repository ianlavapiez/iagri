import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HistoryScoreScreen from "./screens/HistoryScoreScreen";
import HistoryScreen from "./screens/HistoryScreen";
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
    History: {
      screen: HistoryScreen,
      navigationOptions: {
        title: "History",
      },
    },
    HistoryScore: {
      screen: HistoryScoreScreen,
      navigationOptions: {
        title: "History Score",
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
