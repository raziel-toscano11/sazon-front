import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import AntDesign from '@expo/vector-icons/AntDesign'

export const TuxIcon = (props) => (
    <Ionicons name="logo-tux" size={24} color="white" />
);

export const CircleInfoIcon = (props) => (
    <FontAwesome name="info-circle" size={24} color="white" {...props} />
);

export const HomeIcon = (props) => (
    <FontAwesome name="home" size={24} color="white" {...props} />
);

export const ProfileIcon = (props) => (
    <FontAwesome name="user-o" size={24} color="white" {...props} />
);

export const LogOutIcon = (props) => (
    <MaterialIcons name="logout" size={24} color="white" {...props} />
);

export const CartIcon = (props) => (
    <FontAwesome name="shopping-cart" size={24} color="white" {...props} />
);

export const AddIcon = (props) => (
    <FontAwesome6 name="add" size={24} color="white" {...props} />
);

export const EditIcon = (props) => (
    <AntDesign name="edit" size={24} color="white" {...props} />
);

export const DangerIcon = (props) => (
    <MaterialCommunityIcons name="delete-off" size={24} color="white" {...props} />
);

export const TrashIcon = (props) => (
    <FontAwesome name="trash" size={22} color="#EF4444" {...props} />
);

export const CartPlusIcon = (props) => (
    <FontAwesome6 name="cart-plus" size={24} color="white" {...props} />
);

export const SucursalICon = (props) => (
    <Ionicons name="storefront-sharp" size={24} color="white" {...props} />
);