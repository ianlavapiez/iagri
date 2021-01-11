import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CountDown from "react-native-countdown-component";
import randomWords from "random-words";
import { category } from "../data/category";

const QuizScreen = ({ navigation }) => {
  const quizName = navigation.state.params.name;
  const quiz = navigation.state.params.quiz;

  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [count, setCount] = useState(0);
  const [timerVisible, setTimerVisible] = useState(false);

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

  useEffect(() => {}, [count]);

  const checkAnswer = () => {
    const words = randomWords({ exactly: 15, join: " " });

    if (answer === question[count].answer) {
      setScore(score + 1);

      alert("Your answer is correct! The meaning of the answer is " + words + ".");
    } else {
      alert(
        "Your answer is wrong! The correct answer is " +
          question[count].answer.toUpperCase() +
          ". The meaning of the answer is " +
          words +
          "."
      );
    }

    setTimerVisible(false);
  };

  const nextQuestion = () => {
    if (question.length > count + 1) {
      setCount(count + 1);
      setTimerVisible(true);
      return setAnswer("");
    }

    return navigation.navigate("Score", { score: score + " / " + totalScore });
  };

  const runCountDown = () => {
    return <CountDown until={5} timeToShow={["S"]} onFinish={() => checkAnswer()} size={20} />;
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

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{quizName}</Text>
        <View style={styles.questionBox}>
          <Text style={styles.questionHeader}>Question #{count + 1}</Text>
          <Text style={styles.questionText}>{question ? question[count].question : ""}</Text>
        </View>
        {timerVisible ? <View style={styles.countdown}>{runCountDown()}</View> : null}
        {!timerVisible ? <View style={styles.countdown}>{showResult()}</View> : null}
        {timerVisible ? (
          <View style={styles.answerView}>
            {question && question[count].a ? (
              <TouchableOpacity
                style={answer === "a" ? styles.answerBoxSelected : styles.answerBox}
                onPress={() => setAnswer("a")}
              >
                <View style={styles.circle}>
                  <Text style={styles.circleText}>A</Text>
                </View>
                <Text>{question ? question[count].a : ""}</Text>
              </TouchableOpacity>
            ) : null}
            {question && question[count].b ? (
              <TouchableOpacity
                style={answer === "b" ? styles.answerBoxSelected : styles.answerBox}
                onPress={() => setAnswer("b")}
              >
                <View style={styles.circle}>
                  <Text style={styles.circleText}>B</Text>
                </View>
                <Text>{question ? question[count].b : ""}</Text>
              </TouchableOpacity>
            ) : null}
            {question && question[count].c ? (
              <TouchableOpacity
                style={answer === "c" ? styles.answerBoxSelected : styles.answerBox}
                onPress={() => setAnswer("c")}
              >
                <View style={styles.circle}>
                  <Text style={styles.circleText}>C</Text>
                </View>
                <Text>{question ? question[count].c : ""}</Text>
              </TouchableOpacity>
            ) : null}
            {question && question[count].d ? (
              <TouchableOpacity
                style={answer === "d" ? styles.answerBoxSelected : styles.answerBox}
                onPress={() => setAnswer("d")}
              >
                <View style={styles.circle}>
                  <Text style={styles.circleText}>D</Text>
                </View>
                <Text>{question ? question[count].d : ""}</Text>
              </TouchableOpacity>
            ) : null}
            {question && question[count].e ? (
              <TouchableOpacity
                style={answer === "e" ? styles.answerBoxSelected : styles.answerBox}
                onPress={() => setAnswer("e")}
              >
                <View style={styles.circle}>
                  <Text style={styles.circleText}>E</Text>
                </View>
                <Text>{question ? question[count].e : ""}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : (
          <View style={styles.answerView}>
            {question && question[count].a ? (
              <TouchableOpacity
                disabled={true}
                style={
                  answer === "a"
                    ? answer === question[count].answer
                      ? styles.answerBoxSelected
                      : styles.answerBoxWrong
                    : question
                    ? question[count].answer === "a"
                      ? styles.answerBoxSelected
                      : styles.answerBox
                    : styles.answerBox
                }
                onPress={() => setAnswer("a")}
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
                  answer === "b"
                    ? answer === question[count].answer
                      ? styles.answerBoxSelected
                      : styles.answerBoxWrong
                    : question
                    ? question[count].answer === "b"
                      ? styles.answerBoxSelected
                      : styles.answerBox
                    : styles.answerBox
                }
                onPress={() => setAnswer("b")}
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
                  answer === "c"
                    ? answer === question[count].answer
                      ? styles.answerBoxSelected
                      : styles.answerBoxWrong
                    : question
                    ? question[count].answer === "c"
                      ? styles.answerBoxSelected
                      : styles.answerBox
                    : styles.answerBox
                }
                onPress={() => setAnswer("c")}
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
                  answer === "d"
                    ? answer === question[count].answer
                      ? styles.answerBoxSelected
                      : styles.answerBoxWrong
                    : question
                    ? question[count].answer === "d"
                      ? styles.answerBoxSelected
                      : styles.answerBox
                    : styles.answerBox
                }
                onPress={() => setAnswer("d")}
              >
                <View style={styles.circle}>
                  <Text style={styles.circleText}>D</Text>
                </View>
                <Text>{question ? question[count].d : ""}</Text>
              </TouchableOpacity>
            ) : null}
            {question && question[count].e ? (
              <TouchableOpacity
                disabled={true}
                style={
                  answer === "e"
                    ? answer === question[count].answer
                      ? styles.answerBoxSelected
                      : styles.answerBoxWrong
                    : question
                    ? question[count].answer === "e"
                      ? styles.answerBoxSelected
                      : styles.answerBox
                    : styles.answerBox
                }
                onPress={() => setAnswer("e")}
              >
                <View style={styles.circle}>
                  <Text style={styles.circleText}>E</Text>
                </View>
                <Text>{question ? question[count].e : ""}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
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
    fontSize: 12,
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
