import { Text, StyleSheet, View, TouchableOpacity, } from 'react-native';
import React, { useState, useContext } from 'react';
import * as Device from 'expo-device';
import tw from "twrnc";
import FormInput from '../components/FormInput';
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const {isLoading, verifyUser, errorMessage} = useContext(UserContext);

  return (
    <View style={styles.container}>
      { !! errorMessage["other"] && 
        <View style={tw`bg-red-100 border border-red-500 px-4 py-3 mb-4 rounded relative`}>
          <Text style={tw`block sm:inline text-red-800`}>{ errorMessage["other"] }</Text>
        </View>
      }
      
      <FormInput placeholder={'Correo Electronico'} label={'Correo Electronico:'} onChangeText={(value) => setEmail(value)} />
      { errorMessage["email"] && <Text style={tw`mb-2 text-red-700 text-sm`}>*{errorMessage["email"]}</Text> }
      
      <FormInput placeholder={'Contraseña'} label={'Contraseña:'} secureTextEntry={true} onChangeText={(value) => setPassword(value)} />
      { errorMessage["password"] && <Text style={tw`mb-2 text-red-700 text-sm`}>*{errorMessage["password"]}</Text> }

      <br /><br />
      <TouchableOpacity onPress={()=>{ verifyUser(email, password,Device.modelName) }}>
        <View style={{ backgroundColor: 'steelblue', padding: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            Ingresar
          </Text>
        </View>
      </TouchableOpacity>

    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    padding: 8,
    margin: 15,
  },
})