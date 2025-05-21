import { Stack, Link } from "expo-router";
import { View, Pressable } from "react-native";
import { ComprasIcon } from "../components/Icons";
import { AuthProvider } from "../components/context/AuthContext";
import { StripeProvider } from '@stripe/stripe-react-native';


export default function Layout() {
    return (
      <AuthProvider>
        <StripeProvider publishableKey="pk_test_51RLoTuRxbOR7RiW29kNif6wyAH03tbJltM4AehbJkq9hTXzc3cgCIIw0uWdLV0Ya2f4cAfmSTJO9bxUBVgEzhaEX00eKt3UJNu">
        <View className="flex-1 bg-black">
            <Stack
            screenOptions={{
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "yellow",
            headerTitle: "La Tienda del Sazon",
            /*headerLeft: () => <TuxIcon />,*/
            headerRight: () => (
              <Link asChild href="/compras">
                <Pressable>
                  <ComprasIcon />
                </Pressable>
              </Link>
            ),
          }}
            />
        </View>
        </StripeProvider>
      </AuthProvider>
    );
}