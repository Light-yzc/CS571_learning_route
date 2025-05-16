import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import News from "../screens/NEWS";
    const Stack = createNativeStackNavigator();

export default function STACK_NAV(props){
    return(
        <Stack.Navigator>
            <Stack.Screen name="AllPost" component={BadgerNewsScreen} options={{headerShown:false}}/>
            <Stack.Screen name='post_id' component={News}/>
        </Stack.Navigator>
    )
}