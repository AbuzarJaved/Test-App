import React from 'react';

import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {icons, images, GUIDES, COLORS, SIZES, FONTS} from '../../constants';
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
import VideoPlayer from 'react-native-video-player';

type videoPlayerNavProp = CompositeNavigationProp<
  NativeStackNavigationProp<AppParamList, 'Main'>,
  BottomTabNavigationProp<BottomTabParamList, 'Videos'>
>;

const VideoPlayerScreen = () => {
  const navigation = useNavigation<videoPlayerNavProp>();
  const route = useRoute<any>();
  const source = route.params.source;
  const thumbnail = route.params.thumbnail;

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

  return (
    <View style={styles.screen}>
      <Header />
      <Card>
        <Card.Title
          title="Video Player"
          left={LeftContent}
          titleStyle={{color: COLORS.white}}
          style={{backgroundColor: COLORS.vfdGray}}
        />
          <VideoPlayer
            video={source}
            // videoWidth={1600}
            videoHeight={1400}
            thumbnail={thumbnail}
            style={styles.backgroundVideo}
          />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.primaryColor
  },
  backgroundVideo: {
    position: 'absolute',
    top: 120,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.vfdGray,
  },
});

export default VideoPlayerScreen;
