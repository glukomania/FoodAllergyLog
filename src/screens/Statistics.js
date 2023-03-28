import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

export const Statistics = (props) => {
  useEffect(() => {
    console.log('reactions: ', props.reactionData)
    console.log('foods: ', props.foodData)
  })
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Statistics</Text>
    </View>
  )
}

export default Statistics
