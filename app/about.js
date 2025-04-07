import { Stack } from "expo-router";
import { Screen } from "../components/Screen";
import { ScrollView, Text } from "react-native";

export default function About() {
    return (
        <Screen>
            <Stack.Screen 
                options={{
                    headerStyle: {backgroundColor: "#ffee00"},
                    headerTintColor: "black",
                    headerTitle: "Acerca de nosotros",
                    headerLeft: () => {},
                    headerRight: () => {},
                }}
            />
            <ScrollView>
            <Text className="text-white font-bold mb-8 text-2xl">La Tienda del Sazon</Text>
            <Text className="text-white text-xl">
            Mas de 40 años poniendo sazón a las familias oaxaqueñas
            </Text>
            <Text className="text-white mb-4"> 
                Lorem ipsum dolor sit amet, consectetur adipiscing   elit. Etiam ac arcu imperdiet, feugiat metus at, mattis erat. Donec dignissim sapien ac euismod blandit. Duis interdum efficitur quam, ut interdum orci dignissim vitae. Praesent non diam vel mi venenatis malesuada quis ac purus. Nunc eu lacinia sem, in scelerisque tortor. Nunc facilisis nibh vel suscipit dictum. Quisque ullamcorper congue eros, vitae hendrerit nisl consequat nec. Ut at nunc at tellus bibendum euismod eu nec augue. 
            </Text>
            <Text className="text-white mb-4"> 
                Lorem ipsum dolor sit amet, consectetur adipiscing   elit. Etiam ac arcu imperdiet, feugiat metus at, mattis erat. Donec dignissim sapien ac euismod blandit. Duis interdum efficitur quam, ut interdum orci dignissim vitae. Praesent non diam vel mi venenatis malesuada quis ac purus. Nunc eu lacinia sem, in scelerisque tortor. Nunc facilisis nibh vel suscipit dictum. Quisque ullamcorper congue eros, vitae hendrerit nisl consequat nec. Ut at nunc at tellus bibendum euismod eu nec augue. 
            </Text>
            <Text className="text-white mb-4"> 
                Lorem ipsum dolor sit amet, consectetur adipiscing   elit. Etiam ac arcu imperdiet, feugiat metus at, mattis erat. Donec dignissim sapien ac euismod blandit. Duis interdum efficitur quam, ut interdum orci dignissim vitae. Praesent non diam vel mi venenatis malesuada quis ac purus. Nunc eu lacinia sem, in scelerisque tortor. Nunc facilisis nibh vel suscipit dictum. Quisque ullamcorper congue eros, vitae hendrerit nisl consequat nec. Ut at nunc at tellus bibendum euismod eu nec augue. 
            </Text>
            <Text className="text-white mb-4"> 
                Lorem ipsum dolor sit amet, consectetur adipiscing   elit. Etiam ac arcu imperdiet, feugiat metus at, mattis erat. Donec dignissim sapien ac euismod blandit. Duis interdum efficitur quam, ut interdum orci dignissim vitae. Praesent non diam vel mi venenatis malesuada quis ac purus. Nunc eu lacinia sem, in scelerisque tortor. Nunc facilisis nibh vel suscipit dictum. Quisque ullamcorper congue eros, vitae hendrerit nisl consequat nec. Ut at nunc at tellus bibendum euismod eu nec augue. 
            </Text>
            <Text className="text-white mb-4"> 
                Lorem ipsum dolor sit amet, consectetur adipiscing   elit. Etiam ac arcu imperdiet, feugiat metus at, mattis erat. Donec dignissim sapien ac euismod blandit. Duis interdum efficitur quam, ut interdum orci dignissim vitae. Praesent non diam vel mi venenatis malesuada quis ac purus. Nunc eu lacinia sem, in scelerisque tortor. Nunc facilisis nibh vel suscipit dictum. Quisque ullamcorper congue eros, vitae hendrerit nisl consequat nec. Ut at nunc at tellus bibendum euismod eu nec augue. 
            </Text>
            <Text className="text-white mb-4"> 
                Lorem ipsum dolor sit amet, consectetur adipiscing   elit. Etiam ac arcu imperdiet, feugiat metus at, mattis erat. Donec dignissim sapien ac euismod blandit. Duis interdum efficitur quam, ut interdum orci dignissim vitae. Praesent non diam vel mi venenatis malesuada quis ac purus. Nunc eu lacinia sem, in scelerisque tortor. Nunc facilisis nibh vel suscipit dictum. Quisque ullamcorper congue eros, vitae hendrerit nisl consequat nec. Ut at nunc at tellus bibendum euismod eu nec augue. 
            </Text>
            </ScrollView>
        </Screen>
    );
}