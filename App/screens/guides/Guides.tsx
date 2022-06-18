import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {icons, images, GUIDES, COLORS, SIZES, FONTS} from '../../constants';
import {Card, Button, Avatar, RadioButton} from 'react-native-paper';
import {Header} from '../../components';
import {AppParamList} from '../../routes/AppNavigation/AppParamList';
import {BottomTabParamList} from '../../routes/BottomTabNavigation/BottomTabParamList';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import { transform } from '@babel/core';

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

type guidesNavProp = CompositeNavigationProp<
  NativeStackNavigationProp<AppParamList, 'Main'>,
  BottomTabNavigationProp<BottomTabParamList, 'Guides'>
>;

const Guides = () => {
  const navigation: guidesNavProp = useNavigation();
    const y = useRef(new Animated.Value(0)).current;
    const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {
      useNativeDriver: true,
    });
  
   const LeftContent = (props: any) => (
     <Avatar.Image
       size={30}
       style={{backgroundColor: COLORS.vfdGray}}
       source={require('../../assets/icons/search_white.png')}
     />
   );
  
  const renderItem: React.FC<any> = ({item, index}) => {
    const inputRange = [
      -1,
      0,
      90 * index,
      90 * (index + 2),
    ];

    const opacityInputRange = [-1, 0, 90 * index, 90 * (index + .8)];

    const scale = y.interpolate({
      inputRange,
      outputRange: [1,1,1,0]
    });

     const opacity = y.interpolate({
       inputRange: opacityInputRange,
       outputRange: [1, 1, 1, 0],
     });


    return (
      <Animated.View style={[{transform:[{scale}]} , {opacity}]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PdfViewer', {source: item.pdf});
          }}
          style={styles.item}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.title}>{item.type}</Text>
            </View>

            <Image source={images.pdf_icon} style={{height: 30, width: 25}} />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <Card style={{backgroundColor: COLORS.primaryColor, flex: 1,}}>
        <Card.Title
          title="Guides"
          left={LeftContent}
          titleStyle={{color: COLORS.white}}
          style={{backgroundColor: COLORS.vfdGray}}
        />

        <AnimatedFlatlist
          data={GUIDES}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          {...{onScroll}}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 90,
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
    marginVertical: SIZES.base,
    marginHorizontal: 16,
    shadowColor: COLORS.black,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: {height: 1, width: 0},
    elevation: 10,
    borderRadius: 12,
  },
  title: {
    fontSize: SIZES.body3,
    margin: 1,
  },
});

export default Guides;
