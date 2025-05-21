import { FlatList, Pressable, Text, View } from "react-native";
import CartItem from "./CartItem";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_IP } from "../../env";
import { useLocalSearchParams } from "expo-router";
import { useStripe } from "@stripe/stripe-react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

const CartProducts = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState("0.00");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { refresh } = useLocalSearchParams();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${API_IP}/api/payments/checkout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, amount: total }),
      });

      const { paymentIntent, ephemeralKey, customer } = await response.json();

      const { error } = await initPaymentSheet({
        merchantDisplayName: "La tienda del Sazon",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
      });

      if (!error) {
        const { error: paymentError } = await presentPaymentSheet();

        if (paymentError) {
          alert(`Error: ${paymentError.message}`);
        } else {
          router.push({ pathname: "/compras", params: { refresh: true } });
          alert("¡Pago exitoso!");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Hubo un error al procesar el pago");
    }
  };

  const fetchCartProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_IP}/api/cart/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const result = await response.json();
      console.log("Respuesta del carrito:", result);

      if (response.ok) {
        const transformedProducts = Array.isArray(result)
          ? result.map((item) => ({
              id: item.productoId,
              nombre: item.Producto?.nombre || "Producto sin nombre",
              descripcion: item.Producto?.descripcion || "Sin descripción",
              precio: item.Producto?.precio || 0,
              image:
                item.Producto?.imagen ||
                "https://cdn-icons-png.freepik.com/512/8787/8787075.png",
              peso: item.peso || "1.0",
            }))
          : [];

        setProducts(transformedProducts);
        setError(null);
      } else {
        setError(result.message || "Error al obtener los productos");
        setProducts([]); // aseguramos que se vacíe si hay error
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
      setProducts([]); // aseguramos que se vacíe si hay error
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user) {
        fetchCartProducts();
      }
    }, [user])
  );

  // 💡 Recalcular total en cuanto cambie 'products'
  useEffect(() => {
    if (products.length === 0) {
      setTotal("0.00");
    } else {
      const newTotal = products
        .reduce((sum, item) => {
          const precio = parseFloat(item.precio) || 0;
          const peso = parseFloat(item.peso) || 1.0;
          return sum + precio * peso;
        }, 0)
        .toFixed(2);
      setTotal(newTotal);
    }
  }, [products]);

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
                refreshCart={fetchCartProducts}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center", paddingBottom: 160 }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        />
      )}

      {/* Total de la compra */}
      <View className="mt-4">
        <Text className="text-white text-2xl font-bold mb-2 text-center">
          Total de la compra:
        </Text>
        <Text className="text-yellow-400 text-2xl font-semibold text-center">
          ${total}
        </Text>
      </View>

      {total !== "0.00" && products.length > 0 && (
        <Pressable
          onPress={handleCheckout}
          className="p-3 rounded-lg items-center justify-center w-full mb-5 bg-blue-600"
        >
          <Text className="text-white text-2xl font-bold text-center">
            Comprar ahora
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default CartProducts;
