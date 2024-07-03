import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Tarjeta(props: any) {

    console.log(props.data)
  return (
    <View>
      <Text>{props.data.name}</Text>
      <Text>{props.data.email}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})