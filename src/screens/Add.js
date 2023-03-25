import React, { useCallback, useState } from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import Autocomplete from 'react-native-autocomplete-input'

export const Add = (props) => {
  const [date, setDate] = useState(moment().format('DD.MM.YYYY'))
  const [reaction, setReaction] = useState(0)
  const [text, setText] = useState('')
  const [foods, setFoods] = useState(['кофе', 'лук'])

  const displayDate = useCallback(() => {
    console.log('date', date)
    const today = moment()
    console.log('today: ', today)
    const isToday = moment(date, 'DD.MM.YYYY').isSame(today, 'day')
    console.log('isToday: ', isToday)

    return '  ' + (isToday ? 'Today' : date) + '  '
  }, [date])

  const handleSending = useCallback(() => {
    const res = {
      date,
    }

    // sending
    console.log('res', res)
  }, [date])

  const renderDayPicker = () => {
    return (
      <View
        style={{
          paddingTop: '7%',
          paddingBottom: '7%',
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Pressable
          onPress={() => {
            console.log('press back')
            onArrowPress('back')
          }}
        >
          <Ionicons name={'caret-back-outline'} size={25} color={'black'} />
        </Pressable>
        <Text style={{ fontSize: 20 }}>{displayDate()}</Text>
        <Pressable
          onPress={() => {
            console.log('press forward')
            onArrowPress('forward')
          }}
          disabled={moment(date, 'DD.MM.YYYY').isSame(moment(), 'day')}
        >
          <Ionicons name={'caret-forward-outline'} size={25} color={'black'} />
        </Pressable>
      </View>
    )
  }

  const filterData = useCallback(
    (text) => {
      let data = []
      foods.forEach((item, index) => {
        if (text.length > 1 && item.includes(text.toLowerCase())) {
          const newKey = item + index
          data.push({
            id: itemOfData.key,
            key: newKey,
            word: item,
          })
        }
      })
      return data.sort((a, b) => b.color - a.color)
    },
    [props.colors],
  )

  const renderFoodList = (item) => {
    return <Text>{item}</Text>
  }

  return (
    <View
      style={{
        backgroundColor: '#f6f6f6',
        height: '100%',
        width: '100%',
      }}
    >
      <View
        style={{
          height: '5%',
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      <View
        style={{
          height: '78%',
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingLeft: '10%',
          paddingRight: '10%',
        }}
      >
        {renderDayPicker()}

        <MultiSlider onValuesChange={setReaction} sliderLength={300} min={0} max={11} step={1} />
        <Text>{reaction}</Text>

        <View style={{ flexDirection: 'row', marginTop: '10%' }}>
          <View style={{ width: '80%' }}>
            <Autocomplete
              style={{ paddingLeft: '5%' }}
              // inputContainerStyle={styles.input}
              // containerStyle={styles.containerStyle}
              placeholder={'food name'}
              defaultValue={text}
              data={filterData(text)}
              onChangeText={setText}
              autoCorrect={false}
              // listStyle={styles.results}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setText(``)
                    }}
                  >
                    <Text key={item.word}>{item.word}</Text>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
          <Pressable
            style={{
              marginLeft: '5%',
              backgroundColor: '#808000',
              borderRadius: '5',
              padding: '4%',
            }}
            onPress={() => {
              setFoods([...foods, text])
              setText('')
            }}
          >
            <Text>Add</Text>
          </Pressable>
        </View>

        <ScrollView style={{ height: '30%', marginTop: '5%', marginBottom: '5%' }}>
          {foods.map(renderFoodList)}
        </ScrollView>

        <Pressable onPress={handleSending}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: '5%',
              fontWeight: 700,
              color: '#ec9706',
            }}
          >
            Send
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Add
