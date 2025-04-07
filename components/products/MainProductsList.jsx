import { useEffect, useState } from "react";
import { getAllProducts } from "../../lib/api-products";
import { ActivityIndicator, FlatList, Text, TextInput, View } from "react-native";
import ProductCard from './ProductCard'


const MainProductsList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getAllProducts()
            .then((products) => {
                setProducts(products);
            })
            .catch((error) => {
                console.error("Error cargando los productos]:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const filteredProducts = products.filter((product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (
        <View className="px-4 pt-2">
          {loading ? (
            <ActivityIndicator color={"#fff"} size={"large"} />
          ) : (
            <>
              {/* 🔍 Campo de búsqueda */}
              <TextInput
                className="bg-gray-800 text-white px-4 h-14 rounded-xl mb-4 text-base"
                placeholder="Buscar producto..."
                placeholderTextColor="#aaa"
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
    
              {filteredProducts.length === 0 ? (
                <Text className="text-white text-center">No se encontraron productos</Text>
              ) : (
                <FlatList
                  data={filteredProducts}
                  keyExtractor={(product) => product.id.toString()}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                  renderItem={({ item }) => (
                    <ProductCard
                      id={item.id}
                      nombre={item.nombre}
                      descripcion={item.descripcion}
                      precio={item.precio}
                      image={item.imagen}
                    />
                  )}
                />
              )}
            </>
          )}
        </View>
      );
}

export default MainProductsList;