import { Text, View,Switch} from "react-native";
import BadgerCard from "./card_C";
import { useState } from "react";
function BadgerPreferencesScreen(props) {
    console.log(props);
    const [sw1,set_sw1] = useState(true);
    const [sw2,set_sw2] = useState(true);
    const [sw3,set_sw3] = useState(true);
    const [sw4,set_4sw] = useState(true);

    return <View>
        <BadgerCard>
            <Text>Currently {sw1? 'showing ':'NOT showing '} science articles</Text>
            <Switch value={sw1} onValueChange={set_sw1} style={{margin:'auto'}}></Switch>
        </BadgerCard>
                <BadgerCard>
            <Text>Currently {sw2? 'showing ':'NOT showing '} science articles</Text>
            <Switch value={sw2} onValueChange={set_sw2} style={{margin:'auto'}}></Switch>
        </BadgerCard>
                <BadgerCard>
            <Text>Currently {sw3? 'showing ':'NOT showing '} science articles</Text>
            <Switch value={sw3} onValueChange={set_sw3} style={{margin:'auto'}}></Switch>
        </BadgerCard>
                <BadgerCard>
            <Text>Currently {sw4? 'showing ':'NOT showing '} science articles</Text>
            <Switch value={sw4} onValueChange={set_4sw} style={{margin:'auto'}}></Switch>
        </BadgerCard>
        {/* <Text style={{paddingTop: 128}}>I should put some switches here!</Text> */}
    </View>
}

export default BadgerPreferencesScreen;