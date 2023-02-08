import { useEffect } from 'react';
import { Pressable } from 'react-native';

import { Box, HStack, Text } from 'native-base';

import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedTaskLAbelProps {
  strikeThrough: boolean;
  textColor: string;
  inactiveTextColor: string;
  onPress?: () => void;
  children: React.ReactNode;
}

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedHStack = Animated.createAnimatedComponent(HStack);
const AnimatedText = Animated.createAnimatedComponent(Text);

const AnimatedTaskLabel = ({
  strikeThrough,
  textColor,
  inactiveTextColor,
  onPress,
  children,
}: AnimatedTaskLAbelProps) => {
  const hStackOffset = useSharedValue(0);
  const hStackAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: hStackOffset.value }],
    }),
    [strikeThrough]
  );

  const textColorProgress = useSharedValue(0);
  const textColorAnimatedStyle = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor]
      ),
    }),
    [strikeThrough, textColor, inactiveTextColor]
  );

  const striketroughWidth = useSharedValue(0);

  const striketroughAnimatedStyle = useAnimatedStyle(
    () => ({
      width: `${striketroughWidth.value * 100}%`,
      borderBottomColor: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor]
      ),
    }),
    [strikeThrough, textColor, inactiveTextColor]
  );

  useEffect(() => {
    const easing = Easing.out(Easing.quad);
    if (strikeThrough) {
      hStackOffset.value = withSequence(
        withTiming(4, { duration: 200, easing }),
        withTiming(0, { duration: 200, easing })
      );
      striketroughWidth.value = withTiming(1, { duration: 400, easing });
      textColorProgress.value = withDelay(
        1000,
        withTiming(1, { duration: 400, easing })
      );
    } else {
      striketroughWidth.value = withTiming(0, { duration: 400, easing });
      textColorProgress.value = withTiming(0, { duration: 400, easing });
    }
  });

  return (
    <Pressable onPress={onPress}>
      <AnimatedHStack alignItems="center" style={[hStackAnimatedStyle]}>
        <AnimatedText
          fontSize={18}
          noOfLines={1}
          isTruncated
          px={1}
          style={[textColorAnimatedStyle]}
        >
          {children}
        </AnimatedText>
        <AnimatedBox
          style={[striketroughAnimatedStyle]}
          position="absolute"
          h={1}
          borderBottomWidth={1}
        ></AnimatedBox>
      </AnimatedHStack>
    </Pressable>
  );
};

export { AnimatedTaskLabel };
