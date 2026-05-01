import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Text style={{ color: '#fff' }}>點擊設定頭像</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.userName}>我的名字</Text>
      <Text style={styles.hint}>點擊上方圓圈更換大頭照</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  avatarContainer: { marginBottom: 20 },
  avatar: { width: 150, height: 150, borderRadius: 75 },
  placeholder: { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
  userName: { fontSize: 24, fontWeight: 'bold' },
  hint: { color: '#999', marginTop: 10 }
});