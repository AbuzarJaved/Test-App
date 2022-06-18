import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {icons, images, COLORS, SIZES, FONTS} from '../../constants';
import Icon from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Home = ({navigation}) => {
  const isFocused = useIsFocused();
  const [list, setLists] = useState(['']);
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  useEffect(() => {
    getLists();
  }, [isFocused]);

  const getLists = async () => {
    let allLists = await AsyncStorage.getItem('List');
    setLists(JSON.parse(allLists));
  };

  const handleDelete = async () => {
    await AsyncStorage.removeItem('List');
  };

  const leftSwipe = (progress, dragX, item) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity
        style={styles.deleteBox}
        onPress={handleDelete}
        activeOpacity={0.6}>
        <Animated.Text
          style={{
            transform: [{scale: scale}],
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 14,
          }}>
          Delete
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    return (
      <Swipeable renderLeftActions={leftSwipe}>
        <View style={styles.item}>
          <Text style={styles.title}>{item}</Text>
        </View>
      </Swipeable>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Grocery List</Text>
      </View>
      <View style={{flex: 0.9}}>
        <FlatList
          data={list}
          renderItem={renderItem}
          // keyExtractor={item => item.id}
        />
      </View>
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingRight: 10,
        }}>
        <TouchableOpacity
          style={styles.fabbutton}
          onPress={() => {
            navigation.navigate('create');
          }}>
          <Icon name="plus" size={22} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    height: '8%',
    justifyContent: 'center',
    backgroundColor: COLORS.vfdRed,
  },
  headerText: {
    color: COLORS.white,
    fontSize: SIZES.navTitle,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 10},
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  title: {
    fontSize: 20,
  },
  fabbutton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: COLORS.vfdRed,
  },
  deleteBox: {
    backgroundColor: COLORS.vfdRed,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
