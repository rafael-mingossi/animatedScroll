import { View, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { styles } from "./styles";
import { useEffect } from "react";

type Props = {
  value: number;
};

export function ProgressBar({ value }: Props) {
  const widthContainer = useSharedValue(200);

  const endReached = value >= 95;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: widthContainer.value,
    };
  });

  useEffect(() => {
    widthContainer.value = endReached ? 56 : 200;
  }, [value]);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.text}>{value.toFixed(0)}%</Text>
      <View style={styles.tracker}>
        <View style={[styles.progress, { width: `${value}%` }]} />
      </View>
    </Animated.View>
  );
}
