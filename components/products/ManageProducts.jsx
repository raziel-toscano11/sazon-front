import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  TextInput,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { getAllProducts } from "../../lib/api-products"; // asegúrate que la función está bien
import ProductCard from "../../components/products/ProductCard";
import { AddIcon } from "../../components/Icons";
import { Screen } from "../Screen";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refresh } = useLocalSearchParams();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const result = await getAllProducts();
      setProducts(result);
      setError(null);
    } catch (err) {
      setError("Error al obtener los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);
  
  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white mt-4">Cargando productos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900 px-6">
        <Text className="text-white text-2xl font-bold mb-4 text-center">
          Gestión de Productos
        </Text>
        <Link href="/create-product" asChild>
          <Pressable>
            <View className="flex items-center p-4 mb-4 mx-22 rounded-lg bg-gray-700">
              <AddIcon size={26} />
              <Text className="text-white text-lg mt-2">Crear Producto</Text>
            </View>
          </Pressable>
        </Link>
        <Text className="text-red-400 text-center">{error}</Text>
      </View>
    );
  }

  return (
    <Screen>
      <View className="px-4 pt-2">
        <Text className="text-white text-2xl font-bold mb-4 text-center">
          Gestión de Productos
        </Text>

        <Link href="/create-product" asChild>
          <Pressable>
            <View className="flex items-center p-4 mb-4 mx-28 rounded-lg bg-gray-700">
              <AddIcon size={26} />
              <Text className="text-white text-lg mt-2">Crear Producto</Text>
            </View>
          </Pressable>
        </Link>

        <TextInput
          className="bg-gray-800 text-white px-4 py-4 rounded-lg mb-4 "
          placeholder="Buscar producto..."
          placeholderTextColor="#aaa"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        {filteredProducts.length === 0 && searchTerm.trim() !== "" ? (
          <Text className="text-white text-center mt-6">
            No se encontraron productos
          </Text>
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCard
                id={item.id}
                nombre={item.nombre}
                descripcion={item.descripcion}
                precio={item.precio}
                image={item.imagen}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 160, alignItems: "center" }}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          />
        )}
      </View>
    </Screen>
  );
};

export default ManageProducts;
