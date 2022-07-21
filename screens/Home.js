import { Text, StyleSheet, View, Button } from "react-native";
import React, { useEffect, useContext } from "react";
import tw from "twrnc";
import { UserContext } from "../context/UserContext";

const Home = ({ navigation }) => {

  const {user, setErrorMessage} = useContext(UserContext);

  //resetea los mensajes de error cada vez que se cambia de pagina
  useEffect(() => {
    const resetMessages = navigation.addListener("focus", () => {
      setErrorMessage({});
    });
    return resetMessages;
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: "center", height: "100%"}}>
      <Text style={ tw`my-7 text-2xl font-bold` } >¡Bienvenid@, {user.access_token?( user.name):("Registrate")}!</Text>
      <View style={ styles.menu }>

      {!user.access_token ? (
        <>
          <Button color={'steelblue'}  title="Ingresar" 
            onPress={() => navigation.navigate("Login") } />
          <Button color={'steelblue'} title="Registrarse"
            onPress={() => navigation.navigate("Signin")}/>
        </>
      ) : (
        <>
          <Button color={'steelblue'}  title="Perfil" 
            onPress={() => navigation.navigate("Profile")} />
        </>
      )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  menu:{
    justifyContent: "space-around",
    width: "100%",
    height: "200px",
    paddingHorizontal: "35px",
    marginVertical: "5px"
  }
});








