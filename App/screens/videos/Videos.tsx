import React from 'react';
import {View, Text, Animated, StyleSheet, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import {icons, images, VIDEOS, COLORS, SIZES, FONTS} from '../../constants';
import {Card, Avatar} from 'react-native-paper';
import {Header} from '../../components';
import {AppParamList} from '../../routes/AppNavigation/AppParamList';
import {BottomTabParamList} from '../../routes/BottomTabNavigation/BottomTabParamList';
import {
  CompositeNavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type videosNavProp = CompositeNavigationProp<
  NativeStackNavigationProp<AppParamList, 'Main'>,
  BottomTabNavigationProp<BottomTabParamList, 'Videos'>
>;

const Videos = () => {
  const height = Dimensions.get('window').height;
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {useNativeDriver: true})
  const navigation: videosNavProp = useNavigation();

   
   const LeftContent = (props: any) => (
     <Avatar.Image
       size={30}
       style={{backgroundColor: COLORS.vfdGray}}
       source={require('../../assets/icons/search_white.png')}
     />
   );

  const renderItem: React.FC<any> = ({item, index}) => {
    const position = Animated.subtract(index * 316, y);
    const isDisappearing = -316;
    const isTop = 0;
    const isBottom = height-316;
    const isAppearing = height; 
    const translateY = Animated.add(Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.000001 + index * 316],
        outputRange: [0, -index * 316],
        extrapolateRight: 'clamp',
      }),
    ), position.interpolate({ inputRange : [isBottom, isAppearing] , outputRange: [0, -316/4] , extrapolate: 'clamp' })
    );
    const scale = position.interpolate({inputRange: [isDisappearing, isTop , isBottom, isAppearing] , outputRange: [0.5,1,1,0.5] , extrapolate:'clamp'});
     const opacity = position.interpolate({
       inputRange: [isDisappearing, isTop, isBottom, isAppearing],
       outputRange: [0.5, 1, 1, 0.5],
     });
    return (
      <Animated.View style={[{opacity, transform: [{translateY}, {scale}]}]}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            navigation.navigate('VideoPlayerScreen', {
              source: item.src,
              thumbnail: item.thumbnail,
            });
          }}>
          <Card>
            <Text style={{fontSize: SIZES.h3, paddingBottom: SIZES.base}}>
              {item.title}
            </Text>
            <Card.Cover source={item.thumbnail} />
          </Card>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />

      <Card style={{backgroundColor: COLORS.primaryColor, flex: 1}}>
        <Card.Title
          title="Videos"
          left={LeftContent}
          titleStyle={{color: COLORS.white}}
          style={{backgroundColor: COLORS.vfdGray}}
        />
        <AnimatedFlatList
          data={VIDEOS}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          scrollEventThrottle={16}
          bounces={false}
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
    height: 280,
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

export default Videos;
