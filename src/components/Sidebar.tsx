import { Feather } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import {
  Avatar,
  Center,
  Heading,
  HStack,
  IconButton,
  useColorModeValue,
  VStack,
} from 'native-base';
import { useCallback } from 'react';
import { AnimatedColorBox } from './AnimatedColorBox';
import { MenuButton } from './MenuButton';
import { ThemeToggle } from './ThemeToggle';

const Sidebar = (props: DrawerContentComponentProps) => {
  const { state, navigation } = props;
  const currentRoute = state.routes[state.index].name;

  const handlePressBackButton = useCallback(() => {
    navigation.closeDrawer();
  }, [navigation]);

  const handlePressMenuMain = useCallback(() => {
    navigation.navigate('Main');
  }, [navigation]);
  const handlePressMenuAbout = useCallback(() => {
    navigation.navigate('About');
  }, [navigation]);

  return (
    <AnimatedColorBox
      safeArea
      flex={1}
      bg={useColorModeValue('blue.50', 'darkBlue.800')}
      p={7}
    >
      <VStack space={2} flex={1}>
        <HStack justifyContent="flex-end">
          <IconButton
            onPress={handlePressBackButton}
            borderRadius={100}
            variant="outline"
            borderColor={useColorModeValue('blue.300', 'blue.100')}
            _icon={{
              as: Feather,
              name: 'chevron-left',
              size: 6,
              color: useColorModeValue('blue.700', 'blue.300'),
            }}
          />
        </HStack>
        <Avatar
          source={require('../assets/profile-image.jpeg')}
          size="xl"
          borderRadius={100}
          mb={6}
          borderColor="secondary.500"
          borderWidth={3}
        />
        <Heading mb={4} size="xl">
          Cassiano Junior
        </Heading>
        <MenuButton
          active={currentRoute === 'Main'}
          onPress={handlePressMenuMain}
          icon="inbox"
        >
          Tasks
        </MenuButton>
        <MenuButton
          active={currentRoute === 'About'}
          onPress={handlePressMenuAbout}
          icon="info"
        >
          About
        </MenuButton>
      </VStack>
      <Center>
        <ThemeToggle />
      </Center>
    </AnimatedColorBox>
  );
};

export { Sidebar };
