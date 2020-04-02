import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import imoveis from './pages/Imoveis';
import Detail from './pages/detail';

export default function Routes(){
    return(
        <NavigationContainer>

            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="imoveis" component={imoveis}/>
                <AppStack.Screen name="Details" component={Detail}/>
            </AppStack.Navigator>
        
        </NavigationContainer>
    );
}