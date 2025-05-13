import { Text, View,Image } from "react-native";

export default function BadgerSaleItem(props) {

    return <View>
        <Image style={{width:250, height:250,margin:'auto'}} source={{uri:props.imgSrc}}/>
        <Text style={{fontSize:26,margin:'auto',fontWeight:'bold'}}>{props.name}</Text>
        <Text></Text>
        <Text style={{fontSize:18,color:'grey',margin:'auto',fontWeight:'bold'}}>${props.price}</Text>
        <Text></Text>
        <Text style={{margin:'auto' ,fontWeight:'bold',fontSize:18}}>You can only order up to {props.upperLimit} units</Text>
    </View>
}
