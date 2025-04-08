import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, Pressable, Modal, Alert } from "react-native";
import { getProductDetails } from "../lib/api-products";
import { Screen } from "../components/Screen";
import { useAuth } from "../components/context/AuthContext";
import { DangerIcon, EditIcon } from "../components/Icons";
import { deleteProduct } from '../lib/api-products';

export default function ProductDetail() {
  const { detalleproducto } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useAuth();
  const canManageProduct = user?.role === "administrador";

  useEffect(() => {
    if (detalleproducto) {
      getProductDetails(detalleproducto)
        .then(setProduct)
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [detalleproducto]);

  const handleDeleteProduct = async () => {
    try {
      const result = await deleteProduct(detalleproducto, user.token);
  
      Alert.alert("Producto eliminado correctamente");
      setIsModalVisible(false);
      router.replace({ pathname: "/my-products", params: { refresh: Date.now() } });
  
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
      Alert.alert("Error", error.message || "Ocurrió un error al eliminar el producto");
    }
  };
  

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
            uri: product.imagen,
          }}
          style={{
            width: "100%",
            height: 220,
            borderRadius: 10,
            marginBottom: 16,
          }}
          resizeMode="cover"
        />
        <Text className="text-white text-2xl font-bold mb-2">
          {product.nombre}
        </Text>
        <Text className="text-yellow-400 text-xl font-semibold mb-4">{`$${product.precio}`}</Text>
        <Text className="text-white text-base">{product.descripcion}</Text>

        {canManageProduct && (
          <View className="flex-row justify-center mt-6 mb-4">
            <Pressable className="flex-row items-center bg-blue-600 px-4 py-2 rounded-lg mr-2">
            <EditIcon />
              <Text className="text-white font-bold">Editar</Text>
            </Pressable>
            <Pressable className="flex-row items-center bg-red-600 px-4 py-2 rounded-lg" onPress={()=> setIsModalVisible(true)}>
            <DangerIcon />
              <Text className="text-white font-bold">Eliminar</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

        {/* MODAL DE CONFIRMACIÓN */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-gray-900 p-6 rounded-lg w-80">
            <Text className="text-white text-lg font-bold mb-4">
              ¿Estás seguro de que deseas eliminar este producto?
            </Text>
            <Text className="text-yellow-400 mb-6">Sera imposible recuperarlo.</Text>

            <Pressable
              onPress={handleDeleteProduct}
              className="bg-red-600 p-4 rounded-lg items-center mb-4"
            >
              <Text className="text-white font-bold">Sí, eliminar</Text>
            </Pressable>

            <Pressable
              onPress={() => setIsModalVisible(false)}
              className="bg-gray-300 p-4 rounded-lg items-center"
            >
              <Text className="text-black font-bold">Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </Screen>
  );
}
