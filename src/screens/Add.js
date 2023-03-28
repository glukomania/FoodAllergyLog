import React, { useCallback, useState } from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import Autocomplete from 'react-native-autocomplete-input'
import ToggleSwitch from 'toggle-switch-react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const Add = (props) => {
  const [date, setDate] = useState(moment().toISOString())
  const [reaction, setReaction] = useState(0)
  const [reactionType, setReactionType] = useState('Dermatological')
  const [isNew, setIsNew] = useState(false)
  const [text, setText] = useState('')
  const [foods, setFoods] = useState([])

  const reactionTypes = [
    {
      value: 'Oral',
      label: 'Oral',
    },
    {
      value: 'Dermatological',
      label: 'Dermatological',
    },
    {
      value: 'Respiratory',
      label: 'Respiratory',
    },
    {
      value: 'Gastrological',
      label: 'Gastrological',
    },
    {
      value: 'Neurological',
      label: 'Neurological',
    },
  ]

  const handleSaving = useCallback(() => {
    const res = {
      date,
    }
    props.newReactionRecord(reaction, date, reactionType, isNew)
    foods.map((item) => props.newFoodRecord(item, date))

    // sending
    setFoods([])
    setText('')
  }, [date, reaction, foods, props.newFoodRecord, props.newReactionRecord])

  const renderDayPicker = () => {
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate
      setDate(currentDate)
    }

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
        {
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(date)}
            mode={'time'}
            is24Hour={true}
            onChange={(val) => {
              setDate(moment(val).toISOString())
            }}
          />
        }
      </View>
    )
  }

  const filterData = useCallback(
    (text) => {
      let data = []

      let food = [
        'Almond',
        'Apple',
        'Apricot',
        'Artichoke',
        'Asparagus',
        'Avocado',
        'Bamboo shoot',
        'Banana',
        'Barley',
        'Bean',
        'Blackberry',
        'Black-eyed bean',
        'Blueberry',
        'Bonito',
        'Broad bean',
        'Broccoli',
        'Brussels sprouts',
        'Buckwheat',
        'Burdock',
        'Butter',
        'Butter bean',
        'Buttermilk',
        'Button mushroom',
        'Cabbage',
        'Cacao bean',
        'Canola oil',
        'Carrot',
        'Casein',
        'Cauliflower',
        'Celery',
        'Cheese',
        'Cherry',
        'Chestnut',
        'Chicken',
        'Chicory',
        'Chinese cabbage',
        'Coconut oil',
        'Coffee bean',
        'Corn',
        'Corn oil',
        'Cotton seed',
        'Cranberry',
        'Cream',
        'Crustaceans',
        'Cucumber',
        'Custard',
        'Date',
        'Deer',
        'Duck',
        'Eel',
        'Egg plant',
        'Endive',
        'Fructose',
        'Garlic',
        'Ghrkin',
        'Ginger',
        'Ginkgo nut',
        'Globfish',
        'Glucose',
        'Goat',
        'Grape',
        'Grapefruit',
        'Grapeseed oil',
        'Green soybean',
        'Groundnut oil',
        'Guava',
        'Honey',
        'Hop',
        'Horse',
        'Horse Mackerel',
        'Horseradish',
        'Huckleberry',
        'Ice cream',
        'Japanese pear',
        'Japanese persimmon',
        'Japanese plum',
        'Kale',
        'Kidney bean',
        'Kiwi',
        'Konjac',
        'Kyona',
        'Lactose',
        'Leek',
        'Lemon',
        'Lentil',
        'Lettuce',
        'Lima bean',
        'Lime',
        'Loquat',
        'Mackerel',
        'Makuwauri  melon',
        'Mango',
        'Melon',
        'Mineral water',
        'Mitsuba',
        'Mume plum',
        'Mustard oil',
        'Mustard Spinach',
        'Nectarine',
        'Nira',
        'Okra',
        'Olive oil',
        'Onion',
        'Orange',
        'Orange pulp',
        'Papaya',
        'Parsley',
        'Parsnip',
        'Passion fruit',
        'Peach',
        'Peanut',
        'Pear',
        'Peas',
        'Pecan',
        'Pegia',
        'Peppermint',
        'Percifomes',
        'Pineapple',
        'Popcorn',
        'Potato',
        'Prune',
        'Pumpkin',
        'Qing-geng-cai',
        'Quince',
        'Radish leaf',
        'Radish root',
        'Rapeseed',
        'Raspberry',
        'Rice',
        'Ricebran oil',
        'Royal Jelly',
        'Rye',
        'Safflower seed',
        'Salmon',
        'Salsify',
        'Sansho',
        'Sea Bass',
        'Sea Bream',
        'Sesame seed',
        'Shallot',
        'Sheep',
        'Shelled mollusc',
        'Shiitake  mushroom',
        'Shungiku',
        'Sour cream',
        'Soybean',
        'Spearmint',
        'Spinach',
        'Squash',
        'Strawberry',
        'Sugar',
        'Sugar beet',
        'Sugarcane',
        'Sultani',
        'Sultapya',
        'Sunflower oil',
        'Sunflower seed',
        'Sweet corn',
        'Sweet Pepper',
        'Sweet potato',
        'Taro',
        'Tea',
        'Tetraodontiformes',
        'Tomato',
        'Trout',
        'Tuna',
        'Turkey',
        'Turnip leaf',
        'Turnip root',
        'Vegetable oil',
        'Walnut',
        'Water melon',
        'Watercress',
        'Welsh',
        'Wheat',
        'Whey',
        'White bean',
        'Yam',
        'Yogurt',
        'Tangerine',
        'Zucchini',
        'Hen eggs',
        'Quail eggs',
        'Poppy seed',
        'Hazelnut',
        'Non-gluten flour',
        'Mustard',
        'Herb',
        'Beef',
        'Pork',
        'Rabbit',
        'Cashew',
        'Gluten flour',
        'Pistachios',
        'Brazilian nut',
        'Sea fish',
        'Cow milk',
        'Freshwater fish',
        'Goat milk',
        'Sheep milk',
        'Chickpeas',
      ]
      food.forEach((item, index) => {
        if (text.length > 0 && item.toLowerCase().includes(text.toLowerCase())) {
          data.push(item)
        }
      })
      return data.sort((a, b) => b.color - a.color)
    },
    [props.colors],
  )

  const renderFoodList = (item) => {
    return <Text key={'item'}>{item}</Text>
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

  const handleItemPress = (item) => {
    setText(item)
  }

  return (
    <View
      style={{
        backgroundColor: '#f6f6f6',
        height: '100%',
        width: '100%',
      }}
    >
      <KeyboardAwareScrollView
        innerRef={(ref) => (this.scrollView = ref)} //... Access the ref for any other functions here
        contentContainerStyle={{ flex: 1 }}
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

          {Separator('Reaction')}

          {renderReaction()}

          {Separator('Food log')}

          <View style={{ flexDirection: 'row', marginTop: '10%', elevation: 5, zIndex: 10 }}>
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
                        style={{ zIndex: 1, backgroundColor: 'red', elevation: 5 }}
                      >
                        <Text key={item}>{item}</Text>
                      </Pressable>
                    )
                  },
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
