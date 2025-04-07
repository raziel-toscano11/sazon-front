import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Link } from "expo-router";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    try {
      await login({ email, password }); // Llama a `login` con el email y password
      // Puedes redirigir a otra pantalla después de iniciar sesión correctamente, si es necesario
    } catch (error) {
      Alert.alert("Error de inicio de sesión", error.message); // Muestra el mensaje de error si hay un problema
    }
  };

  return (
    <View className="flex-1 bg-gray-900 items-center justify-center px-6">
      <Text className="text-3xl text-white font-bold mb-8">¡Bienvenido!</Text>

      {/* Campo de Email */}
      <Text className="text-gray-400 text-sm mb-1">Correo electronico</Text>
      <TextInput
        className="bg-gray-800 text-white p-3 rounded mb-4 w-full"
        placeholder="Correo electronico"
        placeholderTextColor="#6b7280"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo de Contraseña */}
      <Text className="text-gray-400 text-sm mb-1">Contraseña</Text>
      <TextInput
        className="bg-gray-800 text-white p-3 rounded mb-6 w-full"
        placeholder="Contraseña"
        placeholderTextColor="#6b7280"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Botón de Iniciar Sesión */}
      <Pressable onPress={handleLogin}>
        {({ pressed }) => (
          <View
            className={`p-3 rounded-lg items-center justify-center w-full mb-5 ${
              pressed ? "bg-blue-700" : "bg-blue-500"
            }`}
          >
            <Text className="text-white font-semibold">Iniciar Sesion</Text>
          </View>
        )}
      </Pressable>

      {/* Enlace a registro */}
      <Link href="/register" asChild>
        <Pressable>
          <Text className="text-gray-400 text-base">
            Aun no tienes una cuenta?{" "}
            <Text className="text-blue-500">Registrarme</Text>
          </Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Login;
