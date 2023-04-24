import React, { useEffect } from "react";
import RootNavigation from "./src/navigation/index";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import reduxStore from "./src/redux";
import "react-native-gesture-handler";
import EStyleSheet from "react-native-extended-stylesheet";
import { RootSiblingParent } from "react-native-root-siblings";

export const reduxPersistStore = persistStore(reduxStore);

const App = () => {
  useEffect(() => {
    EStyleSheet.build();
  }, []);

  return (
    <Provider store={reduxStore}>
      <PersistGate persistor={reduxPersistStore}>
        <RootSiblingParent>
          <RootNavigation />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
};

export default App;
