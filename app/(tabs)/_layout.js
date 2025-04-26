import { Tabs } from "expo-router";
import { CartIcon, HomeIcon, ProfileIcon, SucursalICon } from "../../components/Icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#121212",
          paddingBottom: 4,
          borderColor: "#000000",
        },
        tabBarActiveTintColor: "#d3cc36",
        tabBarHideOnKeyboard: true,
        animation: "shift",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />

      <Tabs.Screen
        name="my-products"
        options={{
          title: "My Products",
          tabBarIcon: ({ color }) => <CartIcon color={color} />,
        }}
      />

      <Tabs.Screen
        name="sucursales"
        options={{
          title: "sucursales",
          tabBarIcon: ({ color }) => <SucursalICon color={color} />
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
