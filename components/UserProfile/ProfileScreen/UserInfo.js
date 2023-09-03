import React, { useContext } from 'react';
import { Image, SafeAreaView, Touchable } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import images from '../../../constants/images';
import { COLORS } from "../../../constants/theme";
import { AuthContext } from '../../../Context/AuthContext';
import EditProfileCard from "./EditProfileCard";
import * as ImagePicker from 'expo-image-picker';
// import { launchImageLibrary } from 'react-native-image-picker';
// import * as ImagePicker from 'react-native-image-picker';
import { ProfileContext } from '../../../screens/UserProfile/Profile';
import UpdateProfileAPI from '../../../Api/UpdateProfileAPI';
import { BASE_URL } from '../../../config';
import Toast from 'react-native-toast-message';


export default function UserInfo() {

    const { user, setUser, updateKeys } = useContext(AuthContext);

    const uploadImage = (image) => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'CuddleCare');
        data.append("cloud_name", "cuddlecare");


        fetch("https://api.cloudinary.com/v1_1/cuddlecare/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).
            then(async(data) => {
                console.log(data);
                const uri = data.secure_url;
                await updateKeys();
                const updateUser = await UpdateProfileAPI().uploadProfilePic(user.email, uri);
                if (updateUser) {
                    setUser(updateUser);
                    Toast.show({
                        type: 'success',
                        position: 'bottom',
                        text1: 'Profile Picture Updated',
                        visibilityTime: 2000,
                        autoHide: true,
                        bottomOffset: 40,
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        position: 'bottom',
                        text1: 'Profile Picture Not Updated',
                        visibilityTime: 2000,
                        autoHide: true,
                        bottomOffset: 40,
                    });
                }
                return true;
            }
            ).catch(err => {
                console.log(err);
            }
            )
    }


    const launchGallery = async () => {

        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            selectionLimit: 1,
            base64: true,
        });

        if (!result.canceled) {
            let newFile = {
                uri: result.assets[0].uri,
                type: `test/${result.assets[0].uri.split(".")[1]}`,
                name: `test.${result.assets[0].uri.split(".")[1]}`,
            }
            uploadImage(newFile);
        } else {
            alert('You did not select any image.');
        }
    }
    console.log(user);

    return (
        <View
            style={{
                backgroundColor: "#fff",
                shadowColor: '#000',
                elevation: 20,
                borderRadius: 10,
                margin: 20,
                marginHorizontal: 40,
                // width: "90%",
                padding: 20,
                backfaceVisibility: "visible",
            }}
        >
            <View
                className={"rounded-full"}
                style={{
                    backgroundColor: COLORS.primary,
                    position: "absolute",
                    height: 100,
                    width: 100,
                    opacity: 0.3,
                    bottom: 180,
                }}
            >
            </View>
            <View
                className={"rounded-full"}
                style={{
                    backgroundColor: COLORS.primary,
                    position: "absolute",
                    height: 150,
                    width: 150,
                    opacity: 0.3,
                    left: 120,
                    top: 150
                    // top: 240
                }}
            >
            </View>

            <View
                className={"rounded-full"}
                style={{
                    backgroundColor: COLORS.primary,
                    position: "absolute",
                    height: 100,
                    width: 100,
                    opacity: 0.3,
                    bottom: 230,
                    left: 220,
                }}
            >
            </View>
            <View className={"absolute -top-24 left-11"}>
                <Image
                    source={user.profilePicture ? { uri: user.profilePicture } : images.UserImage}
                    className={"w-48 h-48 rounded-full  "}
                    style={{
                        borderWidth: 10,
                        borderColor: COLORS.primary,
                    }}
                />
                <TouchableOpacity onPress={() => launchGallery()} className={"absolute  bottom-0 right-0"}>
                    <Image
                        source={images.EditImage}
                        className={"w-12 h-12 rounded-full "}
                    />
                </TouchableOpacity>
            </View>

            <View className="mt-24">
                <Text className={"text-3xl font-bold text-center"}>{user.username}</Text>
                <Text className={"text-2xl font-normal text-center"}>{user.relationship ? user.relationship : "null"}</Text>
                <EditProfileCard />
            </View>
        </View>
    )
}