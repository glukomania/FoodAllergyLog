import React, { useEffect, useState } from 'react'
// import React, { useEffect, useState } from 'react'
// import { Text, View } from 'react-native'
import Add from './src/screens/Add'
import Analysis from './src/screens/Analysis'
import Statistics from './src/screens/Statistics'
import Settings from './src/screens/Settings'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { View, useWindowDimensions } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('db.foodDb') // returns Database object

export default function App() {
  const [reactionData, setReactionData] = useState(null)
  const [foodData, setFoodData] = useState(null)
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'Add', title: 'Add' },
    { key: 'Statistics', title: 'Statistics' },
    { key: 'Analysis', title: 'Analysis' },
    { key: 'Settings', title: 'Settings' },
  ])

  // db.transaction((tx) => {
  //   tx.executeSql('DROP TABLE reaction')
  //   tx.executeSql('DROP TABLE foodlist')
  // })

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

  const AddScreen = () => (
    <Add newReactionRecord={newReactionRecord} newFoodRecord={newFoodRecord} />
  )
  const StatisticsScreen = () => <Statistics reactionData={reactionData} foodData={foodData} />
  const AnalysisScreen = () => <Analysis />
  const SettingsScreen = () => <Settings reactionData={reactionData} foodData={foodData} />

  const renderScene = SceneMap({
    Add: AddScreen,
    Statistics: StatisticsScreen,
    Analysis: AnalysisScreen,
    Settings: SettingsScreen,
  })
  useEffect(() => {
    console.log('--- App is started ---')
    fetchData()
  }, [])

  const renderTabBar = (props) => {
    console.log('props', props)
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'grey' }}
        style={{ backgroundColor: 'white', color: 'grey' }}
        renderIcon={({ route, focused, color }) => {
          let icon = ''
          switch (route.key) {
            case 'Add':
              icon = 'add-circle'
              break
            case 'Statistics':
              icon = 'analytics'
              break
            case 'Analysis':
              icon = 'cellular'
              break
            case 'Settings':
              icon = 'settings'
              break
          }
          return <Ionicons name={icon} size={25} color={focused ? '#808000' : 'black'} />
        }}
      />
    )
  }

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition={'bottom'}
      indicatorStyle={{ backgroundColor: 'black' }}
    />
  )
}
