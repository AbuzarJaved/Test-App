import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {icons, images, FAQS, COLORS, SIZES, FONTS} from '../../constants';
import {Header} from '../../components';
import {Card, Avatar} from 'react-native-paper';
import {AppParamList} from '../../routes/AppNavigation/AppParamList';
import {BottomTabParamList} from '../../routes/BottomTabNavigation/BottomTabParamList';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import CrossIcon from 'react-native-vector-icons/Entypo';
type faqsNavProp = CompositeNavigationProp<
  NativeStackNavigationProp<AppParamList, 'Main'>,
  BottomTabNavigationProp<BottomTabParamList, 'FAQs'>
>;

const FAQs = () => {
  const navigation: faqsNavProp = useNavigation();
  const [expanded, setExpanded] = useState(-1);
  const [visible, setVisible] = useState(false);
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
    const inputRange = [-1, 0, 90 * index, 90 * (index + 2)];

    const opacityInputRange = [-1, 0, 90 * index, 90 * (index + 1)];

    const scale = y.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });

    const opacity = y.interpolate({
      inputRange: opacityInputRange,
      outputRange: [1, 1, 1, 0],
    });

    return (
      <Animated.View style={[{transform: [{scale}]}, {opacity}]}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              if (visible == true) {
                setExpanded(-1);
                setVisible(false);
                return;
              }
              setExpanded(index);
              setVisible(true);
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.title}>{item.title}</Text>

              {expanded == index ? (
                <View style={{backgroundColor: COLORS.vfdRed, borderRadius: 6}}>
                  <CrossIcon name="cross" size={20} color={COLORS.white} />
                </View>
              ) : (
                <Icon name="plus" size={20} color={COLORS.black} />
              )}
            </View>
            {visible == true && expanded == index ? (
              <View style={{paddingTop: 10, height: 90}}>
                <Text
                  style={[styles.title, {width: '100%', fontWeight: 'bold'}]}>
                  {item.content}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />

      <Card style={{flex: 1, backgroundColor: COLORS.primaryColor}}>
        <Card.Title
          title="FAQs"
          left={LeftContent}
          titleStyle={{color: COLORS.white}}
          style={{backgroundColor: COLORS.vfdGray}}
        />

        <Animated.FlatList
          data={FAQS[0].items1}
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
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
    marginHorizontal: SIZES.base * 2,
    marginVertical: SIZES.base,
    shadowColor: COLORS.black,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: {height: 1, width: 0},
    elevation: 10,
    borderRadius: 12,
  },
  title: {
    width: '90%',
    fontSize: SIZES.body3,
  },
});

export default FAQs;
