import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JogoReacao = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo de Reação (em desenvolvimento)</Text>
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
});

export default JogoReacao;
