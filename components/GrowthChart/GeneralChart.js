import {Dimensions, View, StyleSheet, Animated, Easing, Alert, ScrollView} from "react-native";
import Svg, {Circle, G, Line, Path, Rect, Text as SvgText} from "react-native-svg";
import {useEffect, useRef, useState} from "react";

const window_windth = Dimensions.get('window').width;
export function GeneralChart({
                                    chart_data =[],
                                    SD3neg = [],
                                    SD2neg = [],
                                    SD1neg = [],
                                    SD0 =[],
                                    SD1 =[],
                                    SD2 =[],
                                    SD3 =[],
                                    containerHeight=750,
                                    circleColor='#000',
                                    circleRadius=4,
                                    axisColor='#fff',
                                    axisWidth=2,
                                    axisLableFontSize=12,
                                    lineChartColor='#daa520',
                                    lineChartWidth=2,
                                    durationTime=1000,
                                    tooltipHeight=20,
                                    tooltipWidth=40,
                                    tooltipVisible=false,
                                    onPressItem,
                                    scrollEnable=false,
                                    backgroundColor='transparent',
                                    yAxisPoints =[],
                                    xAxisPoints =[],

                                }){

    const deviceHight = Dimensions.get('window').height;
    containerHeight = deviceHight*0.85

    const marginFor_x_fromLeft = 50;
    const marginFor_y_fromBottom = 50;
    const padding_from_screenBorder = 20;

    const x_axis_x1_point = marginFor_x_fromLeft;
    const x_axis_y1_point = containerHeight - marginFor_y_fromBottom;
    const x_axis_x2_point = window_windth - padding_from_screenBorder;
    const x_axis_y2_point = containerHeight - marginFor_y_fromBottom;
    let gap_between_x_axis_ticks =x_axis_x2_point /5;
    let x_axis_actual_width = x_axis_x1_point+gap_between_x_axis_ticks * xAxisPoints.length;
    const y_axis_x1_point = marginFor_x_fromLeft;
    const y_axis_y1_point = padding_from_screenBorder;
    const y_axis_x2_point = marginFor_x_fromLeft;
    const y_axis_y2_point = containerHeight - marginFor_y_fromBottom;

    const y_max_value =Math.max(...yAxisPoints);
    const y_min_value =Math.min(...yAxisPoints);

    const y_axis_actual_height = y_axis_y2_point - y_axis_y1_point;
    const gap_between_y_axis_ticks = (y_axis_actual_height - y_min_value) / (yAxisPoints.length-1);// MMK
    const [yAxisLabels, setYAxisLabels] = useState([]);

    const animated_x_axis_width = useRef(
        new Animated.Value(x_axis_x1_point)
    ).current;
    const animated_y_axis_width = useRef(
        new Animated.Value(y_axis_y2_point)).current;
    const animated_Circle_radius =  useRef(
        new Animated.Value(0)
    ).current;
    const animated_ticks_labels_opacity =  useRef(
        new Animated.Value(0)
    ).current;
    const animated_path_ref = useRef(null);
    const animated_path_length = useRef(new Animated.Value(0)).current;
    const animated_path_opacity = useRef(new Animated.Value(0)).current;
    const animated_tooltip_opacity = useRef(new Animated.Value(0)).current;

    const [pathLength, setPathLength] = useState(0);
    const [y_axis_view_hidden, set_Y_axis_view_hidden] = useState(true);
    const ref = useRef(null);
    const ref_scrollView = useRef(null);

    const AnimatedLine = Animated.createAnimatedComponent(Line);
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const AnimatedSvg = Animated.createAnimatedComponent(Svg);
    const AnimatedSvgText = Animated.createAnimatedComponent(SvgText);
    const AnimatedRect = Animated.createAnimatedComponent(Rect);
    const AnimatedPath = Animated.createAnimatedComponent(Path);
//////////////Animation//////////////////////////////////

    useEffect(()=>{
        const yAxisData = yAxisPoints.map((item,index)=>{
            if(index ===0){
                return y_min_value;
            }else{
                return item;
            }
        });
        setYAxisLabels(yAxisData);
        start_axis_circle_animation();
        start_x_y_ticks_labels_animation();
    },[])

    useEffect(() => {
        start_x_y_axis_animation();
        animated_path_length.setValue(pathLength);
        Animated.timing(animated_path_length, {
            toValue:0,
            duration: durationTime,
            useNativeDriver:true,
            easing: Easing.ease,
        }).start();
        Animated.timing(animated_path_opacity, {
            toValue:1,
            duration: durationTime,
            useNativeDriver:true,
            easing: Easing.ease,

        }).start();
        Animated.timing(animated_tooltip_opacity, {
            toValue:1,
            duration: durationTime,
            useNativeDriver:true,
            easing: Easing.ease,

        }).start();
    }, [pathLength]);

    const start_axis_circle_animation = () => {
        Animated.timing(animated_Circle_radius, {
            toValue: circleRadius,
            duration: durationTime,
            useNativeDriver: true,
        }).start();
    };
    const start_x_y_axis_animation = () => {
        Animated.timing(animated_x_axis_width, {
            toValue: x_axis_x1_point + gap_between_x_axis_ticks * (xAxisPoints.length-1),
            duration: durationTime,
            delay:500,
            useNativeDriver: true,
        }).start();
        Animated.timing(animated_y_axis_width, {
            toValue: y_axis_y1_point,
            duration: durationTime,
            delay:500,
            useNativeDriver: true,
        }).start();
    };

    const start_x_y_ticks_labels_animation = () => {
        Animated.timing(animated_ticks_labels_opacity, {
            toValue: 1,
            duration: durationTime,
            useNativeDriver: true,
        }).start();
    }
////////////////////////////////////////////////

//////////////Rendering//////////////////////////////////
    const render_x_axis = () => {
        return(
            <G key={"x-axis y-axis"}>
                <AnimatedLine
                    key={"x-axis"}
                    x1={x_axis_x1_point}
                    y1={x_axis_y1_point}
                    x2={animated_x_axis_width}
                    y2={x_axis_y2_point}
                    stroke={axisColor}
                    strokeWidth={axisWidth}
                />
            </G>

        )
    }

    const render_y_axis = () => {
        return(
            <G key={"x-axis y-axis"}>
                <AnimatedCircle
                    key={"x-axis x1y1-circle"}
                    cx={x_axis_x1_point}
                    cy={x_axis_y1_point}
                    fill={circleColor}
                    r={animated_Circle_radius}
                />
                <AnimatedCircle
                    key={"y-axis x1y1-circle"}
                    cx={y_axis_x1_point}
                    cy={y_axis_y1_point}
                    fill={circleColor}
                    r={animated_Circle_radius}
                />

                <AnimatedLine
                    key={"y-axis"}
                    x1={y_axis_x1_point}
                    y1={animated_y_axis_width}
                    x2={y_axis_x2_point}
                    y2={y_axis_y2_point}
                    stroke={axisColor}
                    strokeWidth={axisWidth}
                />

            </G>

        )
    }

    const render_x_axis_labels_and_ticks = () => {
        return xAxisPoints.map((item,index)=>{
            let x_point = x_axis_x1_point + index * gap_between_x_axis_ticks;
            return(
                <G key={`x-axis labels and ticks${index}`}>
                    <AnimatedLine
                        key={`x-axis-tick1${index}`}
                        x1={x_point}
                        y1={x_axis_y1_point}
                        x2={x_point}
                        y2={x_axis_y1_point + 10}
                        stroke={axisColor}
                        strokeWidth={axisWidth}
                        opacity={animated_ticks_labels_opacity}
                    />
                    {/*vertical shop lines*/}
                    <AnimatedLine
                        key={`x-axis-line${index}`}
                        x1={x_point}
                        y1={x_axis_y1_point}
                        x2={x_point}
                        y2={y_axis_y1_point}
                        stroke={axisColor}
                        strokeWidth={1}
                        strokeDasharray={[5, 5]}
                        opacity={0.5}
                    />

                    <AnimatedSvgText
                        x={x_point}
                        y={x_axis_y1_point + 20}
                        fill={axisColor}
                        textAnchor={"middle"}
                        fontSize={axisLableFontSize}
                        fontWeight={400}
                        opacity={animated_ticks_labels_opacity}

                    >
                        {item}
                    </AnimatedSvgText>
                </G>
            )
        })
    }

    const render_y_axis_labels_and_ticks = () => {
        return yAxisLabels.map((item,index)=>{
            let y_point = y_axis_y2_point - gap_between_y_axis_ticks * index ;
            return (
                <G key={`y-axis labels and ticks${index}`}>
                    <AnimatedLine
                        key={`y-axis tick${index}`}
                        x1={marginFor_x_fromLeft}
                        y1={y_point}
                        x2={marginFor_x_fromLeft - 10}
                        y2={y_point}
                        stroke={axisColor}
                        strokeWidth={axisWidth}
                        opacity={animated_ticks_labels_opacity}

                    />
                    <AnimatedSvgText
                        key={`y-axis labels${index}`}
                        x={marginFor_x_fromLeft - 20}
                        y={y_point+axisLableFontSize/3}
                        fill={axisColor}
                        textAnchor={"end"}
                        fontSize={axisLableFontSize}
                        fontWeight={400}
                        opacity={animated_ticks_labels_opacity}
                    >
                        {item}
                    </AnimatedSvgText>

                </G>
            )
        })
    }

    const render_hoizontal_shop_Lines = () => {
        return yAxisLabels.map((item,index)=>{
            let y_point = y_axis_y2_point - gap_between_y_axis_ticks * index ;
            return (
                <G key={`y-axis_hoizontal_shop_Lines${index}`}>
                    <AnimatedLine
                        key={`y-axis_hoizontal_shop_Line${index}`}
                        x1={marginFor_x_fromLeft}
                        y1={y_point}
                        x2={animated_x_axis_width}
                        y2={y_point}
                        stroke={axisColor}
                        strokeWidth={1}
                        strokeDasharray={[5, 5]}
                        opacity={0.5}
                    />
                </G>
            )
        })
    }
    //////////////////////////////////////////////////////////////////
    const getDPath = (dataSet) => {
        const maxValueAtYAxis = yAxisLabels[yAxisLabels.length-1];
        const gapBetweenYAxisValues = maxValueAtYAxis - yAxisLabels[0];

        if(maxValueAtYAxis){
            let dPath = '';
            dataSet.map((item, index)=>{
                let x_point = (x_axis_x1_point) + (gap_between_x_axis_ticks/2) * item.month;
                let y_point = (maxValueAtYAxis - item.value) * ((x_axis_y1_point-y_axis_y1_point)/(gapBetweenYAxisValues)) +padding_from_screenBorder;
                if(index === 0){
                    dPath += `M${x_point} ${y_point}`;
                }else{
                    dPath += `L${x_point} ${y_point}`;
                }
            });
            return dPath;
        }
    }

    const render_lineChart_path = (dataSet,lineChartColor,lineChartWidth) =>{
        const dPath =  getDPath(dataSet);
        return(
            <AnimatedPath
                ref={animated_path_ref}
                d={dPath}
                strokeWidth={lineChartWidth}
                stroke={lineChartColor}
                strokeDasharray={pathLength}
                strokeDashoffset={animated_path_length}
                opacity={animated_path_opacity}
            />
        )
    }
    //////////////////////////////////////////////////////////////////

    const render_lineChart_circles = (chart_data) => {
        const maxValueAtYAxis = yAxisLabels[yAxisLabels.length-1];
        const gapBetweenYAxisValues = maxValueAtYAxis - yAxisLabels[0];
        if(maxValueAtYAxis){
            return chart_data.map((item, index)=>{
                let x_point = (x_axis_x1_point) + (gap_between_x_axis_ticks/2) * item.month;
                let y_point = (maxValueAtYAxis - item.value) * ((x_axis_y1_point-y_axis_y1_point)/(gapBetweenYAxisValues)) +padding_from_screenBorder;

                return (
                    <G key={`Chartcircles${index}`} >
                        <AnimatedCircle
                            key={`Chartcircle d${index}`}
                            cx={x_point}
                            cy={y_point}
                            r={animated_Circle_radius}
                            fill={circleColor}
                            onPress={()=>onPressItem(item)}
                        />
                    </G>
                )
            })
        }
    }

    const render_y_axis_view = () => {
        return(
            <View style={[StyleSheet.absoluteFillObject, {width:marginFor_x_fromLeft+circleRadius}]}>
                <AnimatedSvg style={styles.svgStyle}>
                    {render_y_axis()}
                    {render_y_axis_labels_and_ticks()}
                </AnimatedSvg>
            </View>
        )
    }

    const onScrollEnd = (event) => {
        const scrollview_x_position = event.nativeEvent.contentOffset.x;
        scrollview_x_position > 0
            ? set_Y_axis_view_hidden(true)
            : set_Y_axis_view_hidden(false);
    }

    return (
        <View style={[
            styles.svgWrapper,
            {height: containerHeight, width:window_windth,backgroundColor: backgroundColor}]}>

            {!y_axis_view_hidden ? render_y_axis_view():null}

            <ScrollView
                onScrollBeginDrag={()=>set_Y_axis_view_hidden(true)}
                onScrollEndDrag={onScrollEnd}
                ref={ref_scrollView}
                scrollEnabled={true}
                horizontal
                style={StyleSheet.absoluteFillObject}
                showsHorizontalScrollIndicator={false}>

                <View style={{height:containerHeight, minWidth: x_axis_actual_width}}>
                    <AnimatedSvg style={styles.svgStyle} height={'100%'} width={'100%'} >
                        {render_x_axis()}
                        {render_hoizontal_shop_Lines()}
                        {render_x_axis_labels_and_ticks()}
                        {render_lineChart_path(chart_data,"#daa520",2)}

                        {render_lineChart_path(SD3neg,"#FF0000",1)}
                        {render_lineChart_path(SD2neg,"#F7590E",0.5)}
                        {render_lineChart_path(SD1neg,"#21D33E",0.5)}
                        {render_lineChart_path(SD0,"#21D33E",1)}
                        {render_lineChart_path(SD1,"#21D33E",0.5)}
                        {render_lineChart_path(SD2,"#F7590E",0.5)}
                        {render_lineChart_path(SD3,"#FF0000",1)}

                        {render_lineChart_circles(chart_data)}

                    </AnimatedSvg>
                </View>
            </ScrollView>

            {y_axis_view_hidden ?
                (<View style={[StyleSheet.absoluteFillObject,{width: marginFor_x_fromLeft+axisWidth, backgroundColor:'white'}]}/>)
                : null}
            {y_axis_view_hidden ? render_y_axis_view():null}



        </View>
    )
}



const styles = StyleSheet.create({
    svgWrapper: {
        width: 400,
        backgroundColor:'transparent',
        height: 750,
        justifyContent: 'center',
        alignItems: 'center',
    },
    svgStyle: {
        backgroundColor:'transparent',
    }
})
