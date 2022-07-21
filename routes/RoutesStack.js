// componente para la navegacion de la app
import { View, Text , Button } from 'react-native';
import React, {useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Signin from '../screens/Signin';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import { UserContext } from "../context/UserContext"

const Stack = createNativeStackNavigator();

const RoutesStack = () => {
  const {user,logout} = useContext(UserContext);

  return (
    <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgb(245,158,11)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen initialRouteName="Home"
          name="Home"
          component={Home}
          options={{ title: 'Inicio',  headerRight: () => (
            user.access_token && (
              <View style={{ paddingRight:'10px' }}>
                <Button color="rgb(136,19,55)" title="Salir"
                  onPress={ () => logout() }
                />
              </View>
            )
          ), }}
        />
        {!user.access_token ? (
          <>
            <Stack.Screen name="Login" component={Login} options={{ title: 'Ingresar' }} />
            <Stack.Screen name="Signin" component={Signin} options={{ title: 'Registrarse' }} />
          </>
        ):(
          <>
            <Stack.Screen name="Profile" component={Profile} options={{ title: 'Perfil' }} />
          </>
        )}
    </Stack.Navigator>
  )
}

export default RoutesStack
