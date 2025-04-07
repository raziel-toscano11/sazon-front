import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { getProductDetails } from "../lib/api-products";
import { Screen } from "../components/Screen";

export default function ProductDetail() {
  const { detalleproducto } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (detalleproducto) {
      getProductDetails(detalleproducto)
        .then(setProduct)
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [detalleproducto]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-4">Cargando producto...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <Text className="text-white">Producto no encontrado</Text>
      </View>
    );
  }

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffee80" },
          headerTintColor: "black",
          headerLeft: () => {},
          headerTitle: "Detalles del producto",
          headerRight: () => {},
          statusBarBackgroundColor: "#ffee80",
        }}
      />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Image
          source={{
            uri: product.imagen
          }}
          style={{ width: "100%", height: 220, borderRadius: 10, marginBottom: 16 }}
          resizeMode="cover"
        />
        <Text className="text-white text-2xl font-bold mb-2">{product.nombre}</Text>
        <Text className="text-yellow-400 text-xl font-semibold mb-4">{`$${product.precio}`}</Text>
        <Text className="text-white text-base">{product.descripcion}</Text>
      </ScrollView>
    </Screen>
  );
}