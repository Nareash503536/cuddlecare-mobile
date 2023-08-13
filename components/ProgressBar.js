import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {themeColors} from "../theme";

export default function ProgressBar ({progressInput}){
    const [progress, setProgress] = useState(0);
    const progressAnim = useRef(new Animated.Value(0)).current;
    const animateProgress = () => {
        Animated.timing(progressAnim, {
            toValue: progress,
            duration: 1000,
        }).start();
    };

    useEffect(() => {
        setProgress(progressInput);
        animateProgress();
        return () => {};
    }, [progress]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Milestones Progress: {progress}% (6/12)</Text>

            <View style={styles.progressBG}>
                <Animated.View
                    style={[
                        styles.progress,
                        {
                            width: progressAnim.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%'],
                            }),
                        },
                    ]}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#E0EAE9',
    },

    progressBG: {
        width: '90%',
        height: 10,
        backgroundColor: '#C4CDD5',
        marginHorizontal: 25,
        borderRadius: 10,
    },

    progress: {
        width: '50%',
        height: 10,
        backgroundColor: themeColors.btnColor,
        borderRadius: 10,
    },

    label: {
        fontSize: 15,
        fontWeight: '500',
        color: themeColors.btnColor,
        marginBottom: 20,
    },

    btnText: {
        fontWeight: '500',
        color: '#fff',
    },

    btnBox: {
        flexDirection: 'row',
    },
});