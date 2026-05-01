import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const DATA = [
  { id: '1', name: '王小明', message: '今天晚上要吃什麼？', time: '10:30 AM' },
  { id: '2', name: '陳小華', message: '老師說作業下週交喔！', time: 'Yesterday' },
  { id: '3', name: '林志玲', message: '祝你有個美好的一天！', time: 'Monday' },
  { id: '4', name: '張學友', message: '想聽我唱歌嗎？', time: 'Sunday' },
];

export default function ChatListScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => navigation.navigate('ChatRoom', { 
        name: item.name, 
        lastMessage: item.message 
      })}
    >
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.message} numberOfLines={1}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  item: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', alignItems: 'center' },
  avatarPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#0084FF', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  content: { flex: 1, marginLeft: 15 },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontSize: 16, fontWeight: 'bold' },
  time: { color: '#999', fontSize: 12 },
  message: { color: '#666', marginTop: 3 },
});