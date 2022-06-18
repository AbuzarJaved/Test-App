import React from 'react';
import {
  Animated,
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../constants';

export interface props {
  title: string;
  height: any;
  width: any;
  onPress: (event: GestureResponderEvent) => void;
}

const AnimatedButton_2: React.FunctionComponent<props> = ({
  title,
  height,
  width,
  onPress,
}) => {
  // Initial scale value of 1 means no scale applied initially.
  const animatedButtonScale = new Animated.Value(1);

  // When button is pressed in, animate the scale to 1.5
  const onPressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
    }).start();
  };

  // When button is pressed out, animate the scale back to 1
  const onPressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // The animated style for scaling the button within the Animated.View
  const animatedScaleStyle = {
    transform: [{scale: animatedButtonScale}],
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <Animated.View
        style={[
          styles.iconContainer,
          animatedScaleStyle,
          {height: height, width: width},
        ]}>
        <Text style={{fontSize: SIZES.h3 , color: COLORS.white}}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.ember,
  },
});

export {AnimatedButton_2};
