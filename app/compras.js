import { useState, useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import CompraCard from "../components/products/CompraCard.jsx";
import { Screen } from "../components/Screen.jsx";
import { API_IP } from "../env.js";
import { useAuth } from "../components/context/AuthContext.jsx";
import { useFocusEffect } from '@react-navigation/native';

export default function Compras() {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { refresh } = useLocalSearchParams();

  const fetchCompras = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_IP}/api/compras/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        const transformed = result.map((item) => ({
          id: item.id,
          nombre: item.Producto?.nombre || "Producto sin nombre",
          descripcion: item.Producto?.descripcion || "Sin descripción",
          precio: item.Producto?.precio || 0,
          image:
            item.Producto?.imagen ||
            "https://cdn-icons-png.freepik.com/512/8787/8787075.png",
          peso: item.peso || "1.0",
        }));
        setCompras(transformed);
        setError(null);
      } else {
        setError(result.message || "Error al obtener las compras");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
  useCallback(() => {
    if (user) {
      fetchCompras();
    }
  }, [user])
);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffee00" },
          headerTintColor: "black",
          headerTitle: "Mis compras",
          headerBackVisible: true,
          headerLeft: () => {},
          headerRight: () => {},
        }}
      />
      <View className="flex-1 bg-gray-black px-4 pt-2">
        <Text className="text-white text-2xl font-bold mb-4 text-center">
          Compras realizadas
        </Text>

        {loading ? (
          <Text className="text-white text-center mt-6">Cargando...</Text>
        ) : error ? (
          <Text className="text-red-400 text-center mt-6">{error}</Text>
        ) : compras.length === 0 ? (
          <Text className="text-white text-center mt-6">
            Aún no has realizado compras
          </Text>
        ) : (
          <FlatList
            data={compras}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const fullImageUrl = item.image ? `${API_IP}${item.image}` : null;

              return (
                <CompraCard
                  id={item.id}
                  nombre={item.nombre}
                  descripcion={item.descripcion}
                  precio={item.precio}
                  image={fullImageUrl}
                  peso={item.peso}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center", paddingBottom: 120 }}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          />
        )}
      </View>
    </Screen>
  );
}
