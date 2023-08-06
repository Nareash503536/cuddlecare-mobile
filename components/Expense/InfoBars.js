import {FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {CakeIcon,TrashIcon,PencilSquareIcon,EllipsisHorizontalIcon} from "react-native-heroicons/solid";
import React, {useRef, useState} from "react";
import {themeColors} from "../../theme";
import {ExpenseDelete} from "../../api/ExpenseApi";
import {useNavigation} from "@react-navigation/native";
import Pagination,{Icon,Dot} from 'react-native-pagination';



export default function InfoBars({details , keyField ,category}) {
    let navigation = useNavigation();

    function deleteExpense(expenseID){
        setModalVisible(!modalVisible);
        ExpenseDelete(expenseID);
    }
//     const renderPagination = (currentPage) => {
//         const startIndex = (currentPage - 1) * itemsPerPage;
//         const endIndex = startIndex + itemsPerPage;
// console.log(startIndex,endIndex,currentPage);
//         return (
//             <Pagination
//                 listRef={this.flatListRef}
//                 paginationVisibleItems={details.slice(startIndex, endIndex)}
//                 paginationItems={details}
//                 paginationItemPadSize={3}
//                 onPageChange={(page) => setCurrentPage(page)}
//             />
//         );
//     };
    const [modalVisible, setModalVisible] = useState(false);
    return(

        category==='Budget'?(
            <FlatList
                data={details}

                keyExtractor={(item) => item[keyField].toString()}

                renderItem={({ item }) => (
                    <View style={{...styles.btn}} className={"flex-row mt-4 justify-between"}>


                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity className={"rounded-full p-3  "}
                                              style={{backgroundColor: '#70AABA'}}>
                                <CakeIcon size="27" color="white"/>
                            </TouchableOpacity>
                            <View className={"left-2"}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: '700',
                                        textAlign: 'left'
                                    }}
                                > {item.budgetName}</Text>

                                <Text style={{color: 'gray', width: 200, textAlign: 'left'}}>{new Date(item.startdate).toLocaleDateString()}- {new Date(item.enddate).toLocaleDateString()}</Text>
                            </View>
                        </View>
                        {/*<EllipsisHorizontalIcon size="27" color="black" />*/}
                        <View className={" p-1 float-right"}>
                            <Text  style={{
                                fontSize: 18,
                                fontWeight: '500',

                            }}>Rs.{item.amount}</Text>

                        </View>

                    </View>
                )

                }

            />
        ):(

<>

            <FlatList




                keyExtractor={(item) => item[keyField].toString()}

                data={details}

                renderItem={({ item }) => (
                    <View style={{...styles.btn}}
                                      className={"flex-row mt-4 justify-between"}>


                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity className={"rounded-full p-3  "}
                                              style={{backgroundColor: '#70AABA'}}>
                                <CakeIcon size="27" color="white"/>
                            </TouchableOpacity>
                            <View className={"left-2"}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: '700',
                                        textAlign: 'left'
                                    }}
                                > {item.expenseName}</Text>

                                <Text style={{
                                    color: 'gray',

                                    paddingLeft: 5,
                                    width: 150,
                                    textAlign: 'left',
                                }}>{item.notes}</Text>
                            </View>
                        </View>

                        <View className={" p-1"}>
                            <Text>Rs.{item.amount}</Text>
                            <Text
                                style={{color: 'gray'}}>{new Date(item.date).toLocaleDateString()}</Text>
                        </View>
                        {/*<EllipsisHorizontalIcon size="27" color="black" style={{position:'absolute',right:20,marginTop:5}} />*/}

                        <TouchableOpacity className={"flex-col justify-between ml-2"}>
                            <TouchableOpacity  onPress={() => setModalVisible(true)} >
                                <TrashIcon size="27" color="gray" />
                            </TouchableOpacity>
                            <TouchableOpacity   onPress={() => navigation.navigate('ExpenseForm',{Editdata:item,title:"Edit Expense"})}>
                                    <PencilSquareIcon size="27" color="grey" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <View style={styles.centeredView}>
                        <Modal

                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <View style={{...styles.modalView}}>
                                <Text>Are You sure, You want to Delete this?</Text>
                                <View className={"flex-1 flex-row gap-4 my-2"}>
                                <Pressable
                                    style={styles.cancel}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text   style={{color:themeColors.btnColor}}>Cancel</Text>
                                </Pressable>
                                <Pressable
                                    style={styles.Button}
                                    onPress={() => (deleteExpense(item.expenseID))}>
                                    <Text   style={{color:'white'}}>Delete</Text>
                                </Pressable>
                                </View>
                            </View>
                        </Modal>
                        </View>
                    </View>

                )

                }

            />


    </>
        )


        )

}
const styles = StyleSheet.create({
    Button:{
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor:themeColors.btnColor,
        // borderColor:'grey'
    },
    cancel:{
        borderRadius: 20,
        padding: 10,
        elevation: 2,
            backgroundColor:'white',
        borderColor:'themeColors.btnColor'
    },
    Box:{
        width:'100%',

        borderRadius: 15,
        flexDirection: 'row',
        padding: 22,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowRadius: 4,


    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    btn:{
        backgroundColor:'white',
        minHeight:80,
        borderRadius: 15,
        padding: 22,
        flex:1,
        justifyContent:'center',
        alignItems:'center'

    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position:'absolute',
        top:'40%',
        right:15,

    },
})
