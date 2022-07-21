import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import RoutesStack from './routes/RoutesStack';
import { UserProvider } from './context/UserContext';

export default function App() {

  const [isLoading, setIsLoading] = React.useState(true);

  //mostrar Loading animation cada vez que se renderice la app
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    },500);
  }, []);

  if( isLoading ) {
    return (
      <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#06bcee'}}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <UserProvider>
      <NavigationContainer>
        <RoutesStack />
      </NavigationContainer>
    </UserProvider>
    
  );
}

