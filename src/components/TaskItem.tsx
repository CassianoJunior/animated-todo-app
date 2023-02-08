import {
  Box,
  HStack,
  themeTools,
  useColorModeValue,
  useTheme,
} from 'native-base';
import { Pressable } from 'react-native';
import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import { AnimatedTaskLabel } from './AnimatedTaskLabel';

interface TaskItemProps {
  isDone: boolean;
  onToggleCheckbox?: () => void;
}

const TaskItem = ({ isDone, onToggleCheckbox }: TaskItemProps) => {
  const theme = useTheme();
  const highlightColor = themeTools.getColor(
    theme,
    useColorModeValue('blue.500', 'blue.400')
  );
  const boxStroke = themeTools.getColor(
    theme,
    useColorModeValue('muted.300', 'muted.500')
  );
  const checkmarkColor = themeTools.getColor(
    theme,
    useColorModeValue('white', 'white')
  );
  const activeText = themeTools.getColor(
    theme,
    useColorModeValue('darkText', 'lightText')
  );
  const doneText = themeTools.getColor(
    theme,
    useColorModeValue('muted.400', 'muted.600')
  );

  return (
    <HStack alignItems="center" w="full" px={4} py={2}>
      <Box width={30} height={30} mr={2}>
        <Pressable onPress={onToggleCheckbox}>
          <AnimatedCheckbox
            highlightColor={highlightColor}
            boxOutlineColor={boxStroke}
            checkmarkColor={checkmarkColor}
            checked={isDone}
          />
        </Pressable>
      </Box>
      <AnimatedTaskLabel
        textColor={activeText}
        inactiveTextColor={doneText}
        strikeThrough={isDone}
      >
        Task Item
      </AnimatedTaskLabel>
    </HStack>
  );
};

export { TaskItem };
