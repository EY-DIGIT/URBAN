import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoaderScreen from "../screens/Auth/LoaderScreen";
import LoginScreen from "../screens/Auth/LoginScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Loader">
      <Stack.Screen name="Loader" component={LoaderScreen} />
      <Stack.Screen name="Login" component={LoginScreen} options={{gestureEnabled: false}}/> 
    </Stack.Navigator>
  );
};

export default AppNavigator;









   
