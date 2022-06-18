import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {icons, images, COLORS, SIZES, FONTS} from '../../constants';
import HomeIcon from 'react-native-vector-icons/SimpleLineIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {AppParamList} from '../../routes/AppNavigation/AppParamList';
import {BottomTabParamList} from '../../routes/BottomTabNavigation/BottomTabParamList';
import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';

// export interface props {
//     title : string
// }

type headerNavProp = BottomTabNavigationProp<BottomTabParamList, 'FindVFD'>;

export const Header: React.FunctionComponent = () => {
  const navigation = useNavigation<headerNavProp>();
  return (
    <SafeAreaView style={styles.headerMain}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Hitachi VFD</Text>
      </View>
      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate('FindVFD');
        }}
        style={styles.iconContainer}>
        <HomeIcon name="home" size={24} color={COLORS.white} />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerMain: {
    height: Platform.OS === 'android' ? '8%' : '12%',
    flexDirection: 'row',
    backgroundColor: COLORS.vfdRed,
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {justifyContent: 'center', alignItems: 'center'},
  titleText: {
    fontSize: SIZES.navTitle,
    color: COLORS.white,
  },
});
