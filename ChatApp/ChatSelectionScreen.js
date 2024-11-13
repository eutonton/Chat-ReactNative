// ChatSelectionScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const chats = [
  { id: '1', name: 'Chat Família' },
  { id: '2', name: 'Amigos' },
  { id: '3', name: 'Trabalho' },
  { id: '4', name: 'Estudos' },
  // Adicione mais chats conforme necessário
];

const ChatSelectionScreen = ({ navigation }) => {
  const handleJoinChat = (chatName) => {
    // Navega para a tela de chat com o nome do chat selecionado
    navigation.navigate('ChatScreen', { chatName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha o Chat</Text>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => handleJoinChat(item.name)}
          >
            <Text style={styles.chatButtonText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.chatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  chatList: {
    paddingHorizontal: 10,
  },
  chatButton: {
    backgroundColor: '#0078ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ChatSelectionScreen;
