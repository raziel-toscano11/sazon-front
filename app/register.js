import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { API_IP } from "../env";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    try {
      const res = await fetch(`${API_IP}/api/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMessage = Array.isArray(data) ? data.join("\n") : data.message;
        Alert.alert("Error", errorMessage);
        return;
      }

      Alert.alert("Registro exitoso", "Ahora puedes iniciar sesión");
      router.dismissTo({ pathname: "/profile", params: { refresh: true } });
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar el usuario");
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-gray-900 items-center justify-center px-6">
      <Text className="text-3xl text-white font-bold mb-8">Registrarse</Text>

      {/* Campo de Nombre */}
      <Text className="text-gray-400 text-sm mb-1">Nombre</Text>
      <TextInput
        className="bg-gray-800 text-white p-3 rounded mb-4 w-full"
        placeholder="Tu nombre"
        placeholderTextColor="#6b7280"
        value={name}
        onChangeText={setName}
      />

      {/* Campo de Correo */}
      <Text className="text-gray-400 text-sm mb-1">Correo electrónico</Text>
      <TextInput
        className="bg-gray-800 text-white p-3 rounded mb-4 w-full"
        placeholder="Correo electrónico"
        placeholderTextColor="#6b7280"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Campo de Contraseña */}
      <Text className="text-gray-400 text-sm mb-1">Contraseña</Text>
      <TextInput
        className="bg-gray-800 text-white p-3 rounded mb-6 w-full"
        placeholder="Contraseña"
        placeholderTextColor="#6b7280"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Botón de Registro */}
      <Pressable onPress={handleRegister}>
        {({ pressed }) => (
          <View
            className={`p-3 rounded-lg items-center justify-center w-full mb-5 ${
              pressed ? "bg-green-700" : "bg-green-500"
            }`}
          >
            <Text className="text-white font-semibold">Registrarme</Text>
          </View>
        )}
      </Pressable>

      {/* Enlace a login */}
      <Link href="/" asChild>
        <Pressable>
          <Text className="text-gray-400 text-base">
            ¿Ya tienes una cuenta?{" "}
            <Text className="text-blue-500">Iniciar sesión</Text>
          </Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Register;