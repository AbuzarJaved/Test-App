import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {icons, images, COLORS, SIZES, FONTS} from '../../constants';
import Icon from 'react-native-vector-icons/AntDesign';

const AllList = ({navigation}) => {
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

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>All List</Text>
      </View>
      <View style={{flex: 0.9}}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
        <TouchableOpacity style={styles.fabbutton} onPress={() => {
          navigation.navigate('create');
        }}>
          <Icon name="plus" size={22} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AllList;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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
});
