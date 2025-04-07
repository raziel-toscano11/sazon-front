import { useAuth } from '../../components/context/AuthContext';
import { Screen } from '../../components/Screen';
import CartProducts from '../../components/products/CartProducts';
import DefaultMyProducts from '../../components/products/DefaultMyProducts';
import ManageProducts from '../../components/products/ManageProducts';

export default function MyProducts() {
    const {user } = useAuth();
    
    let ContentComponent;

    if (!user) {
        // Usuario no autenticado
        ContentComponent = DefaultMyProducts;
      } else if (user.role === 'administrador') {
        // Usuario autenticado con rol de administrador
        ContentComponent = ManageProducts;
      } else {
        // Usuario autenticado con cualquier otro rol
        ContentComponent = CartProducts;
      }

      return(
        <Screen>
            <ContentComponent />
        </Screen>
      );
}
