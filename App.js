import { Provider } from "react-redux";
import { NativeBaseProvider } from "native-base";
import {Navigation} from "./navigation/navigation";
import { store } from "./store/store";
export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Navigation />
      </NativeBaseProvider>
    </Provider>
  );
}