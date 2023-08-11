import React from 'react';
import {useState} from "react";
import {View,TextInput,Button,Modal} from "react-native";
import {TouchableOpacity} from "react-native";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {green50} from "react-native-paper/src/styles/themes/v2/colors";
import Input from "../../components/Growth/Input";
import {themeColors} from "../../theme";

const Comment = ({onAddComment,onCloseCommentInput}) => {
    const [newComment, setNewComment] = React.useState('');

    const handleAddComment = () => {
               if(newComment.trim() !== ''){
            onAddComment(newComment);
            setNewComment('');

        }
    }

    return (

            <View style={{backgroundColor:themeColors.bgWhite(),borderRadius:10}}>
                {/*<TextInput backgroundColor={"#94CCD2"}*/}
                {/*    placeholder="Add a comment..."*/}
                {/*    onChangeText={text => setNewComment(text)}*/}
                {/*    value={newComment}*/}
                {/*           */}
                {/*/>*/}
                <Input
                    multiline={true}
                    placeholder="Add a comment..."
                    onChangeText={text => setNewComment(text)}
                    value={newComment}

                />
                <TouchableOpacity onPress={handleAddComment}>
                    <FontAwesomeIcon className={""} icon={faPaperPlane} size={20} color={"#7AABAF"}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onCloseCommentInput}>

                </TouchableOpacity>

            </View>



    );

}


export default Comment;

