import { Feather } from '@expo/vector-icons';
import {
  Box,
  HStack,
  Icon,
  Input,
  themeTools,
  useColorModeValue,
  useTheme,
} from 'native-base';
import { useCallback } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  TextInputChangeEventData,
} from 'react-native';
import { PanGestureHandlerProps } from 'react-native-gesture-handler';
import AnimatedCheckbox from './AnimatedCheckbox';
import { AnimatedTaskLabel } from './AnimatedTaskLabel';
import { SwipableView } from './SwipableView';

interface TaskItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  isEditing: boolean;
  isDone: boolean;
  onToggleCheckbox?: () => void;
  onPressLabel?: () => void;
  onRemove?: () => void;
  onChangeSubject?: (subject: string) => void;
  onFinishEditing?: () => void;
  subject: string;
}
const TaskItem = ({
  isEditing,
  isDone,
  onToggleCheckbox,
  subject,
  onPressLabel,
  onRemove,
  onChangeSubject,
  onFinishEditing,
  simultaneousHandlers,
}: TaskItemProps) => {
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

  const handleChangeSubject = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      onChangeSubject && onChangeSubject(e.nativeEvent.text);
    },
    [onChangeSubject]
  );

  return (
    <SwipableView
      simultaneousHandlers={simultaneousHandlers}
      onSwipeLeft={onRemove}
      backView={
        <Box
          w="full"
          h="90%"
          bg="red.500"
          alignItems="flex-end"
          justifyContent="center"
          pr={4}
        >
          <Icon color="white" as={<Feather name="trash-2" />} size="sm"></Icon>
        </Box>
      }
    >
      <HStack
        alignItems="center"
        w="full"
        px={4}
        py={2}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
      >
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
        {isEditing ? (
          <Input
            placeholder="Task"
            value={subject}
            variant="unstyled"
            fontSize={18}
            px={1}
            py={0}
            autoFocus
            blurOnSubmit
            onChange={handleChangeSubject}
            onBlur={onFinishEditing}
          />
        ) : (
          <AnimatedTaskLabel
            textColor={activeText}
            inactiveTextColor={doneText}
            strikeThrough={isDone}
            onPress={onPressLabel}
          >
            {subject}
          </AnimatedTaskLabel>
        )}
      </HStack>
    </SwipableView>
  );
};

export { TaskItem };
