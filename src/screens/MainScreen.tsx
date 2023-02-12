import { AntDesign } from '@expo/vector-icons';
import { Center, Fab, Icon, useColorModeValue, VStack } from 'native-base';
import { useCallback, useState } from 'react';
import shortid from 'shortid';
import { TaskItemData, TaskList } from '../components/TaskList';
import { ThemeToggle } from '../components/ThemeToggle';

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Buy movie tickets for Friday',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native Tutorial',
    done: false,
  },
];

const MainScreen = () => {
  const [data, setData] = useState(initialData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const [subject, setSubject] = useState('Task Item');

  const handleToggleTaskItem = useCallback((item: TaskItemData) => {
    setData((prevData) => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = { ...item, done: !item.done };
      return newData;
    });
  }, []);

  const handleChangeTaskItemSubject = useCallback(
    (item: TaskItemData, newSubject: string) => {
      setData((prevData) => {
        const newData = [...prevData];
        const index = prevData.indexOf(item);
        newData[index] = { ...item, subject: newSubject };
        return newData;
      });
    },
    []
  );

  const handleFinishEditingTaskItem = useCallback((item: TaskItemData) => {
    setEditingItemId(null);
  }, []);

  const handlePressTaskItemLabel = useCallback((item: TaskItemData) => {
    setEditingItemId(item.id);
  }, []);

  const handleRemoveTaskItem = useCallback((item: TaskItemData) => {
    setData((prevData) => {
      const newData = prevData.filter((i) => i.id !== item.id);
      return newData;
    });
  }, []);

  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center" w="full">
        <TaskList
          data={data}
          editingItemId={editingItemId}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveTaskItem}
        />
        <ThemeToggle />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={() => {
          const id = shortid.generate();
          setData([{ id, subject: '', done: false }, ...data]);
          setEditingItemId(id);
        }}
      />
    </Center>
  );
};

export { MainScreen };
