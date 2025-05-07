import { FlatList, Pressable, Text, View } from "react-native";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_IP } from "../../env";
import { useLocalSearchParams } from "expo-router";

const CartProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const { refresh } = useLocalSearchParams();
  
    const fetchCartProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_IP}/api/cart/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
  
        const result = await response.json();
  
        if (response.ok) {
          // Transforma los datos para que coincidan con lo que espera CartItem
          const transformedProducts = result.map((item) => ({
            id: item.productoId,
            nombre: item.Producto?.nombre || "Producto sin nombre",
            descripcion: item.Producto?.descripcion || "Sin descripción",
            precio: item.Producto?.precio || 0,
            image:
              item.Producto?.imagen ||
              "https://cdn-icons-png.freepik.com/512/8787/8787075.png",
            peso: item.peso || "1.0", // Incluir el peso
          }));
          setProducts(transformedProducts);
          setError(null);
        } else {
          setError(result.message || "Error al obtener los productos");
        }
      } catch (err) {
        setError("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (user) {
        fetchCartProducts();
      }
    }, [user, refresh]);
  
    // Calcular el total de la compra
    const total = products
      .reduce((sum, item) => {
        const precio = parseFloat(item.precio) || 0;
        const peso = parseFloat(item.peso) || 1.0;
        return sum + precio * peso;
      }, 0)
      .toFixed(2);
  
    return (
        <View className="flex-1 bg-gray-black px-4 pt-2">
          <Text className="text-white text-2xl font-bold mb-4 text-center">
            Carrito de compras
          </Text>
  
          {loading ? (
            <Text className="text-white text-center mt-6">Cargando...</Text>
          ) : error ? (
            <Text className="text-red-400 text-center mt-6">{error}</Text>
          ) : products.length === 0 ? (
            <Text className="text-white text-center mt-6">
              Tu carrito está vacío
            </Text>
          ) : (
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                const fullImageUrl = item.image ? `${API_IP}${item.image}` : null;
  
                return (
                  <CartItem
                    id={item.id}
                    nombre={item.nombre}
                    descripcion={item.descripcion}
                    precio={item.precio}
                    image={fullImageUrl}
                    peso={item.peso}
                    refreshCart={fetchCartProducts} // Pasar la función para refrescar
                  />
                );
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ alignItems: "center", paddingBottom: 160 }}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            />
          )}
  
          {/* Mostrar el total de la compra */}
          <View className="mt-4">
            <Text className="text-white text-2xl font-bold mb-2 text-center">
              Total de la compra:
            </Text>
            <Text className="text-yellow-400 text-2xl font-semibold text-center">
              ${total}
            </Text>
          </View>
          <Pressable className="p-3 rounded-lg items-center justify-center w-full mb-5 bg-blue-600">
            <Text className="text-white text-2xl font-bold text-center">
              Comprar ahora
            </Text>
          </Pressable>
        </View>
    );
  };
  
  export default CartProducts;