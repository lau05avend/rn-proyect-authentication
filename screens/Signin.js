import { Text, StyleSheet, View, TouchableOpacity, } from 'react-native';
import React, { useState, useContext } from 'react';
import FormInput from '../components/FormInput';
import tw from "twrnc";
import { UserContext } from "../context/UserContext";

const Signin = () => {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const {isLoading, storeUser, errorMessage} = useContext(UserContext);

  return (
    <View style={styles.container}>
      <FormInput placeholder={'Nombre Completo'} label={'Nombre Completo:'} onChangeText={(value) => setName(value)} />
      { errorMessage.name && <Text style={tw`mb-2 text-red-700 text-sm`} >*{errorMessage.name}</Text> }

      <FormInput placeholder={'Correo Electronico'} label={'Correo Electronico:'} onChangeText={(value) => setEmail(value)} />
      { errorMessage.email && <Text style={tw`mb-2 text-red-700 text-sm`} >*{errorMessage.email}</Text> }

      <FormInput placeholder={'Contraseña'} label={'Contraseña:'} secureTextEntry={true} onChangeText={(value) => setPassword(value)} />
      { errorMessage.password && <Text style={tw`mb-2 text-red-700 text-sm`} >*{errorMessage.password}</Text> }
      <FormInput placeholder={'Confirmar Contraseña'} label={'Confirmar Contraseña:'} secureTextEntry={true} onChangeText={(value) => setConfirmPassword(value)} />

      <br /><br />

      <TouchableOpacity onPress={()=>{ storeUser(name, email, password,confirmPassword) } }>
        <View style={{ backgroundColor: 'steelblue', padding: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            Guardar
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    margin: 15,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
  },
});

