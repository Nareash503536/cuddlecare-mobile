import {SafeAreaView} from "react-native-safe-area-context";
import SleepHeader from "../components/sleepHeader";

export function SleepBarChart(){
    return(
        <SafeAreaView>
            <SleepHeader screen={"SleepTimeline"} />
        </SafeAreaView>
    )
}