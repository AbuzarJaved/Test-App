import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Card, Button, Avatar} from 'react-native-paper';
import Pdf from 'react-native-pdf';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {AppParamList} from '../../routes/AppNavigation/AppParamList';
import {BottomTabParamList} from '../../routes/BottomTabNavigation/BottomTabParamList';
import {COLORS, SIZES, FONTS, CATALOG, icons} from '../../constants';
import {Header} from '../../components/Header/Header';

type guidesNavProp = CompositeNavigationProp<
  NativeStackNavigationProp<AppParamList, 'Main'>,
  BottomTabNavigationProp<BottomTabParamList, 'Guides'>
>;

type guidesRouteProp = RouteProp<AppParamList, 'PdfViewer'>;

const PdfViewer = () => {
  const navigation: guidesNavProp = useNavigation();
  const route: guidesRouteProp = useRoute();

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

  const source = route.params.source;
  return (
    <View style={{flex:1}}>
      <Header />
      <Card style={{elevation: 10}}>
        <Card.Title
          title="Pdf Viewer"
          left={LeftContent}
          titleStyle={{color: COLORS.white}}
          style={{backgroundColor: COLORS.vfdGray}}
        />
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            // console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            // console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            // console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PdfViewer;
