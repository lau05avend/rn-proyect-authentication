import { Text, View, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormInput from "../components/FormInput";
import tw from "twrnc";
import { UserContext } from "../context/UserContext";

const URI = "http://localhost:8000/api";

const Profile = () => {

  const {isLoading, user} = useContext(UserContext);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  //metodo para editar perfil en la bd
  const editProfile = async () => {
    await axios.put(`${URI}/${user.id}/profile/edit`,{
          name: name,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        },
        { headers: { Authorization: `Bearer ${user.access_token}` } }
      )
      .then((response) => {
        let userResponse = response.data;
        let userInfo = { ...userResponse, access_token: user.access_token };
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        alert("Perfil actualizado correctamente!");
        navigation.navigate("Home");
      })
      .catch((err) => {
        if (err.response.data.msg) {
          setErrorMessage({ other: err.response.data.msg });
        } else {
          const responseErrors = err.response.data.errors;
          setErrorMessage(responseErrors);
        }
      });
  };

  return (
    <View>
      <br />

      <FormInput
        placeholder={"Nombre Completo"}
        label={"Nombre Completo:"}
        value={name}
        onChangeText={(value) => setName(value)}/>
      { errorMessage.name && <Text style={tw`mb-2 text-red-700 text-sm`} >*{errorMessage.name}</Text> }

      <FormInput
        placeholder={"Correo Electronico"}
        label={"Correo Electronico:"}
        value={email}
        onChangeText={(value) => setEmail(value)}/>
      {errorMessage.email && <Text style={tw`mb-2 text-red-700 text-sm`} >*{errorMessage.email}</Text>}

      <FormInput placeholder={'Contraseña'} label={'Contraseña:'} secureTextEntry={true} onChangeText={(value) => setPassword(value)} />
      { errorMessage.password && <Text style={tw`mb-2 text-red-700 text-sm`} >*{errorMessage.password}</Text> }

      <FormInput placeholder={'Confirmar Contraseña'} label={'Confirmar Contraseña:'} secureTextEntry={true} onChangeText={(value) => setConfirmPassword(value)} />

      <br /><br />
      <TouchableOpacity onPress={editProfile}>
        <View style={{ backgroundColor: 'blue', padding: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            Editar Perfil
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

