import { API_IP } from '../env';

export async function getAllProducts() {
  const BASE_URL = `${API_IP}/api/products`;

  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error(`Error en la respuesta de la API: ${response.status}`);
    }

    const products = await response.json();
    
    return products.map((product) => {
      const {
        id,
        nombre,
        descripcion,
        precio,
        CategoriaProducto,
        imagen
      } = product;
    
      const fullImageUrl = imagen ? `${API_IP}${imagen}` : null;
    
      return {
        id,
        nombre,
        descripcion,
        precio,
        categoria: CategoriaProducto?.nombre || null,
        imagen: fullImageUrl,
      };
    });    
  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
    return [];
  }
}

export async function getProductDetails(id) {
  const url = `${API_IP}/api/product/${id}`;
  try {
    const response = await fetch(url);
    const product = await response.json();

    if (!response.ok || !product || typeof product !== 'object') {
      throw new Error(product?.message || "Producto inválido o no encontrado");
    }

    const {
      id: productId,
      nombre,
      descripcion,
      precio,
      CategoriaProducto,
      imagen
    } = product;

    const fullImageUrl = imagen ? `${API_IP}${imagen}` : null;

    return {
      id: productId,
      nombre,
      descripcion,
      precio,
      categoria: CategoriaProducto?.nombre || null,
      imagen: fullImageUrl,
    };
  } catch (error) {
    console.error("Error en getProductDetails:", error.message);
    throw error;
  }
}