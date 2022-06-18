import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {icons, images, COLORS, SIZES, FONTS} from '../../constants';
import {Header} from '../../components';
import {WebView} from 'react-native-webview';

const Registration = () => {
  return (
    <View style={styles.container}>
      <Header/>
      <WebView
        useWebKit={true}
        source={{
          uri: 'https://www.hitachi-iesa.com/ac-drives-inverters/registration',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.frost,
  },
});

export default Registration;
