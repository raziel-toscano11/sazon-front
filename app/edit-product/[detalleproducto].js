import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Alert, Image, Pressable, Text, TextInput, View } from "react-native";
import { useAuth } from "../../components/context/AuthContext";
import { useEffect, useState } from "react";
import { API_IP } from "../../env";
import { Screen } from "../../components/Screen";
import DropDownPicker from "react-native-dropdown-picker";
import { fetchProductAndCategories, updateProduct } from "../../lib/api-products";
import * as ImagePicker from "expo-image-picker";

export default function EditProduct() {
    const { detalleproducto } = useLocalSearchParams();
    const { user } = useAuth();
    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [categoriaId, setCategoriaId] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [imagen, setImagen] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (detalleproducto) {
          const loadData = async () => {
            try {
              const { product, categories } = await fetchProductAndCategories(detalleproducto);
              setProduct(product);
              setNombre(product.nombre);
              setDescripcion(product.descripcion);
              setPrecio(String(product.precio));
              setCategoriaId(product.categoriaId);
              setImagen(`${API_IP}${product.imagen}`);
              setCategorias(categories);
            } catch (err) {
              console.error("Error al cargar datos:", err.message);
            } finally {
              setLoading(false);
            }
          };
      
          loadData();
        }
      }, [detalleproducto]);

      const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          setImagen(result.assets[0].uri);
        }
      };

      const handleUpdate = async () => {
        if (!nombre || !descripcion || !precio || !categoriaId) {
          Alert.alert("Todos los campos son requeridos");
          return;
        }
      
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("precio", precio);
        formData.append("categoriaId", categoriaId);
      
        if (imagen && imagen.startsWith("file")) {
          const filename = imagen.split("/").pop();
          const ext = filename.split(".").pop();
          const type = `image/${ext}`;
      
          formData.append("image", {
            uri: imagen,
            name: filename,
            type,
          });
        }
      
        try {
          const response = await fetch(`${API_IP}/api/edit/product/${detalleproducto}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${user.token}`,
              // No pongas Content-Type, fetch lo agrega automáticamente cuando usas FormData
            },
            body: formData,
          });
      
          const result = await response.json();
      
          if (response.ok) {
            Alert.alert("Producto actualizado correctamente");
            router.dismissTo({ pathname: "/my-products", params: { refresh: true } });
          } else {
            Alert.alert("Error", result.message || "Ocurrió un error");
          }
        } catch (error) {
          console.error("Error al actualizar el producto:", error.message);
          Alert.alert("Error", "Ocurrió un error al actualizar el producto");
        }
      };
      
      
    
      if (loading) {
        return (
          <Screen>
            <View className="flex-1 items-center justify-center bg-gray-900">
              <ActivityIndicator color="#fff" size="large" />
              <Text className="text-white mt-4">Cargando producto...</Text>
            </View>
          </Screen>
        );
      }

    return (
        <Screen>
            <Stack.Screen 
            options={{
                headerStyle: { backgroundColor: "#ffee80" },
                headerTintColor: "black",
                headerTitle: `Editar Producto`,
                statusBarBackgroundColor: "#ffee80",
              }}
            />

<View className="flex-1 px-4">
        <Text className="text-white text-2xl font-bold mb-4 text-center">
          Editar: <Text className="text-yellow-400">{product?.nombre}</Text>
        </Text>

        <TextInput
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          placeholderTextColor="#ccc"
          className="bg-gray-800 text-white p-4 rounded-lg mb-4"
        />

        <TextInput
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
          placeholderTextColor="#ccc"
          className="bg-gray-800 text-white p-4 rounded-lg mb-4"
          multiline
        />

        <TextInput
          placeholder="Precio"
          value={precio}
          onChangeText={setPrecio}
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          className="bg-gray-800 text-white p-4 rounded-lg mb-4"
        />

        <DropDownPicker
          open={openDropdown}
          value={categoriaId}
          items={categorias}
          setOpen={setOpenDropdown}
          setValue={setCategoriaId}
          setItems={setCategorias}
          placeholder="Selecciona una categoría"
          style={{ backgroundColor: "#1f2937", borderRadius: 8, marginBottom: 16 }}
          dropDownContainerStyle={{ backgroundColor: "#374151" }}
          textStyle={{ color: "#fff" }}
          placeholderStyle={{ color: "#aaa" }}
        />

        <Pressable
          onPress={handleImagePick}
          className="bg-gray-700 p-4 rounded-lg items-center mb-4"
        >
          <Text className="text-white">
            {imagen ? "Cambiar Imagen" : "Seleccionar Imagen"}
          </Text>
        </Pressable>

        {imagen && (
          <Image
            source={{ uri: imagen }}
            className="w-full h-40 rounded-lg mb-4"
            resizeMode="cover"
          />
        )}

        <Pressable
          onPress={handleUpdate}
          className="bg-blue-600 p-4 rounded-lg items-center"
        >
          <Text className="text-white font-bold">Guardar Cambios</Text>
        </Pressable>
      </View>
        </Screen>
    )
    
}