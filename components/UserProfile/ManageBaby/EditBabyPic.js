import React, { useContext, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import images from '../../../constants/images';
import { CameraIcon } from "react-native-heroicons/solid";
import { AuthContext } from '../../../Context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import UpdateProfileAPI from '../../../Api/UpdateProfileAPI';
import { ManageBabyContext } from '../../../screens/UserProfile/ManageBaby';


export default function EditBabyPic() {
    const { updateKeys } = useContext(AuthContext);
    const { babyToBeEdited, setBabyToBeEdited, loading, setLoading } = useContext(ManageBabyContext);

    const uploadImage = (image) => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'CuddleCare');
        data.append("cloud_name", "cuddlecare");

        fetch("https://api.cloudinary.com/v1_1/cuddlecare/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).
            then(async (data) => {
                console.log(data);
                const uri = data.secure_url;
                await updateKeys();
                const updateBaby = await UpdateProfileAPI().uploadBabyPic(babyToBeEdited.babyID, uri);
                if (updateBaby) {
                    setBabyToBeEdited(updateBaby);
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: 'Baby Picture Updated',
                        visibilityTime: 2000,
                        autoHide: true,
                        bottomOffset: 40,
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: 'Baby Picture Not Updated',
                        visibilityTime: 2000,
                        autoHide: true,
                        bottomOffset: 40,
                    });
                }
                setLoading(false);
            }
            ).catch(err => {
                console.log(err);
                setLoading(false);
            }
            )
    }

    const launchGallery = async () => {
        setLoading(true);
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



    return (
        <View className={"items-center w-md"}>
            <Image
                source={babyToBeEdited && babyToBeEdited.babyPicture ? { uri: babyToBeEdited.babyPicture } : images.AddImage}
                className={"w-32 h-32 rounded-full"}
            />
            <TouchableOpacity onPress={() => launchGallery()} className={"absolute top-24 left-52"}>
                <CameraIcon
                    size={30}
                    style={{
                        color: "#477276",
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}