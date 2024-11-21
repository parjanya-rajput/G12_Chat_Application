import RootNavigation from "./src/navigations/RootNavigation";
import { MenuProvider } from "react-native-popup-menu";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";

SplashScreen.preventAutoHideAsync()
  .then((result) => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
  .catch(console.warn);

export default function App() {
  const [fontsLoaded] = useFonts({
    "cretype-caros": require("./assets/fonts/cretype  Caros.otf"),
    "Caros-Heavy": require("./assets/fonts/cretype  Caros Heavy.otf"),
    "Caros-Medium": require("./assets/fonts/cretype  Caros Medium.otf"),
    "Caros-Bold": require("./assets/fonts/cretype  Caros Bold.otf"),
  });

  // useEffect(() => {
  //   if (fontsLoaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);
  setTimeout(async () => {
    await SplashScreen.hideAsync();
  }, 2000);

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <MenuProvider>
          <RootNavigation />
        </MenuProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
