import { View, Text, Image, Pressable } from "react-native";
import { Link } from "expo-router";

const ProductCard = ({ id, nombre, descripcion, precio, image }) => {
    return (
      <Link href={`/${id}`} asChild>
        <Pressable className="active:opacity-70 border border-yellow-500 active:border-white/50 mb-2 bg-gray-500/20 rounded-xl p-4">
          <View
            className="bg-gray-900 rounded-lg p-2 m-2"
            style={{ width: 305, height: 260 }}
            key={id}
          >
            <Image
              source={{ uri: image }}
              className="w-full h-44 rounded-lg mb-4"
              resizeMode="cover"
            />
            <Text className="text-white text-lg font-bold mb-2" numberOfLines={1}>
              {nombre}
            </Text>
            <View style={{ flex: 1 }}>
              <Text className="text-gray-400 text-sm mb-2" numberOfLines={3}>
                {descripcion}
              </Text>
            </View>
            <Text className="text-yellow-400 text-lg font-semibold">
              {`$${precio}`}
            </Text>
          </View>
        </Pressable>
      </Link>
    );
  };
export default ProductCard;
