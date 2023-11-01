import {SafeAreaView} from "react-native-safe-area-context";
import {View, Text, Modal, TextInput, Pressable, Alert, TouchableOpacity, FlatList} from "react-native";
import {useRoute} from "@react-navigation/core";
import FilledButton from "../components/filledButton";
import React, {useEffect, useState} from "react";
import ToDoHeader from "../components/toDoHeader";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment/moment";
import {BASE_URL} from "../config";
import axios from "axios";
import {AuthContext} from "../Context/AuthContext";

export function AddTaskScreen(){
    const { updateKeys } = React.useContext(AuthContext);
    const route = useRoute();
    const date = route.params?.date || {};
    const parsedDate = new Date(date);
    const formattedDate = parsedDate.toISOString();

    const [modalVisible, setModalVisible] = useState(false);
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [toDos, setToDos] = useState([]);

    useEffect(() => {
        getAllTasks();
    }, []);

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

    const openModal = () => {
        setModalVisible(true);
    }
    const closeModal = () => {
        setModalVisible(false);
    }

    const showTimePicker = () => {
        setTimePickerVisible(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisible(false);
    };

    const handleTimeConfirm = (time) => {
        const selectedTime = moment(time, 'h:mm A');
        setTime(selectedTime.format('h:mm A'));
        hideTimePicker();
    };

    const convertTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(':');
        const formattedTime = `${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        return formattedTime;
    }

    const addTask = async (data) => {
        const apiURL = BASE_URL + "/api/todolist/addTask";
        try {
            await updateKeys();
            const response = await axios.post(apiURL, data);
            const result = response.data;
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    const convertTimeBack = (timeStr) => {
        const [hhmm, ampm] = timeStr.split(' ');
        const [hours, minutes] = hhmm.split(':');

        let hours24 = parseInt(hours, 10);
        if (ampm.toLowerCase() === 'pm' && hours24 < 12) {
            hours24 += 12;
        } else if (ampm.toLowerCase() === 'am' && hours24 === 12) {
            hours24 = 0;
        }

        const seconds = '00';
        const formattedTime = `${hours24.toString().padStart(2, '0')}:${minutes}:${seconds}`;
        return formattedTime;
    }

    const refreshScreen = () => {
        setToDos((prevTodos) => [...prevTodos]); // This will trigger a re-render
    };

    const save = () => {
        if (task === '' || description === '' || time === '') {
            Alert.alert('Please fill in all the fields');
        } else {
            const formattedTime = convertTimeBack(time);
            const data = {
                task: task,
                taskDescription: description,
                time: formattedTime,
                date: formattedDate,
                status: 'NotCompleted'
            }
            addTask(data).then(r => console.log(r));
            setToDos([...toDos, addTask(data)]);
            closeModal();
            refreshScreen();
        }
    }

    return(
        <SafeAreaView>
            <ToDoHeader screen={"ToDoList"}/>
            <View>
                <Text className={"text-center font-bold text-2xl"}>Task List</Text>
                <FlatList
                    data={toDos}
                    style={{height: "75%"}}
                    keyExtractor={(item) => item.toDoID}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <View className={"p-2 px-4 border rounded-xl mx-8 my-2 border-primary"}>
                                <View className={"flex flex-row justify-between"}>
                                    <Text className={"font-medium"}>{item.task}</Text>
                                    <Text className={"font-light"}>At {convertTime(item.time)}</Text>
                                </View>
                                <Text>Description : {item.taskDescription}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View className={"px-16"}>
                <FilledButton title={"Add New Task"} icon={"plus"} onPress={openModal}/>
            </View>
            <Modal animationType={"slide"} visible={modalVisible}>
                <View className={"py-48"}>
                    <Text className={"text-center font-bold text-2xl"}>Add Task</Text>
                    <View className={"p-4"}>
                        <View className={"m-1.5 mx-4"}>
                            <Text className={""}>Task Title</Text>
                        </View>
                        <View className={"border-b-2 border-primary m-2 mx-4"}>
                            <TextInput
                                placeholder="Enter Task Title"
                                value={task}
                                onChangeText={setTask}
                            />
                        </View>
                        <View className={"m-1.5 mx-4"}>
                            <Text>Time</Text>
                        </View>
                        <View className={"border-b-2 border-primary m-2 mx-4"}>
                            <Pressable onPress={showTimePicker}>
                                <TextInput
                                    value={time.toString()}
                                    placeholder="Enter Time"
                                    editable={false}
                                />
                            </Pressable>
                            <DateTimePickerModal
                                isVisible={isTimePickerVisible}
                                mode="time"
                                onConfirm={handleTimeConfirm}
                                onCancel={hideTimePicker}
                            />
                        </View>
                        <View className={"m-1.5 mx-4"}>
                            <Text>Description</Text>
                        </View>
                        <View className={"border-b-2 border-primary m-2 mx-4"}>
                            <TextInput
                                placeholder="Enter Description"
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>
                        <View className={"flex flex-row"}>
                            <View className={"w-1/2"}>
                                <FilledButton title="Add Task" icon="plus" onPress={save}/>
                            </View>
                            <View className={"w-1/2"}>
                                <FilledButton title="Cancel" icon="close" onPress={closeModal} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}