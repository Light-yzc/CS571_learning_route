import { Text } from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import BadgerNewsScreen from '../screens/BadgerNewsScreen'
import BadgerPreferencesScreen from '../screens/BadgerPreferencesScreen'
import STACK_NAV from "./BadgerNewsStack";
function BadgerTabs(props) {
    const Botten_Nav = createBottomTabNavigator();
    return <>
        {/* <Text style={{paddingTop: 128}}>Hello World! I should make this tabs instead.</Text> */}
        <Botten_Nav.Navigator>
            <Botten_Nav.Screen name="News" component={STACK_NAV} options={{headerShown:false}}/>
            <Botten_Nav.Screen name="Preferences" component={BadgerPreferencesScreen} />
        </Botten_Nav.Navigator>
    </>
}

export default BadgerTabs;