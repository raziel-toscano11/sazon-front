import { View, Text, Image, Pressable } from "react-native";
import { Link } from "expo-router";

const CompraCard = ({ id, nombre, descripcion, precio, image, peso }) => {
  const selectedPeso = parseFloat(peso) || 1;
  const precioTotal = (precio * selectedPeso).toFixed(2);

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

          {/* Info del peso y precio */}
          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-white text-sm font-medium">
              Peso: {selectedPeso} kg
            </Text>
            <Text className="text-yellow-400 text-base font-semibold">
              ${precioTotal}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CompraCard;