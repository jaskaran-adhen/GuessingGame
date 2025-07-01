import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

  const [numberToGuess, setNumberToGuess] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = () => {
    const numericGuess = parseInt(guess);
    if (isNaN(numericGuess)) {
      Alert.alert('Invalid input', 'Please enter a number between 1 and 100.');
      return;
    }

    setAttempts(prev => prev + 1);

    if (numericGuess > numberToGuess) {
      setMessage('Too High!');
    } else if (numericGuess < numberToGuess) {
      setMessage('Too Low!');
    } else {
      setMessage('🎉 Correct!');
      setGameOver(true);
    }

    setGuess('');
  };

  const resetGame = () => {
    setNumberToGuess(generateRandomNumber());
    setAttempts(0);
    setGuess('');
    setMessage('');
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Guess the Number (1 - 100)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={guess}
        onChangeText={setGuess}
        placeholder="Enter your guess"
        editable={!gameOver}
      />
      <Button title="Submit Guess" onPress={handleGuess} disabled={gameOver} />
      <Text style={styles.message}>{message}</Text>
      <Text>Attempts: {attempts}</Text>

      {gameOver && (
        <Text style={styles.reveal}>✅ The correct number was: {numberToGuess}</Text>
      )}

      <Button title="Restart Game" onPress={resetGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#888',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  message: {
    fontSize: 20,
    marginVertical: 10,
  },
  reveal: {
    marginTop: 10,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
});
