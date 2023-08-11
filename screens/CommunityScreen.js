import React, {useEffect, useState} from 'react'

import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, Dimensions} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {FolderPlusIcon} from "react-native-heroicons/solid";
import {themeColors} from "../theme";
import {GlobalStyles} from "../constants/styles";
import {MagnifyingGlassIcon} from "react-native-heroicons/outline";
import {SearchIcon} from "native-base";
// import {Searchbar} from "react-native-paper";
import Search_Bar from "../components/SearchBar";
import {useNavigation} from "@react-navigation/native";
import {TopBar} from "../components/TopBar";
import Input from "../components/Growth/Input";
import {ScrollView} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import {faComment} from "@fortawesome/free-solid-svg-icons/faComment";
import {faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons/faHeart";
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons/faHeart"
import {faShare} from "@fortawesome/free-solid-svg-icons/faShare";
import {faFilter} from "@fortawesome/free-solid-svg-icons/faFilter";
import CommentComponent from "../components/UI/comment";
import {CommentsListScreen} from "./CommentsListScreen";
import {BackHandler} from "react-native";
import Comment from "../components/UI/comment";


export const posts  = [
    {
        id: 1,
        profileImage: require('../assets/images/kavindu.png'),
        name: 'Kushantha',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ',
        image: require('../assets/images/baby-new1.jpg'),
        time: '1d',
        liked: false,
        likes: 5,
        commentsCount: 0,
        comments: []
        // shares: 1,
    },

    {
        id: 2,
        profileImage: require('../assets/images/baby4.png'),
        name: 'Rashmina',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ',
        image: require('../assets/images/baby-new2.jpg'),
        time: '1d',
        liked: false,
        likes: 5,
        commentsCount: 0,
        comments: [],
        // shares: 1,
    },


    {
        id: 3,
        profileImage: require('../assets/images/baby3.png'),
        name: 'Dhatchaya',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ',
        image: require('../assets/images/baby5.png'),
        time: '1d',
        liked: false,
        likes: 5,
        commentsCount: 0,
        comments: [],
        // shares: 1,
    }
,
    {
        id: 4,
        profileImage: require('../assets/images/baby4.png'),
        name: 'Rashmina',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ',
        image: require('../assets/images/baby-new3.jpg'),
        time: '1d',
        liked: false,
        likes: 5,
        commentsCount: 0,
        comments: [],


    }




];

export function CommunityScreen() {
       let navigation = useNavigation();
         const [comments, setComments] = useState(Array(posts.length).fill([]));
         const[postStates, setPostStates] = useState(Array(posts.length).fill({}));
         const[likedPosts, setLikedPosts] = useState([]);
         const commentButtonRefs = posts.map(React.createRef);
         const commentModalRefs = posts.map(React.createRef);
         const [showCommentInput ,setShowCommentInput] = useState(Array(posts.length).fill(false));





       const handleAddComment = (postIndex,comment) =>
    {
        // console.log(`Adding comment: "${comment}" to post at index ${postIndex}`);


        setComments(prevComments => {
            const newComments = [...prevComments];
            newComments[postIndex] = [...newComments[postIndex], comment];
            return newComments;

        });

        setShowCommentInput(prevState => {
            const newState = [...prevState];
            newState[postIndex] = false;
            return newState;
        })

        navigation.navigate('CommentsList', {comments: comments[postIndex]});


    }


       const handleSearch = (searchQuery) => {
                console.log(searchQuery);
       }

         const handleLike = (postIndex) => {
           setLikedPosts((prevLikedPosts) => {
                const newLikedPosts = [...prevLikedPosts];

                if (newLikedPosts.includes(postIndex)) {
                    newLikedPosts.splice(newLikedPosts.indexOf(postIndex), 1);

                }
                else {
                    newLikedPosts.push(postIndex);
                }
                return newLikedPosts;
           })

              setPostStates((prevPostStates) => {
                const newPostStates = [...prevPostStates];
                newPostStates[postIndex] = {
                    ...newPostStates[postIndex],
                    liked: !newPostStates[postIndex]?.liked,
                    likes: newPostStates[postIndex]?.liked ? (newPostStates[postIndex]?.likes || 0) - 1 : (newPostStates[postIndex]?.likes || 0) + 1,
                };
                return newPostStates;

         })
         }




    const styles = StyleSheet.create({
        postcontainer:{
            marginBottom:10,
            padding:10,
            backgroundColor:'white'

        },


        shadowProp: {
            shadowOffset: {width: 0, height: 2},
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOpacity: 1,
            shadowRadius: 4,
        },

        icon:{
            borderColor:themeColors.colorExtraDark,
            borderRadius: 100,
            borderWidth: 2,
            padding: 5,
            elevation: 2,
            // color:GlobalStyles.colors.primary50
            // color : GlobalStyles.colors.primary200
            color:themeColors.colornormal
        },

        iconContainer:{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
            borderTopWidth: 1,
            borderTopColor: themeColors.colornormal,
            marginTop:20,

        }


    })



    const renderPost = ({item:post, index}) => {


        const handleCommentIconClick = (index) => {
            // const {locationX,locationY} = e.nativeEvent;



            setShowCommentInput((prevStates) => {
                let newStates = [...prevStates];
                newStates[index] = !newStates[index];
                // console.log("modal visib",newStates[index]);
                return newStates;
            })
            // setModalPosition({x:modalX,y:modalY-modalHeight});
        }







              // const postWidth = Dimensions.get('window').width-20;
              //   const postHeight = postWidth*1.5;



        return (

            <View key={index} className={"my-3 bg-white"} style={styles.postcontainer}>

                <View className={"flex-row -space-x-1 py-2 "}>

                    <Image source={post.profileImage}
                           className="h-10 w-10 rounded-full mx-8" />

                    <View className={"flex-col space-y-0 -mx-2"}>
                        <Text className={"text-black font-bold text-lg"}>{post.name}</Text>
                        <Text className={"text-gray-500 text-xs"}>{post.time}</Text>
                    </View>

                </View>

                <View className={"mx-8"}>
                    <Text>{post.text} </Text>
                </View>

                <View className={"items-center pt-4"}>
                    <Image source={post.image} className="h-60 w-96 rounded-3xl"/>
                </View>

                <View className = {"flex-row mx-8 py-3 space-x-48"}>
                    <View>
                        <TouchableOpacity onPress={() => handleLike(index)}>
                            <Text className={"font-bold text-teal-400"}>

                                {postStates[index]?.likes || 0} {""}
                                {postStates[index]?.likes === 1 ? 'like': 'likes'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('CommentsList', { comments:comments[index]})}>
                            <Text className={"font-bold text-teal-400"}>{comments[index].length}comments</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.iconContainer}>
                    <TouchableOpacity hitSlop={4} onPress={() => handleLike(index)}>

                        <FontAwesomeIcon
                            icon={likedPosts.includes(index) ? faHeartSolid : faHeartRegular}
                            size={25}
                            color={post.liked ? themeColors.colornormal : themeColors.colorExtraDark}
                            style={styles.icon} />

                    </TouchableOpacity>



                    <TouchableOpacity hitSlop={4} onPress={() =>{
                        handleCommentIconClick(index);
                        // navigation.navigate('CommentsList', { comments:comments[index]});

                    }}>
                        <FontAwesomeIcon icon={faComment} size={25}  style={styles.icon} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faShare} size={20}  style={styles.icon} />
                    </TouchableOpacity>

                </View>



                <View>
                    {showCommentInput[index] && (
                        <Comment onAddComment={(comment) => handleAddComment(index,comment)} onCloseCommentInput={()=>handleCommentIconClick(index)}/>
                    )}
                </View>
            </View>
        )

    }




       return (

           <SafeAreaView contentContainerStyle={{flexGrow:3}}>
             <View className={"my-2 mx-5"}>
                      <TopBar />
              </View>

              <View>
                          {/*<View className={"mx-80 my-2"}>*/}
                    <View>
                        <TouchableOpacity>
                                 <Search_Bar onSearch={handleSearch}/>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <FontAwesomeIcon icon={faFilter} size={25}  style={{marginLeft:350,color:themeColors.colornormal,paddingBottom:2,paddingTop:2}} />
                        </TouchableOpacity>



               {/*<MagnifyingGlassIcon size="25" color="black"/>*/}
                    </View>


             </View>



               <View className={"flex-row space-x-0.5 mt-4 bg-white flex-grow"} style={[styles.shadowProp]}>

                   <View className={"m-3 w-3/4"}>
                       {/*<Input placeholder={"Search"}  />*/}
                       <Input textInputConfig={{
                           placeholder: "What's on your mind?",
                       }}/>
                   </View>

                   {/*<View className={"mx-80 my-0"}>*/}
                   <View className={"my-12"}>
                       <TouchableOpacity>
                           <FolderPlusIcon size="25" color={themeColors.colornormal} />
                       </TouchableOpacity>
                   </View>

               </View>


               <FlatList data={posts} keyExtractor={(_,index) => index.toString()} renderItem={renderPost} style={{marginBottom:300}} />
           </SafeAreaView>
       )}

