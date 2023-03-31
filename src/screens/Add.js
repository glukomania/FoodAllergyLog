import React, { useCallback, useState, useEffect } from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import moment from 'moment'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import Autocomplete from 'react-native-autocomplete-input'
import ToggleSwitch from 'toggle-switch-react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import foodList from '../../data.js'
import { reactionTypes } from '../../data.js'

export const Add = (props) => {
  const [date, setDate] = useState(moment().toISOString())
  const [reaction, setReaction] = useState(0)
  const [reactionType, setReactionType] = useState('Dermatological')
  const [isNew, setIsNew] = useState(false)
  const [text, setText] = useState('')
  const [foods, setFoods] = useState([])
  const [selectedDate, setSelectedDate] = useState()
  const [selectedTime, setSelectedTime] = useState()

  const handleSaving = useCallback(() => {
    // saving
    props.newReactionRecord(reaction, date, reactionType, isNew)
    foods.forEach((item) => props.newFoodRecord(item, date))

    setFoods([])
    setText('')
  }, [date, reaction, foods, props.newFoodRecord, props.newReactionRecord])

  const filterData = useCallback(
    (text) => {
      let data = []

      foodList.forEach((item, index) => {
        if (text.length > 0 && item.toLowerCase().includes(text.toLowerCase())) {
          data.push(item)
        }
      })
      return data.sort((a, b) => b.color - a.color)
    },
    [props.colors],
  )

  const renderTimePicker = useCallback(() => {
    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={new Date(date)}
        mode={'time'}
        key="time"
        is24Hour={true}
        onChange={(e, val) => {
          setSelectedTime(val)
        }}
      />
    )
  }, [date])

  const renderDayPicker = useCallback(() => {
    return (
      <DateTimePicker
        testID="dateTimePicker"
        key="date"
        value={new Date(date)}
        mode={'date'}
        onChange={(e, val) => {
          setSelectedDate(val)
        }}
      />
    )
  }, [date])

  const renderFoodList = (item) => {
    return <Text key={item}>{item}</Text>
  }

  const Separator = (text) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '10%' }}>
      <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
      <View>
        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 700, padding: '5%' }}>
          {text}
        </Text>
      </View>
      <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
    </View>
  )

  const renderReaction = () => {
    return (
      <View>
        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
          <View style={{ width: '40%', paddingTop: '4%' }}>
            <Text>Reaction type:</Text>
          </View>
          <View style={{ width: '60%', marginTop: '5%' }}>
            <RNPickerSelect
              onValueChange={(reactionType) => setReactionType(reactionType)}
              items={reactionTypes}
              placeholder={{
                label: reactionTypes[1].label,
                value: reactionTypes[1].label,
                color: 'orange',
              }}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
          <View style={{ width: '40%', paddingTop: '4%' }}>
            <Text>Severity:</Text>
          </View>
          <View style={{ width: '55%' }}>
            <MultiSlider
              onValuesChange={setReaction}
              sliderLength={155}
              min={0}
              max={10}
              step={1}
            />
          </View>
          <View style={{ width: '6%', paddingTop: '4%' }}>
            <Text>{reaction}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
          <View style={{ width: '40%', paddingTop: '4%' }}>
            <Text>New reaction:</Text>
          </View>
          <View style={{ width: '60%', alignItems: 'flex-end', marginTop: '2%' }}>
            <ToggleSwitch
              isOn={isNew}
              onColor="#ec9706"
              offColor="grey"
              labelStyle={{ color: 'black', fontWeight: '900' }}
              size="medium"
              onToggle={(value) => {
                setIsNew(value)
              }}
            />
          </View>
        </View>
      </View>
    )
  }

  const renderInput = () => {
    return (
      <View
        style={{
          width: '80%',
        }}
      >
        <Autocomplete
          value={text}
          placeholder={'Food name'}
          data={filterData(text)}
          onChangeText={(query) => setText(query)}
          autoCorrect={true}
          flatListProps={{
            keyExtractor: (_, idx) => idx,
            renderItem: ({ item }) => {
              return (
                <Pressable
                  onPress={() => handleItemPress(item)}
                  style={{ zIndex: 1, paddingBottom: '1%', paddingTop: '1%', elevation: 5 }}
                >
                  <Text key={item}>{item}</Text>
                </Pressable>
              )
            },
          }}
        />
      </View>
    )
  }

  const handleItemPress = (item) => {
    setText(item)
  }

  const handleAdd = () => {
    if (foodList.indexOf(text) > -1) {
      setFoods([...foods, text])
      setText('')
    }
  }

  useEffect(() => {
    setDate(moment(selectedDate).toISOString())
  }, [selectedDate])

  useEffect(() => {
    setDate(moment(selectedTime).toISOString())
  }, [selectedTime])

  return (
    <View
      style={{
        backgroundColor: '#f6f6f6',
        height: '100%',
        width: '100%',
      }}
    >
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <View
          style={{
            height: '6%',
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
          <View
            style={{
              paddingTop: '10%',
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {renderDayPicker()}

            {renderTimePicker()}
          </View>

          {Separator('Reaction')}
          {renderReaction()}
          {Separator('Food log')}
          <View style={{ flexDirection: 'row', marginTop: '10%', elevation: 5, zIndex: 10 }}>
            {renderInput()}
            <Pressable
              style={{
                marginLeft: '5%',
                backgroundColor: '#808000',
                borderRadius: '5',
                padding: '4%',
              }}
              onPress={handleAdd}
            >
              <Text style={{ color: 'white' }}>Add</Text>
            </Pressable>
          </View>
          <ScrollView behavior="padding" style={{ width: '100%' }}>
            <View
              style={{
                height: '30%',
                marginTop: '5%',
                marginBottom: '5%',
              }}
            >
              {foods.map(renderFoodList)}
            </View>
          </ScrollView>
          <Pressable onPress={handleSaving}>
            <Text
              style={{
                fontSize: 20,
                marginBottom: '5%',
                fontWeight: 700,
                color: '#ec9706',
              }}
            >
              Save
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Add
