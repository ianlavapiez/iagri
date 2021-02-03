import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import CountDown from "react-native-countdown-component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import randomWords from "random-words";
import { category } from "../data/category";

const QuizScreen = ({ navigation }) => {
  const quizName = navigation.state.params.name;
  const quiz = navigation.state.params.quiz;
  const timeTrial = navigation.state.params.timeTrial;

  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [count, setCount] = useState(0);
  const [timerVisible, setTimerVisible] = useState(false);
  const [isNext, setIsNext] = useState(false);

  useEffect(() => {
    if (quizName === category.cropScience) {
      setQuestion(quiz);
      setTotalScore(quiz.length);
    } else if (quizName === category.soilScience) {
      setQuestion(quiz);
      setTotalScore(quiz.length);
    } else if (quizName === category.cropProtection) {
      setQuestion(quiz);
      setTotalScore(quiz.length);
    } else if (quizName === category.animalScience) {
      setQuestion(quiz);
      setTotalScore(quiz.length);
    } else if (quizName === category.communication) {
      setQuestion(quiz);
      setTotalScore(quiz.length);
    } else if (quizName === category.economics) {
      setQuestion(quiz);
      setTotalScore(quiz.length);
    }
  }, []);

  useEffect(() => {
    setTimerVisible(true);
  }, []);

  const storeScore = async (value) => {
    if (timeTrial) {
      try {
        await AsyncStorage.setItem("timeTrialTotalScore", value);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await AsyncStorage.setItem("notTimeTrialTotalScore", value);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const checkAnswer = () => {
    const words = randomWords({ exactly: 15, join: " " });

    if (answer === question[count].answer) {
      setScore(score + 1);

      Alert.alert("Correct!", "Your answer is correct!\n\nThe meaning of the answer is " + words + ".");
    } else {
      Alert.alert(
        "Wrong!",
        "Your answer is wrong! The correct answer is " +
          question[count].answer.toUpperCase() +
          ". \n\nThe meaning of the answer is " +
          words +
          "."
      );
    }

    setTimerVisible(false);
  };

  const checkNoTrialAnswer = () => {
    const words = randomWords({ exactly: 15, join: " " });

    if (answer === "") {
      return Alert.alert("No answer!", "Please select an answer below.");
    }

    if (answer === question[count].answer) {
      setScore(score + 1);

      Alert.alert("Correct!", "Your answer is correct!\n\nThe meaning of the answer is " + words + ".");
    } else {
      Alert.alert(
        "Wrong!",
        "Your answer is wrong! The correct answer is " +
          question[count].answer.toUpperCase() +
          ". \n\nThe meaning of the answer is " +
          words +
          "."
      );
    }

    setIsNext(true);
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value !== null) {
        return value;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const nextQuestion = async () => {
    if (question.length > count + 1) {
      setCount(count + 1);
      setTimerVisible(true);
      return setAnswer("");
    }

    const value = await getData("timeTrialTotalScore");

    if (value !== null) {
      storeScore(value + score + ",");
    } else {
      storeScore(score + ",");
    }

    return navigation.navigate("Score", { score: score + " / " + totalScore });
  };

  const nextNoTrialQuestion = async () => {
    if (question.length > count + 1) {
      setCount(count + 1);
      setIsNext(false);
      return setAnswer("");
    }

    const value = await getData("notTimeTrialTotalScore");

    if (value !== null) {
      storeScore(value + score + ",");
    } else {
      storeScore(score + ",");
    }

    return navigation.navigate("Score", { score: score + " / " + totalScore });
  };

  const runCountDown = () => {
    return <CountDown until={30} timeToShow={["S"]} onFinish={() => checkAnswer()} size={20} />;
  };

  const showResult = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => nextQuestion()}>
        <Text style={styles.buttonText}>
          {question ? (question.length === count + 1 ? "See Results" : "Next Question") : "Next Question"}
        </Text>
      </TouchableOpacity>
    );
  };

  const submitAnswer = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => checkNoTrialAnswer()}>
        <Text style={styles.buttonText}>Submit Answer</Text>
      </TouchableOpacity>
    );
  };

  const showNoTrialResult = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => nextNoTrialQuestion()}>
        <Text style={styles.buttonText}>
          {question ? (question.length === count + 1 ? "See Results" : "Next Question") : "Next Question"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{quizName}</Text>
        <View style={styles.questionBox}>
          <Text style={styles.questionHeader}>Question #{count + 1}</Text>
          <Text style={styles.questionText}>{question ? question[count].question : ""}</Text>
        </View>
        {timeTrial && timerVisible ? <View style={styles.countdown}>{runCountDown()}</View> : null}
        {timeTrial && !timerVisible ? <View style={styles.countdown}>{showResult()}</View> : null}
        {!timeTrial && isNext ? <View style={styles.countdown}>{showNoTrialResult()}</View> : null}
        {!timeTrial && !isNext ? <View style={styles.countdown}>{submitAnswer()}</View> : null}
        {timeTrial ? (
          timerVisible ? (
            <View style={styles.answerView}>
              {question && question[count].a ? (
                <TouchableOpacity
                  style={answer === "A" ? styles.answerBoxSelected : styles.answerBox}
                  onPress={() => setAnswer("A")}
                >
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>A</Text>
                  </View>
                  <Text>{question ? question[count].a : ""}</Text>
                </TouchableOpacity>
              ) : null}
              {question && question[count].b ? (
                <TouchableOpacity
                  style={answer === "B" ? styles.answerBoxSelected : styles.answerBox}
                  onPress={() => setAnswer("B")}
                >
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>B</Text>
                  </View>
                  <Text>{question ? question[count].b : ""}</Text>
                </TouchableOpacity>
              ) : null}
              {question && question[count].c ? (
                <TouchableOpacity
                  style={answer === "C" ? styles.answerBoxSelected : styles.answerBox}
                  onPress={() => setAnswer("C")}
                >
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>C</Text>
                  </View>
                  <Text>{question ? question[count].c : ""}</Text>
                </TouchableOpacity>
              ) : null}
              {question && question[count].d ? (
                <TouchableOpacity
                  style={answer === "D" ? styles.answerBoxSelected : styles.answerBox}
                  onPress={() => setAnswer("D")}
                >
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>D</Text>
                  </View>
                  <Text>{question ? question[count].d : ""}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : (
            <View style={styles.answerView}>
              {question && question[count].a ? (
                <TouchableOpacity
                  disabled={true}
                  style={
                    answer === "A"
                      ? answer === question[count].answer
                        ? styles.answerBoxSelected
                        : styles.answerBoxWrong
                      : question
                      ? question[count].answer === "A"
                        ? styles.answerBoxSelected
                        : styles.answerBox
                      : styles.answerBox
                  }
                  onPress={() => setAnswer("A")}
                >
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>A</Text>
                  </View>
                  <Text>{question ? question[count].a : ""}</Text>
                </TouchableOpacity>
              ) : null}
              {question && question[count].b ? (
                <TouchableOpacity
                  disabled={true}
                  style={
                    answer === "B"
                      ? answer === question[count].answer
                        ? styles.answerBoxSelected
                        : styles.answerBoxWrong
                      : question
                      ? question[count].answer === "B"
                        ? styles.answerBoxSelected
                        : styles.answerBox
                      : styles.answerBox
                  }
                  onPress={() => setAnswer("B")}
                >
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>B</Text>
                  </View>
                  <Text>{question ? question[count].b : ""}</Text>
                </TouchableOpacity>
              ) : null}
              {question && question[count].c ? (
                <TouchableOpacity
                  disabled={true}
                  style={
                    answer === "C"
                      ? answer === question[count].answer
                        ? styles.answerBoxSelected
                        : styles.answerBoxWrong
                      : question
                      ? question[count].answer === "C"
                        ? styles.answerBoxSelected
                        : styles.answerBox
                      : styles.answerBox
                  }
                  onPress={() => setAnswer("C")}
                >
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>C</Text>
                  </View>
                  <Text>{question ? question[count].c : ""}</Text>
                </TouchableOpacity>
              ) : null}
              {question && question[count].d ? (
                <TouchableOpacity
                  disabled={true}
                  style={
                    answer === "D"
                      ? answer === question[count].answer
                        ? styles.answerBoxSelected
                        : styles.answerBoxWrong
                      : question
                      ? question[count].answer === "D"
                        ? styles.answerBoxSelected
                        : styles.answerBox
                      : styles.answerBox
                  }
                  onPress={() => setAnswer("D")}
                >
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>D</Text>
                  </View>
                  <Text>{question ? question[count].d : ""}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          )
        ) : null}
        {!timeTrial ? (
          !isNext ? (
            <View style={styles.answerView}>
              {question && question[count].a ? (
                <TouchableOpacity
                  style={answer === "A" ? styles.answerBoxSelected : styles.answerBox}
                  onPress={() => setAnswer("A")}
                >
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>A</Text>
                  </View>
                  <Text>{question ? question[count].a : ""}</Text>
                </TouchableOpacity>
              ) : null}
              {question && question[count].b ? (
                <TouchableOpacity
                  style={answer === "B" ? styles.answerBoxSelected : styles.answerBox}
                  onPress={() => setAnswer("B")}
                >
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>B</Text>
                  </View>
                  <Text>{question ? question[count].b : ""}</Text>
                </TouchableOpacity>
              ) : null}
              {question && question[count].c ? (
                <TouchableOpacity
                  style={answer === "C" ? styles.answerBoxSelected : styles.answerBox}
                  onPress={() => setAnswer("C")}
                >
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>C</Text>
                  </View>
                  <Text>{question ? question[count].c : ""}</Text>
                </TouchableOpacity>
              ) : null}
              {question && question[count].d ? (
                <TouchableOpacity
                  style={answer === "D" ? styles.answerBoxSelected : styles.answerBox}
                  onPress={() => setAnswer("D")}
                >
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>D</Text>
                  </View>
                  <Text>{question ? question[count].d : ""}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : (
            <View style={styles.answerView}>
              {question && question[count].a ? (
                <TouchableOpacity
                  disabled={true}
                  style={
                    answer === "A"
                      ? answer === question[count].answer
                        ? styles.answerBoxSelected
                        : styles.answerBoxWrong
                      : question
                      ? question[count].answer === "A"
                        ? styles.answerBoxSelected
                        : styles.answerBox
                      : styles.answerBox
                  }
                  onPress={() => setAnswer("A")}
                >
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>A</Text>
                  </View>
                  <Text>{question ? question[count].a : ""}</Text>
                </TouchableOpacity>
              ) : null}
              {question && question[count].b ? (
                <TouchableOpacity
                  disabled={true}
                  style={
                    answer === "B"
                      ? answer === question[count].answer
                        ? styles.answerBoxSelected
                        : styles.answerBoxWrong
                      : question
                      ? question[count].answer === "B"
                        ? styles.answerBoxSelected
                        : styles.answerBox
                      : styles.answerBox
                  }
                  onPress={() => setAnswer("B")}
                >
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>B</Text>
                  </View>
                  <Text>{question ? question[count].b : ""}</Text>
                </TouchableOpacity>
              ) : null}
              {question && question[count].c ? (
                <TouchableOpacity
                  disabled={true}
                  style={
                    answer === "C"
                      ? answer === question[count].answer
                        ? styles.answerBoxSelected
                        : styles.answerBoxWrong
                      : question
                      ? question[count].answer === "C"
                        ? styles.answerBoxSelected
                        : styles.answerBox
                      : styles.answerBox
                  }
                  onPress={() => setAnswer("C")}
                >
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>C</Text>
                  </View>
                  <Text>{question ? question[count].c : ""}</Text>
                </TouchableOpacity>
              ) : null}
              {question && question[count].d ? (
                <TouchableOpacity
                  disabled={true}
                  style={
                    answer === "D"
                      ? answer === question[count].answer
                        ? styles.answerBoxSelected
                        : styles.answerBoxWrong
                      : question
                      ? question[count].answer === "D"
                        ? styles.answerBoxSelected
                        : styles.answerBox
                      : styles.answerBox
                  }
                  onPress={() => setAnswer("D")}
                >
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>D</Text>
                  </View>
                  <Text>{question ? question[count].d : ""}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          )
        ) : null}
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 200,
    marginTop: 20,
    padding: 15,
    borderRadius: 50,
    borderColor: "#4FB767",
    borderWidth: 1,
  },
  buttonText: {
    color: "#4FB767",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4FB767",
    margin: 20,
    textAlign: "center",
  },
  countdown: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  questionBox: {
    color: "#199A8E",
    width: 300,
    height: 250,
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
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 1,
    alignItems: "flex-start",
  },
  questionHeader: {
    fontSize: 13,
    color: "#4FB767",
    marginBottom: 10,
  },
  questionText: {
    textAlign: "justify",
    fontSize: 16,
    color: "black",
  },
  answerView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  answerBox: {
    color: "#199A8E",
    width: 350,
    height: 100,
    backgroundColor: "white",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#C0C0C0",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    elevation: 1,
    alignItems: "center",
    padding: 20,
    margin: 10,
    paddingLeft: 70,
  },
  answerBoxSelected: {
    color: "#199A8E",
    width: 350,
    height: 100,
    backgroundColor: "#4FB767",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#C0C0C0",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    elevation: 1,
    alignItems: "center",
    padding: 20,
    margin: 10,
    paddingLeft: 70,
  },
  answerBoxWrong: {
    color: "#199A8E",
    width: 350,
    height: 100,
    backgroundColor: "#E96767",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#C0C0C0",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    elevation: 1,
    alignItems: "center",
    padding: 20,
    margin: 10,
    paddingLeft: 70,
  },
  circle: {
    height: 40,
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 1000,
    marginRight: 10,
    marginLeft: -50,
  },
  circleText: {
    color: "white",
  },
});

export default QuizScreen;
