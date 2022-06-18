import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {icons, images, COLORS, SIZES, FONTS} from '../../constants';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateList = ({navigation}) => {
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

  const [list , setList] = useState([]);
  const [listItem, setListItem] = useState('');

  const handleAddItem = () => {
    let temp = [...list];
    temp.push([listItem]);
    setList(temp);
    setListItem('');
  };

   const handleCreate = async () => {
    //  AsyncStorage.clear();
    await AsyncStorage.setItem('List', JSON.stringify(list));
    navigation.navigate('Main');
   };

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
        <Text style={styles.headerText}>Create List</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setListItem}
        value={listItem}
        placeholder="Write Items ..."
        placeholderTextColor={'#888'}
        returnKeyLabel={'done'}
        returnKeyType="done"
        onSubmitEditing={handleAddItem}
      />

      <View style={{flex: 0.9}}>
        {list.map(item => {
          return (
            <View style={{marginHorizontal: 10, marginVertical: 10}}>
              <Text style={{color: 'black', fontWeight: '500', fontSize: 16}}>
                {item}
              </Text>
            </View>
          );
        })}
      </View>

      <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
        <Text style={{color: '#fff', fontSize: 18, fontWeight: '500'}}>
          Create
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateList;

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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  createBtn: {
    height: 40,
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.vfdRed,
    margin: 10,
  },
});
