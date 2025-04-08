import { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Stack, useRouter } from "expo-router";
import { Screen } from '../components/Screen'
import { Alert, Image, Pressable, Text, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { API_IP } from "../env";
import * as ImagePicker from "expo-image-picker";

export default function CreateProduct() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [imagen, setImagen] = useState(null);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch(`${API_IP}/api/categories`);
        const data = await res.json();
        const formatted = data.map((cat) => ({
          label: cat.nombre,
          value: cat.id,
        }));
        setCategorias(formatted);
      } catch (err) {
        console.error("Error al cargar categorías:", err.message);
      }
    };

    fetchCategorias();
  }, []);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  const handleCreateProduct = async () => {
    if (!nombre || !descripcion || !precio || !categoriaId || !imagen) {
      Alert.alert("Todos los campos son requeridos");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("categoriaId", categoriaId);

    const filename = imagen.split("/").pop();
    const ext = filename.split(".").pop();
    const type = `image/${ext}`;

    formData.append("image", {
      uri: imagen,
      name: filename,
      type,
    });

    try {
      const response = await fetch(`${API_IP}/api/create/product`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Producto creado correctamente");
        router.dismissTo({ pathname: "/my-products", params: { refresh: true } });

      } else {
        Alert.alert("Error", result.message || "Ocurrió un error");
      }
    } catch (error) {
      console.error("Error al crear producto:", error.message);
    }
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffee80" },
          headerTintColor: "black",
          headerTitle: "Crear Producto",
        }}
      />

      <Text className="text-white text-2xl font-bold mb-6 text-center">
        Crear Producto
      </Text>

      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#ccc"
        className="bg-gray-800 text-white p-4 rounded-lg mb-4"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        placeholder="Descripción"
        placeholderTextColor="#ccc"
        className="bg-gray-800 text-white p-4 rounded-lg mb-4"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <TextInput
        placeholder="Precio"
        placeholderTextColor="#ccc"
        className="bg-gray-800 text-white p-4 rounded-lg mb-4"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
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
        onPress={handlePickImage}
        className="bg-gray-700 p-4 rounded-lg mb-4 items-center"
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
        onPress={handleCreateProduct}
        className="bg-yellow-500 p-4 rounded-lg items-center mt-4"
      >
        <Text className="text-gray-900 font-bold text-lg">Crear Producto</Text>
      </Pressable>
    </Screen>
  );

}
