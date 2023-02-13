import { createDrawerNavigator } from '@react-navigation/drawer';
import { Sidebar } from './components/Sidebar';
import { AboutScreen } from './screens/AboutScreen';
import { MainScreen } from './screens/MainScreen';

const Drawer = createDrawerNavigator();

const Navigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000',
      }}
    >
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
};

export { Navigator };
