import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Add from './src/screens/Add'
import Analysis from './src/screens/Analysis'
import Statistics from './src/screens/Statistics'
import Settings from './src/screens/Settings'

import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('db.foodDb') // returns Database object

const Tab = createBottomTabNavigator()

export default function App() {
  const [reactionData, setReactionData] = useState(null)
  const [foodData, setFoodData] = useState(null)

  // db.transaction((tx) => {
  //   tx.executeSql('DROP TABLE recordlist')
  // })

  // Check if the items table exists if not create it
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS foodlist (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT, timestamp TEXT)',
    )
  })

  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS reaction (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT, timestamp TEXT, notes TEXT)',
    )
  })

  // event handler for new item creation
  const newFoodRecord = (name, timestamp) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO foodlist (value, timestamp) values (?, ?)',
        [name, timestamp],
        (txObj, resultSet) =>
          setData(
            data.concat({
              id: resultSet.insertId,
              value: name,
              timestamp: timestamp,
            }),
          ),
        (txObj, error) => console.log('Error', error),
      )
    })
  }

  // event handler for new item creation
  const newReactionRecord = (value, timestamp) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO reaction (value, timestamp) values (?, ?)',
        [value, timestamp],
        (txObj, resultSet) =>
          setData(
            data.concat({
              id: resultSet.insertId,
              value: value,
              timestamp: timestamp,
            }),
          ),
        (txObj, error) => console.log('Error', error),
      )
    })
  }

  const fetchData = () => {
    db.transaction((tx) => {
      // sending 4 arguments in executeSql
      tx.executeSql(
        'SELECT * FROM foodlist',
        null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => setFoodData(_array),
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log('Error ', error),
      )
    })

    db.transaction((tx) => {
      // sending 4 arguments in executeSql
      tx.executeSql(
        'SELECT * FROM reaction',
        null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => setReactionData(_array),
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log('Error ', error),
      )
    })
  }

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
          tabBarActiveTintColor: '#808000',
          tabBarInactiveTintColor: '#cccc99',
        })}
      >
        <Tab.Screen
          options={{ headerShown: false }}
          name="Add"
          children={() => (
            <Add newReactionRecord={newReactionRecord} newFoodRecord={newFoodRecord} />
          )}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Statistics"
          children={() => <Statistics reactionData={reactionData} foodData={foodData} />}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Analysis"
          children={() => <Analysis />}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Settings"
          children={() => <Settings fetchData={fetchData} />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
