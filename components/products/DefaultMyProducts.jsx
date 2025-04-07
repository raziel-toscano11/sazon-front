import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";


const DefaultMyProducts = () => {
    return (
        <View
      className="bg-gray-900"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 24,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Inicia sesión para agregar productos al carrito
      </Text>

      <Link href="/profile" asChild>
        <Pressable className="flex-row items-center px-5 py-3 rounded-lg bg-blue-500">
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Ir a Iniciar Sesión
          </Text>
        </Pressable>
      </Link>
    </View>
    );
}

export default DefaultMyProducts;