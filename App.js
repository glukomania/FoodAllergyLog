import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Add from './src/screens/Add'
import Analysis from './src/screens/Analysis'
import Statistics from './src/screens/Statistics'
import Settings from './src/screens/Settings'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Add') {
              iconName = 'add-circle'
            } else if (route.name === 'Statistics') {
              iconName = 'analytics'
            } else if (route.name === 'Analysis') {
              iconName = 'cellular'
            } else if (route.name === 'Settings') {
              iconName = 'settings'
            }
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: '#ec9706',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen options={{ headerShown: false }} name="Add" children={() => <Add />} />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Statistics"
          children={() => <Statistics />}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Analysis"
          children={() => <Analysis />}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Settings"
          children={() => <Settings />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
