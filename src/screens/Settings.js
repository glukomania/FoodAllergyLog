import React, { useState } from 'react'
import { View, Text, TextInput, SafeAreaView, StyleSheet, Button } from 'react-native'
import qs from 'qs'
import { Linking } from 'react-native'

export async function sendEmail(to, subject, body) {
  let url = `mailto:${to}`

  // Create email link query
  const query = qs.stringify({
    subject: subject,
    body: body,
  })

  if (query.length) {
    url += `?${query}`
  }

  // check if we can use this link
  const canOpen = await Linking.canOpenURL(url)

  if (!canOpen) {
    throw new Error('Provided URL can not be handled')
  }

  return Linking.openURL(url)
}

export const Settings = (props) => {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')

  const handleSend = () => {
    sendEmail(
      email,
      subject,
      'reactionData: ' +
        JSON.stringify(props.reactionData) +
        '   foodData: ' +
        JSON.stringify(props.foodData),
    ).then(() => {
      console.log('Your message was successfully sent!')
    })
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Send json by email</Text>

      <SafeAreaView style={{ width: '70%' }}>
        <TextInput
          placeholder={'email'}
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          onChangeText={setSubject}
          value={subject}
          placeholder="subject"
        />
        <Button title={'Send'} color={'orange'} onPress={handleSend} />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})

export default Settings
