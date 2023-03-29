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

  db.transaction((tx) => {
    tx.executeSql('DROP TABLE reaction')
    tx.executeSql('DROP TABLE foodlist')
  })

  // Check if the items table exists if not create it
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS foodlist (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, timestamp TEXT)',
    )
  })

  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS reaction (id INTEGER PRIMARY KEY AUTOINCREMENT, severity TEXT, timestamp TEXT, reactionType TEXT, isNew BOOL)',
    )
  })

  // event handler for new item creation
  const newFoodRecord = (name, timestamp) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO foodlist (name, timestamp) values (?, ?)',
        [name, timestamp],
        (txObj, resultSet) => {
          setFoodData(
            foodData.concat({
              id: resultSet.insertId,
              name: name,
              timestamp: timestamp,
            }),
          )
        },

        (txObj, error) => console.log('Error', error),
      )
    })
  }

  // event handler for new item creation
  const newReactionRecord = (severity, timestamp, reactionType, isNew) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO reaction (severity, timestamp, reactionType, isNew) values (?, ?, ?, ?)',
        [severity, timestamp, reactionType, isNew],
        (txObj, resultSet) =>
          setReactionData(
            reactionData.concat({
              id: resultSet.insertId,
              severity: severity,
              timestamp: timestamp,
              reactionType: reactionType,
              isNew: isNew,
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
        (txObj, { rows: { _array } }) => {
          setFoodData(_array)
        },
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

  useEffect(() => {
    console.log('--- App is started ---')
    fetchData()
  }, [])

  // useEffect(() => {
  //   console.log('App UE food', foodData)
  //   console.log('App UE reactionData', reactionData)
  // }, [foodData, reactionData])

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
          children={() => <Settings reactionData={reactionData} foodData={foodData} />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
