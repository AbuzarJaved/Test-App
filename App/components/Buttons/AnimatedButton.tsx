import React from 'react';
import {Animated, Easing, Text, StyleSheet, TouchableWithoutFeedback, GestureResponderEvent} from 'react-native';
import {icons , images , COLORS , SIZES , FONTS} from '../../constants'

export interface props {
  title: string;
  height: any;
  width: any;
  onPress: (event: GestureResponderEvent) => void;
}

const AnimatedButton: React.FC<props>= ({title, height, width , onPress}) => {
  // This value is used for inputRange
  // Initial value set to 0, which maps to scale 1 in the following buttonScale
  // that means the initially the button is not scaled.
  const animatedValue = new Animated.Value(0);

  // This will be used for scale transform style in Animated.View
  // 0, 0.5 and 1 are animatedValue over a period of time specificed by duration.
  // 1, 1.25 and 1.5 are the scale value for the component at each inputRange values.
  // 0 mapes to 1, 0.5 maps to 1.25, and 1 maps to 1.5
  const buttonScale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.25, 1.5],
  });

  // When button is pressed in, animate the animatedValue
  // to 1 in 250 milliseconds.
  const onPressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  // When button is pressed out, animate the animatedValue
  // to 0 in 100 milliseconds.
  const onPressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  // The animated style for scaling the button within the Animated.View
  const animatedScaleStyle = {
    transform: [{scale: buttonScale}],
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}>
      <Animated.View
        style={[
          styles.iconContainer,
          animatedScaleStyle,
          {height: height, width: width},
        ]}>
        <Text style={{fontSize: SIZES.h3, color: COLORS.eggplant}}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.banner,
  },
});

export {AnimatedButton};
