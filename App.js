import { Provider } from "react-redux";
import {Navigation} from "./navigation/navigation";
import { store } from "./store/store";
export default function App() {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}
