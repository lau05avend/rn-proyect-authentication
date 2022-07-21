//context para autenticacion con variables globales 
import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({children}) => {
    
    const URI = "http://localhost:8000/api";

    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({})

    //registrar usuario
    const storeUser = (name, email, password,password_confirmation) => {
        setIsLoading(true);
        
        axios.post(`${URI}/signin`, {
          name: name, 
          email: email, 
          password: password,
          password_confirmation: password_confirmation})
        .then(response => { 
            let userInfo = response.data;
            setUser(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            alert("Usuario registrado exitosamente.")
            setIsLoading(false);
            navigation.navigate("Home")
        })
        .catch(err => { 
            const responseErrors = err.response.data.errors;
            setErrorMessage(responseErrors)
            setIsLoading(false);
        });
    }

    //login usuario
    const verifyUser = (email,password, modelName) => {
        setIsLoading(true);
        
        axios.post(`${URI}/login`, {
          email: email, 
          password: password,
          devicename: modelName
        })
        .then(response => { 
            let userResponse = response.data.user;
            let userInfo = {...userResponse, access_token: response.data.token};

            setUser(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            alert('Usuario logueado correctamente.');
            setIsLoading(false);
            navigation.navigate("Home");
        })
        .catch(err => { 
            if(err.response.data.msg){
                setErrorMessage({ other: err.response.data.msg });
            }
            else{
                const responseErrors = err.response.data.errors;
                setErrorMessage(responseErrors);
            }
            setIsLoading(false);
          })
    }

    //logout usuario
    const logout = () => {
        setIsLoading(true);

        axios.get(`${URI}/logout`,{
            headers: {Authorization: `Bearer ${user.access_token}`},
        },)
        .then(response => {
            alert("Cerrando sesión...")
            AsyncStorage.removeItem('userInfo');
            setUser({});
            setIsLoading(false);
        })
        .catch(e => {
            console.log(`logout error ${e}`);
            setIsLoading(false);
        });
    };

    //verificar si esta logueado o no
    const isLoggedIn = async () => {
        try {
          setIsLoading(true);
    
          let userInfo = await AsyncStorage.getItem('userInfo');
          userInfo = JSON.parse(userInfo);
        //   console.log(userInfo);
          if (userInfo) {
            setUser(userInfo);
          }
    
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
          console.log(`error isLoggedIn ${e}`);
        }
    };

    //find usuario logueado
    const getUser = () => { //revisar
        setIsLoading(true);

        axios.get(`${URI}/${user.id}/profile`, {
            headers: { Authorization: `Bearer ${user.access_token}` },
        })
        .then((response) => {
            setUser(response.data);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setIsLoading(false);
        });
    };
    
    //verificar si esta logueado cada vez que se renderiza
    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <UserContext.Provider value={{
                isLoading,
                user,
                errorMessage,
                setErrorMessage,
                storeUser,
                verifyUser,
                logout,
                getUser,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext,UserProvider};

