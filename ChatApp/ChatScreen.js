import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import io from 'socket.io-client';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// Conexão com o servidor Socket.IO
const socket = io('http://192.168.1.106:3000');

// Gera um identificador único para o dispositivo
const userId = uuidv4();

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Efeito para se conectar ao servidor e receber mensagens
  useEffect(() => {
    // Recebe novas mensagens e as adiciona ao estado
    socket.on('receiveMessage', (msg) => {
      //console.log('Mensagem recebida:', msg); // Debug: Verifique a mensagem recebida
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Desconecta o socket quando o componente é desmontado
    return () => {
      socket.off('receiveMessage');
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      const timestamp = new Date();
      const timeString = `${timestamp.getHours()}:${timestamp.getMinutes().toString().padStart(2, '0')}`;
      const messageWithMetadata = { text: message, time: timeString, userId };
      
      // console.log('Enviando mensagem:', messageWithMetadata); // Debug: Verifique a mensagem enviada
      socket.emit('sendMessage', messageWithMetadata);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.userId === userId ? styles.messageBubbleRight : styles.messageBubbleLeft,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.messageTime}>{item.time}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          onTouchStart={Keyboard.dismiss} // Oculta o teclado ao tocar na lista
        />
      </TouchableWithoutFeedback>

      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Digite sua mensagem"
          style={styles.input}
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  messagesContainer: {
    paddingVertical: 10,
    paddingBottom: 80, // Deixa espaço para o input quando o teclado aparece
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    
  },
  messageBubbleLeft: {
    backgroundColor: '#d1e7ff',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  messageBubbleRight: {
    backgroundColor: '#e1ffc7',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 25,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#0078ff',
    padding: 10,
    borderRadius: 25,
    marginLeft: 5,
  },
});

export default ChatScreen;
