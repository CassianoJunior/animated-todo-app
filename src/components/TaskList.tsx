import { useCallback, useRef } from 'react';

import { AnimatePresence, View } from 'moti';

import {
  PanGestureHandlerProps,
  ScrollView,
} from 'react-native-gesture-handler';

import { makeStyledSystemPropsResolver } from '../utils/styled';
import { TaskItem } from './TaskItem';

const StyledView = makeStyledSystemPropsResolver(View);
const StyledScrollView = makeStyledSystemPropsResolver(ScrollView);

export interface TaskItemData {
  id: string;
  subject: string;
  done: boolean;
}

interface TaskListProps {
  data: Array<TaskItemData>;
  editingItemId: string | null;
  onToggleItem: (item: TaskItemData) => void;
  onChangeSubject: (item: TaskItemData, subject: string) => void;
  onFinishEditing: (item: TaskItemData) => void;
  onPressLabel: (item: TaskItemData) => void;
  onRemoveItem: (item: TaskItemData) => void;
}

interface TaskItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: TaskItemData;
  isEditing: boolean;
  onToggleItem: (item: TaskItemData) => void;
  onChangeSubject: (item: TaskItemData, subject: string) => void;
  onFinishEditing: (item: TaskItemData) => void;
  onPressLabel: (item: TaskItemData) => void;
  onRemove: (item: TaskItemData) => void;
}

const AnimatedTaskItem = ({
  data,
  isEditing,
  onToggleItem,
  onChangeSubject,
  onFinishEditing,
  onRemove,
  onPressLabel,
  simultaneousHandlers,
}: TaskItemProps) => {
  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data);
  }, [data, onToggleItem]);

  const handleChangeSubject = useCallback(
    (subject: string) => {
      onChangeSubject(data, subject);
    },
    [data, onChangeSubject]
  );

  const handleFinishEditing = useCallback(() => {
    onFinishEditing(data);
  }, [data, onFinishEditing]);

  const handlePressLabel = useCallback(() => {
    onPressLabel(data);
  }, [data, onPressLabel]);
  const handleRemove = useCallback(() => {
    onRemove(data);
  }, [data, onRemove]);

  return (
    <StyledView
      w="full"
      from={{ opacity: 0, scale: 0.5, marginBottom: -46 }}
      animate={{ opacity: 1, scale: 1, marginBottom: 0 }}
      exit={{ opacity: 0, scale: 0.5, marginBottom: -46 }}
    >
      <TaskItem
        simultaneousHandlers={simultaneousHandlers}
        subject={data.subject}
        isDone={data.done}
        isEditing={isEditing}
        onToggleCheckbox={handleToggleCheckbox}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
      />
    </StyledView>
  );
};

const TaskList = ({
  data,
  editingItemId,
  onChangeSubject,
  onFinishEditing,
  onPressLabel,
  onRemoveItem,
  onToggleItem,
}: TaskListProps) => {
  const refScrollView = useRef<ScrollView>(null);

  return (
    <StyledScrollView ref={refScrollView} w="full">
      <AnimatePresence>
        {data.map((item) => (
          <AnimatedTaskItem
            data={item}
            key={item.id}
            simultaneousHandlers={refScrollView}
            isEditing={item.id === editingItemId}
            onToggleItem={onToggleItem}
            onChangeSubject={onChangeSubject}
            onFinishEditing={onFinishEditing}
            onPressLabel={onPressLabel}
            onRemove={onRemoveItem}
          />
        ))}
      </AnimatePresence>
    </StyledScrollView>
  );
};

export { TaskList, AnimatedTaskItem };
