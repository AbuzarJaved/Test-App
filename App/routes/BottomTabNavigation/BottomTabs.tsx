import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {icons, images, SIZES, COLORS, FONTS} from '../../constants';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {isIphoneX} from 'react-native-iphone-x-helper';
import Svg, {Path} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {FindVFD, Registration, Guides, Videos, FAQs, Home, AllList} from '../../screens';
import {BottomTabParamList} from '../BottomTabNavigation/BottomTabParamList';

const RootTab = createBottomTabNavigator<BottomTabParamList>();

const TabBarCustomButton: React.FunctionComponent<any> = ({
  accessibilityState,
  children,
  onPress,
}) => {
  var isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: COLORS.white,
        }}>
        <View style={{flexDirection: 'row', position: 'absolute', top: 0}}>
          <View style={{flex: 1, backgroundColor: COLORS.white}}></View>
          <Svg width={70} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.white}
            />
          </Svg>
          <View style={{flex: 1, backgroundColor: COLORS.white}}></View>
        </View>

        <TouchableOpacity
          style={{
            top: -10.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.vfdRed,
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 60,
          backgroundColor: COLORS.white,
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar: React.FunctionComponent<any> = props => {
  if (isIphoneX()) {
    return (
      <View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            backgroundColor: COLORS.white,
          }}></View>
        <BottomTabBar {...props.props} />
      </View>
    );
  } else {
    return <BottomTabBar {...props.props} />;
  }
};

const BottomTabNavigation = () => {
  return (
    <RootTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          // borderTopWidth: 0,
          // elevation: 0,
          backgroundColor: COLORS.white,
        },
      }}
      tabBar={props => <CustomTabBar props={props} />}>
      <RootTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon name="home" size={22} color={COLORS.white} />
            ) : (
              <Icon name="home" size={22} />
            ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
      <RootTab.Screen
        name="alllist"
        component={AllList}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon name="list" size={22} color={COLORS.white} />
            ) : (
              <Icon name="list" size={22} />
            ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
      {/* <RootTab.Screen
        name="Registration"
        component={Registration}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <AntIcon name="form" size={22} color={COLORS.white} />
            ) : (
              <AntIcon name="form" size={22} />
            ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
      <RootTab.Screen
        name="FAQs"
        component={FAQs}
        options={{
          tabBarIcon: ({focused}) =>
            // <AntIcon name="questioncircleo" size={20} />
            focused ? (
              <AntIcon name="questioncircleo" size={22} color={COLORS.white} />
            ) : (
              <AntIcon name="questioncircleo" size={22} />
            ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
      <RootTab.Screen
        name="Videos"
        component={Videos}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon name="video" size={22} color={COLORS.white} />
            ) : (
              <Icon name="video" size={22} />
            ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      /> */}
    </RootTab.Navigator>
  );
};

export default BottomTabNavigation;