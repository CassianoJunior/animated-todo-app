import { createDrawerNavigator } from '@react-navigation/drawer';
import { AboutScreen } from './screens/AboutScreen';
import { MainScreen } from './screens/Main';

const Drawer = createDrawerNavigator();

const Navigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
};

export { Navigator };
