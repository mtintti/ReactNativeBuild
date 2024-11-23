import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

export default function App() {
  const [item, setItem] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (item.trim()) {
      setItems([...items, { id: Date.now().toString(), name: item, done: false }]);
      setItem('');
    }
  };

  const toggleItemDone = (id) => {
    setItems(
      items.map((el) =>
        el.id === id ? { ...el, done: !el.done } : el
      )
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter((el) => el.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Makea Ostoslista</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Lisää uusi tuote"
          value={item}
          onChangeText={setItem}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={[
                styles.itemText,
                item.done && styles.itemDone,
              ]}
              onPress={() => toggleItemDone(item.id)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteItem(item.id)}
            >
              <Text style={styles.deleteButtonText}>Poista</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#aaa',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  itemDone: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
});
