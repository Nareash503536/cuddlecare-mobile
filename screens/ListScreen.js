import {SafeAreaView} from "react-native-safe-area-context";
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from "react-native";
import ToDoHeader from "../components/toDoHeader";
import {BASE_URL} from "../config";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {AuthContext} from "../Context/AuthContext";

export function ListScreen(){
    const { updateKeys } = React.useContext(AuthContext);
    const [toDos, setToDos] = useState([]);
    const date = new Date();
    const currentDate = date.toISOString().slice(0, 10);
    const parsedDate = new Date(currentDate);
    const formattedDate = parsedDate.toISOString();

    useEffect(() => {
        getAllTasks();
    }, []);

    const handleToggleCompleted = (id) => {
        setToDos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.toDoID === id ? { ...todo, status: todo.status === 'Completed' ? 'NotCompleted' : 'Completed' } : todo
            )
        );
    };

    const getAllTasks = async () => {
        const apiURL = BASE_URL + "/api/todolist/getAll/" + formattedDate;
        try {
            await updateKeys();
            const response = await axios.get(apiURL, null);
            const result = response.data;
            console.log(result);
            setToDos(result);
        } catch (e) {
            console.log(e);
        }
    }

    const convertTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(':');
        const formattedTime = `${hours}:${minutes} ${parseInt(hours, 10) >= 12 ? 'PM' : 'AM'}`;
        return formattedTime;
    }

    return(
        <SafeAreaView>
            <ToDoHeader screen={"Baby"}/>
            <View className={"mb-4"}>
                <Text className={"text-center font-bold text-2xl"}>Task List {currentDate}</Text>
                <Text className={"text-center"}>Click on the task to mark as completed</Text>
            </View>
            <FlatList
                data={toDos}
                keyExtractor={(item) => item.toDoID}
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <TouchableOpacity onPress={() => handleToggleCompleted(item.toDoID)}>
                            <View className={"p-1 px-4 border-2 rounded-xl mx-4"} style={item.status === 'Completed' ? styles.completedTask : styles.task}>
                                <View className={"flex flex-row justify-between"} style={item.status === 'Completed' ? styles.completedTask : styles.task}>
                                    <Text style={item.status === 'Completed' ? styles.completedTask : styles.task}>
                                        {item.task}
                                    </Text>
                                    <Text style={item.status === 'Completed' ? styles.completedTask : styles.task}>At {convertTime(item.time)}</Text>
                                </View>
                                <Text style={item.status === 'Completed' ? styles.completedTask : styles.task}>Description : {item.taskDescription}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    todoItem: {
        marginBottom: 12,
    },
    task: {
        fontSize: 18,
        color: 'grey',
        borderColor: 'grey',
    },
    completedTask: {
        fontSize: 18,
        color: 'green',
        borderColor: 'green',
    },
});