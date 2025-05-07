import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { Screen } from "../../components/Screen";
import Login from "../../components/auth/Login";
import { useAuth } from "../../components/context/AuthContext";
import { LogOutIcon } from "../../components/Icons";

export default function Profile() {
  const { user, logout, loading } = useAuth(); // Obtén el estado de autenticación y función de cierre de sesión

  const handleChangePicture = () => {
    console.log("Aqui va la funcionalidad de cambiar de foto");
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <Text className="text-white">Cargando...</Text>
      </View>
    );
  }

  if (!user) {
    return <Login />; // Si no hay un usuario autenticado, muestra el componente de inicio de sesión
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 bg-black">
          {/*Header */}
          <View className="items-center p-6 bg-gradient-to-r from-purple-500 to-blue-500">
            <View className="relative">
              <Image
                source={{
                  /* uri: `${API_IP}${user.propicture}`, */
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAcZBB7Xn4HvENRVW6E2J1EIAH2OtfjtakEeEJ1YdIPeG2pXauWGoeyBp5TpkIUILiHxI&usqp=CAU",
                }}
                className="w-20 h-20 rounded-full"
              />
            </View>
            <Text className="text-white text-xl font-bold">{user.name}</Text>
          </View>
          {/* Profile Details */}
          <View className="px-4 py-6">
            <Text className="text-gray-400 text-sm mb-1">Nombre</Text>
            <TextInput
              className="bg-gray-800 text-white p-3 rounded mb-4"
              value={user.name}
              editable={false}
            />

            <Text className="text-gray-400 text-sm mb-1">Correo</Text>
            <TextInput
              className="bg-gray-800 text-white p-3 rounded mb-4"
              value={user.email}
              editable={false}
            />

            <Text className="text-gray-400 text-sm mb-1">Rol</Text>
            <TextInput
              className="bg-gray-800 text-white p-3 rounded mb-6"
              value={user.role}
              editable={false}
            />

            {/* Log Out Button */}
            <Pressable onPress={logout}>
              {({ pressed }) => (
                <View
                  className={`p-3 rounded-lg flex-row items-center justify-center ${
                    pressed ? "bg-red-700" : "bg-red-600"
                  }`}
                >
                  <LogOutIcon className="mr-2" />
                  <Text className="text-white font-semibold">
                    Cerrar Sesión
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
