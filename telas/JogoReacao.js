import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const JogoReacao = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [ledColor, setLedColor] = useState('red');
  const [reactionTime, setReactionTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const timerRef = useRef(null);

  const startGame = () => {
    setGameStarted(true);
    setReactionTime(null);
    setLedColor('red');
    setCountdown(3);
    let counter = 3;

    const countdownInterval = setInterval(() => {
      counter -= 1;
      setCountdown(counter);
      if (counter === 0) {
        clearInterval(countdownInterval);
        setCountdown(null);
        triggerReaction();
      }
    }, 1000);
  };

  const triggerReaction = () => {
    const randomDelay = Math.floor(Math.random() * 3000) + 500;

    timerRef.current = setTimeout(() => {
      setLedColor('green');
      setStartTime(new Date().getTime());
    }, randomDelay);
  };

  const handlePress = () => {
    if (ledColor === 'green') {
      const reactionTime = new Date().getTime() - startTime;
      setReactionTime(reactionTime);
      setLedColor('red');
      setGameStarted(false);
      clearTimeout(timerRef.current);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo de Reação</Text>
      <View style={styles.ledContainer}>
        <View style={[styles.led, { backgroundColor: ledColor }]} />
      </View>
      {reactionTime !== null ? (
        <Text style={styles.reactionText}>Seu tempo de reação: {reactionTime} ms</Text>
      ) : (
        gameStarted && countdown !== null && (
          <Text style={styles.countdownText}>Começando em... {countdown}</Text>
        )
      )}
      <TouchableOpacity style={styles.button} onPress={gameStarted ? handlePress : startGame}>
        <Text style={styles.buttonText}>{gameStarted ? 'Pressione ao ficar verde!' : 'Iniciar Jogo de Reação'}</Text>
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
    marginBottom: 20,
  },
  led: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  reactionText: {
    fontSize: 18,
    color: 'green',
    marginBottom: 20,
  },
  countdownText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
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

export default JogoReacao;
