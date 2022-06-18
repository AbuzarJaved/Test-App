import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {icons, images, SIZES, COLORS, FONTS} from '../../constants';
import BottomTabs from '../BottomTabNavigation/BottomTabs';
import {AppParamList} from '../AppNavigation/AppParamList';
import { CreateList } from '../../screens';

const AppStack = createNativeStackNavigator<AppParamList>();

const AppNavigation = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name="Main" component={BottomTabs} />
      <AppStack.Screen name="create" component={CreateList} />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
