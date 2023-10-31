import {SafeAreaView} from "react-native-safe-area-context";
import {View, Text, Modal, TextInput, Pressable, Alert} from "react-native";
import {useRoute} from "@react-navigation/core";
import FilledButton from "../components/filledButton";
import React, {useState} from "react";
import ToDoHeader from "../components/toDoHeader";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment/moment";

export function AddTaskScreen(){
    const route = useRoute();
    const date = route.params?.date || {};
    const [modalVisible, setModalVisible] = useState(false);
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);

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

    return(
        <SafeAreaView>
            <ToDoHeader screen={"ToDoList"}/>
            <View>
                <Text>Add Task Screen</Text>
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
                                <FilledButton title="Add Task" icon="plus" />
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