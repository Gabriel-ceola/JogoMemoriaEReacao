import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const sequencias = [
  { sequence: [2, 4, 6, 8], missingNumber: 8 },
  { sequence: [5, 10, 15, 20], missingNumber: 20 },
  { sequence: [1, 3, 5, 7], missingNumber: 7 },
  { sequence: [10, 20, 30, 40], missingNumber: 40 },
];

const JogoSequenciaLogica = () => {
  const [currentSequence, setCurrentSequence] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [message, setMessage] = useState('');

  const generateSequence = () => {
    const randomSequence = sequencias[Math.floor(Math.random() * sequencias.length)];
    setCurrentSequence(randomSequence);
    setUserAnswer('');
    setMessage('');
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) {
      setMessage('Por favor, insira um número.');
      return;
    }

    if (parseInt(userAnswer) === currentSequence.missingNumber) {
      setMessage('Correto! Parabéns!');
    } else {
      setMessage(`Errado! A sequência correta é: ${currentSequence.sequence} e o número faltante é: ${currentSequence.missingNumber}`);
    }

    setUserAnswer('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sequência Lógica</Text>
      <TouchableOpacity style={styles.button} onPress={generateSequence}>
        <Text style={styles.buttonText}>Gerar Sequência</Text>
      </TouchableOpacity>

      {currentSequence && (
        <Text style={styles.sequence}>
          {currentSequence.sequence.slice(0, -1).join(', ')} , __
        </Text>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={userAnswer}
          onChangeText={setUserAnswer}
          placeholder="Digite o número faltante"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar Resposta</Text>
      </TouchableOpacity>

      {message && <Text style={styles.feedback}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sequence: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: 180,
    textAlign: 'center',
  },
  feedback: {
    fontSize: 18,
    marginTop: 20,
    color: 'green',
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginVertical: 10,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default JogoSequenciaLogica;
