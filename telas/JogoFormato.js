import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const FORMATS = [
  { shape: 'Círculo', type: 'circle' },
  { shape: 'Quadrado', type: 'square' },
  { shape: 'Triângulo', type: 'triangle' },
  { shape: 'Losango', type: 'diamond' },
];

const JogoFormato = () => {
  const [currentFormat, setCurrentFormat] = useState({});
  const [options, setOptions] = useState([]);

  const startFormatGame = () => {
    const newFormat = getRandomFormat();
    setCurrentFormat(newFormat);
    setOptions(generateOptions(newFormat));
  };

  const getRandomFormat = () => {
    return FORMATS[Math.floor(Math.random() * FORMATS.length)];
  };

  const generateOptions = (correctFormat) => {
    const shuffled = [...FORMATS].sort(() => 0.5 - Math.random());
    
    const correctOptionIndex = Math.floor(Math.random() * 4);
    shuffled[correctOptionIndex] = correctFormat;

    return shuffled.slice(0, 4);
  };

  const checkAnswer = (option) => {
    if (option.shape === currentFormat.shape) {
      Alert.alert('Parabéns!', 'Você acertou!');
      startFormatGame();
    } else {
      Alert.alert('Erro!', 'Tente novamente.');
    }
  };

  const renderShape = (type) => {
    switch (type) {
      case 'circle':
        return <View style={styles.circle} />;
      case 'square':
        return <View style={styles.square} />;
      case 'triangle':
        return (
          <View style={styles.triangle} />
        );
      case 'diamond':
        return (
          <View style={styles.diamond} />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo de Formatos</Text>
      <Text style={styles.instructions}>
        Escolha a forma que corresponde à forma exibida!
      </Text>
      <View style={styles.shapeContainer}>
        {renderShape(currentFormat.type)}
      </View>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => checkAnswer(option)}
          >
            <Text style={styles.optionText}>{option.shape}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.startButton} onPress={startFormatGame}>
        <Text style={styles.buttonText}>Iniciar Jogo de Formatos</Text>
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
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  shapeContainer: {
    marginBottom: 20,
    padding: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'red',
    alignSelf: 'center',
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderColor: 'transparent',
    borderBottomColor: 'green',
    alignSelf: 'center',
  },
  diamond: {
    width: 100,
    height: 100,
    backgroundColor: 'orange',
    transform: [{ rotate: '45deg' }],
    alignSelf: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000', // Adicione uma borda para visualização
  },
  optionText: {
    color: '#000', // Texto em preto
    textAlign: 'center',
    fontSize: 16,
  },
  startButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default JogoFormato;