import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store } from "./store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </Provider>
);
