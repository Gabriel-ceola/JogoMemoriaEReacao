import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const NUM_LEDS = 5;
const INITIAL_DELAY = 1500;

const JogoMemoria = () => {
  const [leds, setLeds] = useState(Array(NUM_LEDS).fill('red'));
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [gameRunning, setGameRunning] = useState(false);
  const [allowUserInput, setAllowUserInput] = useState(false);
  const [delay, setDelay] = useState(INITIAL_DELAY);

  const startMemoryGame = () => {
    setGameRunning(true);
    setAllowUserInput(false);
    const newSequence = generateSequence();
    setSequence(newSequence);
    setUserSequence([]);
    playSequence(newSequence);
  };

  const generateSequence = () => {
    let newSequence = [];
    for (let i = 0; i < NUM_LEDS; i++) {
      newSequence.push(Math.floor(Math.random() * NUM_LEDS));
    }
    return newSequence;
  };

  const playSequence = async (sequence) => {
    for (let i = 0; i < sequence.length; i++) {
      await flashLed(sequence[i]);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    setTimeout(() => {
      setAllowUserInput(true);
    }, delay);
  };

  const flashLed = (index) => {
    return new Promise((resolve) => {
      setLeds((prevLeds) => {
        let newLeds = [...prevLeds];
        newLeds[index] = 'red';
        return newLeds;
      });

      setTimeout(() => {
        setLeds((prevLeds) => {
          let newLeds = [...prevLeds];
          newLeds[index] = 'green';
          return newLeds;
        });

        setTimeout(() => {
          setLeds((prevLeds) => {
            let newLeds = [...prevLeds];
            newLeds[index] = 'red';
            return newLeds;
          });
          resolve();
        }, 800);
      }, 200);
    });
  };

  const checkUserSequence = (index) => {
    if (!allowUserInput) return;

    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
      Alert.alert('Erro!', 'Você errou a sequência.');
      setGameRunning(false);
      setAllowUserInput(false);
      return;
    }

    if (newUserSequence.length === sequence.length) {
      Alert.alert('Parabéns!', 'Você acertou a sequência!');
      setAllowUserInput(false);
      setTimeout(() => {
        setDelay(delay * 0.9);
        startMemoryGame();
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Memória</Text>
      <View style={styles.ledContainer}>
        {leds.map((color, index) => (
          <TouchableOpacity key={index} onPress={() => checkUserSequence(index)}>
            <View style={[styles.led, { backgroundColor: color }]} />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={startMemoryGame}>
        <Text style={styles.buttonText}>Iniciar Jogo da Memória</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ledContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  led: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default JogoMemoria;
