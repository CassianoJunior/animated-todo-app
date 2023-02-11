import { Center, VStack } from 'native-base';
import { useCallback, useState } from 'react';
import { TaskItem } from '../components/TaskItem';
import { ThemeToggle } from '../components/ThemeToggle';

const MainScreen = () => {
  const [checked, setChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [subject, setSubject] = useState('Task Item');

  const handlePressCheckbox = useCallback(() => {
    setChecked((prev) => !prev);
  }, []);

  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center" w="full">
        <TaskItem
          isDone={checked}
          onToggleCheckbox={handlePressCheckbox}
          subject={subject}
          onChangeSubject={setSubject}
          isEditing={isEditing}
          onPressLabel={() => setIsEditing(true)}
          onFinishEditing={() => setIsEditing(false)}
        />
        <ThemeToggle />
      </VStack>
    </Center>
  );
};

export { MainScreen };
