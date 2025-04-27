import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AdminNavigator } from './src/navigation/AdminNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ShopScreen } from './src/screens/ShopScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen 
            name="Shop" 
            component={ShopScreen}
          />
          <Stack.Screen 
            name="Admin" 
            component={AdminNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
} 