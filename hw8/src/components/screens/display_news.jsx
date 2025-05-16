// import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import { useNavigation } from "@react-navigation/native";
import BadgerCard from "./card_C";
import { Image, Text ,View,StyleSheet, Pressable} from "react-native";
function DisplayNews(props) {
    const navigation = useNavigation();
    function hand_press(){
        navigation.push('post_id',props)
    }
    return (
        <BadgerCard style={style.main} onPress={hand_press}>
            <Text style={{fontSize:19,fontWeight:'bold'}}>{props.title}</Text>
            <Image source={{ uri: 'https://raw.githubusercontent.com/CS571-S25/hw8-api-static-content/main/' + props.img }} />
        </BadgerCard>


    );
}
const style = StyleSheet.create({
    main:{
        backgroundColor:'white',
    }
})
export default DisplayNews;
