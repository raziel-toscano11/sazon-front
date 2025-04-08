import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

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

export const EditIcon = (props) => (
    <FontAwesome6 name="edit" size={24} color="white" {...props} />
);

export const DangerIcon = (props) => (
    <MaterialIcons name="dangerous" size={24} color="white" {...props} />
);