//componente de input group para reutilizar el mismo formato de input
import { StyleSheet, TextInput, View, Text } from 'react-native'
import React from 'react'

const FormInput = (parameter) => {
  return (
    <View style={styles.FormGroup}>
      <Text style={styles.label}>{parameter.label}</Text>
      <TextInput {...parameter} style={styles.input} />
    </View>
  )
}

export default FormInput

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
    },
    FormGroup:{
      margin: 8
    }
})