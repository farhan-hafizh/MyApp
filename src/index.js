import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/global.scss";
import { Provider } from "react-redux";
import store, { persistor } from "./configureStore";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
import App from "./Containers/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
if (process.env.NODE_ENV === "production") {
	console.log = () => {};
	console.error = () => {};
	console.debug = () => {};
}
root.render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
