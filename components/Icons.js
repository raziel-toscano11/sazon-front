import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
    <MaterialIcons name="add-circle-outline" size={24} color="white" {...props} />
);