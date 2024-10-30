import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const addTask = () => {
    if (!taskInput.trim()) {
      Alert.alert("Error", "Please enter a task.");
      return;
    }

    const newTask = {
      id: Math.random().toString(),
      title: taskInput,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setTaskInput('');
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TASKIFY</Text>
      </View>
      <View style={styles.taskEntryBlock}>
        <Text style={styles.label}>ADD TASK</Text>
        <TextInput
          style={styles.inputBox}
          value={taskInput}
          onChangeText={setTaskInput}
          placeholder="Enter your task"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6", // Light gray background
  },
  header: {
    backgroundColor: "#3B82F6", // Blue background
    paddingVertical: 50, // Reduced vertical padding
    elevation: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    marginBottom: 20, // Added margin to bring it lower
  },
  headerText: {
    color: "white",
    fontSize: 28, // Slightly reduced font size
    fontWeight: 'bold',
    textAlign: "center",
  },
  label: {
    fontSize: 20,
    marginTop: 10,
    color: "#1F2937", // Dark gray for the label
  },
  inputBox: {
    borderColor: "#9CA3AF", // Gray border
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 10,
    width: '80%',
  },
  taskEntryBlock: {
    padding: 20,
    margin: 20,
    backgroundColor: '#E5E7EB', // Lighter gray for task entry
    borderRadius: 20,
    elevation: 5,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: "#3B82F6", // Blue background for button
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#FFFFFF', // White for task items
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB', // Light gray for border
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    flex: 1,
    color: "#1F2937", // Dark gray for title
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default App;
