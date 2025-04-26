import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, Alert } from "react-native";
import { Link } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { TrashIcon } from '../../components/Icons.js'
import { useAuth } from "../context/AuthContext.jsx";
import { API_IP } from "../../env.js";

const CartItem = ({ id, nombre, descripcion, precio, image, peso, refreshCart }) => {
    const { user } = useAuth();
    // Inicializar selectedPeso con el peso pasado como prop, convirtiéndolo a número
    const [selectedPeso, setSelectedPeso] = useState(parseFloat(peso) || 1);
  
    // Asegurarse de que selectedPeso se actualice si el peso prop cambia
    useEffect(() => {
      setSelectedPeso(parseFloat(peso) || 1);
    }, [peso]);
  
    const precioTotal = (precio * selectedPeso).toFixed(2);
  
    // Función para actualizar el peso en el backend
    const handleUpdatePeso = async (newPeso) => {
      try {
        const response = await fetch(
          `${API_IP}/api/cart/user/${user.id}/product/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
              peso: newPeso.toString(), // Convertir a cadena para el backend
            }),
          }
        );
  
        const result = await response.json();
  
        if (response.ok) {
          setSelectedPeso(newPeso);
          if (refreshCart) {
            refreshCart(); // Refrescar los productos en CartProducts
          }
        } else {
          throw new Error(result.message || "Error al actualizar el peso");
        }
      } catch (error) {
        console.error("Error al actualizar el peso:", error.message);
        Alert.alert("Error", error.message || "No se pudo actualizar el peso");
      }
    };

    const handleDelete = async () => {
        try {
          const response = await fetch(
            `${API_IP}/api/cart/user/${user.id}/product/${id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
    
          const result = await response.json();
    
          if (response.ok) {
            Alert.alert("Éxito", "Producto eliminado del carrito");
            if (refreshCart) {
              refreshCart(); // Refrescar los productos en CartProducts
            }
          } else {
            throw new Error(result.message || "Error al eliminar el producto");
          }
        } catch (error) {
          console.error("Error al eliminar el producto:", error.message);
          Alert.alert("Error", error.message || "No se pudo eliminar el producto");
        }
      };
    

    return (
        <View className="border border-yellow-500 mb-2 bg-gray-500/20 rounded-xl p-4">
          <View
            className="bg-gray-900 rounded-lg p-2 m-2 flex-row"
            style={{ width: 305, height: 120 }}
            key={id}
          >
            {/* Imagen a la izquierda */}
            <Image
              source={{
                uri: image || "https://cdn-icons-png.freepik.com/512/8787/8787075.png",
              }}
              className="w-20 h-20 rounded-lg mr-4"
              resizeMode="cover"
            />
    
            {/* Contenido a la derecha */}
            <View className="flex-1">
              {/* Sección clickeable */}
              <Link href={`/${id}`} asChild>
                <Pressable className="flex-1 active:opacity-70">
                  <Text
                    className="text-white text-base font-bold mb-1"
                    numberOfLines={1}
                  >
                    {nombre || "Nombre no disponible"}
                  </Text>
                  <Text
                    className="text-gray-400 text-xs mb-2"
                    numberOfLines={2}
                  >
                    {descripcion || "Descripción no disponible"}
                  </Text>
                </Pressable>
              </Link>
    
              {/* Picker, precio y botón de eliminar (fuera del Link) */}
              <View className="flex-row justify-between items-center mt-2">
                <View className="bg-gray-700 rounded-lg">
                  <Picker
                    selectedValue={selectedPeso}
                    onValueChange={(itemValue) => handleUpdatePeso(itemValue)}
                    style={{
                      width: 130,
                      height: 50,
                      color: "#FFFFFF",
                      fontSize: 14,
                    }}
                  >
                    <Picker.Item label="250 g" value={0.25} />
                    <Picker.Item label="500 g" value={0.5} />
                    <Picker.Item label="1 kg" value={1} />
                    <Picker.Item label="1.5 kg" value={1.5} />
                    <Picker.Item label="2 kg" value={2} />
                    <Picker.Item label="2.5 kg" value={2.5} />
                    <Picker.Item label="3 kg" value={3} />
                  </Picker>
                </View>
                <Text className="text-yellow-400 text-base font-semibold">
                  ${precioTotal}
                </Text>
                {/* Botón de eliminar */}
                <Pressable className="ml-2" onPress={handleDelete}>
                  <TrashIcon />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      );
    };
    
    export default CartItem;