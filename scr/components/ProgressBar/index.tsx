import { View, Text, TouchableOpacity } from "react-native";
import { useEffect } from "react";

import Animated, {
  BounceIn,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

import { styles } from "./styles";

type Props = {
  value: number;
  onMoveTop: () => void;
};

//Create an animated component from TouchableOpacity which is not animated
const TouchableOpacityAnimated =
  Animated.createAnimatedComponent(TouchableOpacity);

export function ProgressBar({ value, onMoveTop }: Props) {
  //This will animate the bar width when it shrinks to become the icon
  const widthContainer = useSharedValue(200);

  //This will track when the bar is at 95 to change to an icon
  const endReached = value >= 95;

  //This is the extra style, passing the animation with the width
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: widthContainer.value,
    };
  });

  //withSpring will reduce the compression in the icon when it changes
  useEffect(() => {
    widthContainer.value = withSpring(endReached ? 56 : 200, { mass: 0.4 });
  }, [value]);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {endReached ? (
        <TouchableOpacityAnimated
          entering={BounceIn}
          exiting={FadeOut}
          onPress={onMoveTop}
        >
          <Feather name="arrow-up" size={24} color="#C4C4CC" />
        </TouchableOpacityAnimated>
      ) : (
        <Animated.View
          style={styles.progressContent}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <Text style={styles.text}>{value.toFixed(0)}%</Text>
          <View style={styles.tracker}>
            <View style={[styles.progress, { width: `${value}%` }]} />
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );
}
