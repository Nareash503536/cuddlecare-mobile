import { NativeBaseProvider } from "native-base";
import {Navigation} from "./navigation/navigation";
export default function App() {
  return (
    <NativeBaseProvider>
      <Navigation />
    </NativeBaseProvider>
  );
}