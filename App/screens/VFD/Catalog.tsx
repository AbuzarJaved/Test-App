import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Card, Button, Avatar} from 'react-native-paper';
import {Header} from '../../components/Header/Header';
import {COLORS, SIZES, FONTS, CATALOG, icons} from '../../constants';
import {AppParamList} from '../../routes/AppNavigation/AppParamList';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type catalogRouteProp = RouteProp<AppParamList, 'Catalog'>;

const Catalog = () => {
  const navigation: any = useNavigation();
  const route: catalogRouteProp = useRoute();

  const y = new Animated.Value(0);
  const height = Dimensions.get('window').height;
  const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {
    useNativeDriver: true,
  });
  const [filterResult, setFilterResult] = useState([]);

  useEffect(() => {
    getFilteredData();
  }, []);

  const getFilteredData = () => {
    // Filter Values ....
    const phaseFilter = route.params.phase;
    const seqFilter = route.params.easySeq;
    const voltageFilter = route.params.selectedVoltage;
    const hpFilter = route.params.selectedHorsepower;

    if (phaseFilter !== '') {
      const FilteredData = CATALOG.filter(item => {
        const phaseValue = item.phase;
        return phaseValue == phaseFilter;
      });
      setFilterResult(FilteredData);
    }

    if (seqFilter !== '') {
      setFilterResult([]);
      const FilteredData = CATALOG.filter(item => {
        const seqValue = item.easysq;
        return seqFilter.indexOf(seqValue) > -1;
      });
      setFilterResult(FilteredData);
    }

    if (voltageFilter !== undefined) {
      setFilterResult([]);
      const FilteredData = CATALOG.filter(item => {
        const voltageValue = item.volts;
        return voltageFilter.indexOf(voltageValue) > -1;
      });
      setFilterResult(FilteredData);
    }

    if (hpFilter !== undefined) {
      setFilterResult([]);
      const FilteredData = CATALOG.filter(item => {
        const hpValue = item.hpdisplay;
        return hpFilter.indexOf(hpValue) > -1;
      });
      setFilterResult(FilteredData);
    }

    return CATALOG;
  };

  const openStoreLink = url => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: ");
        } else {
          Linking.openURL(url);
        }
      })
      .catch(error => {
        console.log('Error ', error);
      });
  };

  const LeftContent = (props: any) => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Avatar.Image
        size={20}
        style={{backgroundColor: COLORS.vfdGray}}
        source={icons.back_arrow_white}
      />
    </TouchableOpacity>
  );

  const renderItem: any = ({item, index}: any) => {
    const position = Animated.subtract(index * 266, y);
    const isDisappearing = -266;
    const isTop = 0;
    const isBottom = height - 266;
    const isAppearing = height;
    const translateY = Animated.add(
      Animated.add(
        y,
        y.interpolate({
          inputRange: [0, 0.000001 + index * 266],
          outputRange: [0, -index * 266],
          extrapolateRight: 'clamp',
        }),
      ),
      position.interpolate({
        inputRange: [isBottom, isAppearing],
        outputRange: [0, -266 / 4],
        extrapolate: 'clamp',
      }),
    );
    const scale = position.interpolate({
      inputRange: [isDisappearing, isTop, isBottom, isAppearing],
      outputRange: [0.5, 1, 1, 0.5],
      extrapolate: 'clamp',
    });
    const opacity = position.interpolate({
      inputRange: [isDisappearing, isTop, isBottom, isAppearing],
      outputRange: [0.5, 1, 1, 0.5],
    });

    return (
      <Animated.View
        style={[
          styles.itemContainer,
          {opacity, transform: [{translateY}, {scale}]},
        ]}>
        <View style={styles.titleContainer}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.model}</Text>
        </View>

        <View style={styles.detailContainer}>
          <View
            style={{
              width: '50%',
              alignItems: 'center',
            }}>
            <Image
              // source={{uri: 'https://picsum.photos/700'}}
              source={item.imageURL}
              style={{height: 100, width: 100, borderRadius: 10}}
            />
          </View>

          <View style={{width: '25%'}}>
            <Text style={styles.item}>HP</Text>
            <Text style={styles.item}>KW</Text>
            <Text style={styles.item}>Volts</Text>
            <Text style={styles.item}>Phase</Text>
            <Text style={styles.item}>Hpdisplay</Text>
            <Text style={styles.item}>Sequence</Text>
          </View>

          <View style={{}}>
            <Text style={styles.item}>{item.hp}</Text>
            <Text style={styles.item}>{item.kw}</Text>
            <Text style={styles.item}>{item.volts}</Text>
            <Text style={styles.item}>{item.phase}</Text>
            <Text style={styles.item}>{item.hpdisplay}</Text>
            <Text style={styles.item}>
              {item.easysq == false ? 'No' : 'Yes'}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            color="#ef473a"
            onPress={() => {
              // searchVFDResult();
            }}
            contentStyle={{width: 135, height: 40}}>
            Features
          </Button>

          <Button
            mode="contained"
            color="#ef473a"
            onPress={() => {
              openStoreLink(item.url);
            }}
            contentStyle={{width: 135, height: 40}}>
            Store Link
          </Button>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.screen]}>
      <Header />
      <Card style={{flex: 1, backgroundColor: COLORS.primaryColor}}>
        <Card.Title
          title="Product Catalog"
          left={LeftContent}
          titleStyle={{color: COLORS.white}}
          style={{backgroundColor: COLORS.vfdGray}}
        />

        <AnimatedFlatList
          data={filterResult.length == 0 ? CATALOG : filterResult}
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
  screen: {
    flex: 1,
  },
  itemContainer: {
    height: 250,
    width: '95%',
    borderWidth: 1,
    marginVertical: SIZES.base,
    borderRadius: SIZES.radius,
    elevation: 10,
    alignSelf: 'center',
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.gray,
    shadowRadius: 1,
    shadowOpacity: 1,
    shadowOffset: {height: 2, width: 0},
  },
  titleContainer: {
    height: '18%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    flexDirection: 'row',
    height: '60%',
    alignItems: 'center',
  },
  buttonContainer: {
    height: '22%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  item: {
    fontSize: 15,
    fontWeight: '500',
  },
});

export default Catalog;
