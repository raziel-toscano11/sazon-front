import { Stack, Link } from "expo-router";
import { View, Pressable } from "react-native";
import { CircleInfoIcon, TuxIcon } from "../components/Icons";
import { AuthProvider } from "../components/context/AuthContext";


export default function Layout() {
    return (
      <AuthProvider>
        <View className="flex-1 bg-black">
            <Stack
            screenOptions={{
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "yellow",
            headerTitle: "La Tienda del Sazon",
/*             headerLeft: () => <TuxIcon />,
 */            /* headerRight: () => (
              <Link asChild href="/about">
                <Pressable>
                  <CircleInfoIcon />
                </Pressable>
              </Link>
            ), */
          }}
            />
        </View>
      </AuthProvider>
    );
}