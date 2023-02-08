import { Center, VStack } from 'native-base';
import { useCallback, useState } from 'react';
import { TaskItem } from '../components/TaskItem';
import { ThemeToggle } from '../components/ThemeToggle';

const MainScreen = () => {
  const [checked, setChecked] = useState(false);

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
      <VStack space={5} alignItems="center">
        <TaskItem isDone={checked} onToggleCheckbox={handlePressCheckbox} />
        <ThemeToggle />
      </VStack>
    </Center>
  );
};

export { MainScreen };
