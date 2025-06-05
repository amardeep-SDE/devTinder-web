import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import Feed from "./components/Feed";
import appStore, { persistor } from "./utils/appStore";
import { PersistGate } from "redux-persist/integration/react";
const App = () => {
  return (
    <>
      <Provider store={appStore}>
       <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </PersistGate>
      </Provider>
    </>
  );
};

export default App;
