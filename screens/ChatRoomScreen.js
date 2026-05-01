import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function ChatRoomScreen({ route }) {
  // 從參數中取得列表傳過來的姓名與訊息
  const { name, lastMessage } = route.params;

  // 這裡我們只保留傳過來的那一則訊息
  const [messages, setMessages] = useState([
    { id: '1', text: lastMessage, fromMe: false },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: inputText, fromMe: true }]);
      setInputText('');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.msgBubble, item.fromMe ? styles.myMsg : styles.theirMsg]}>
            <Text style={{ color: item.fromMe ? '#fff' : '#000' }}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
      
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          value={inputText} 
          onChangeText={setInputText} 
          placeholder="輸入訊息..."
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text style={styles.sendBtn}>發送</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  msgBubble: { padding: 12, borderRadius: 20, marginHorizontal: 15, marginVertical: 5, maxWidth: '80%' },
  myMsg: { alignSelf: 'flex-end', backgroundColor: '#0084FF' },
  theirMsg: { alignSelf: 'flex-start', backgroundColor: '#f0f0f0' },
  inputContainer: { 
    flexDirection: 'row', 
    padding: 10, 
    borderTopWidth: 1, 
    borderTopColor: '#eee', 
    alignItems: 'center', 
    backgroundColor: '#fff',
    marginBottom: Platform.OS === 'ios' ? 25 : 5 
  },
  input: { flex: 1, backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 15, height: 40 },
  sendBtn: { marginLeft: 12, color: '#0084FF', fontWeight: 'bold', fontSize: 16 }
});