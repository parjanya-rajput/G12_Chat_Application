import RootNavigation from "./src/navigations/RootNavigation";
import { MenuProvider } from "react-native-popup-menu";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
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