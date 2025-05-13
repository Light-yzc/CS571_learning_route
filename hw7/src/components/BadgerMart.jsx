import { Text, View,Button,TouchableOpacity, Platform} from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";
import { use, useEffect, useState } from "react";

// import CS571 from '@cs571/mobile-client'

export default function BadgerMart(props) {
    const [order, set_ord_num] = useState([]);
    const [cur_item,change_item]  = useState(0);
    const [num, set_num] = useState(0);
    const [data ,setdata]  = useState([]);
    const [dis_ord,setord] = useState(0);
    useEffect(() => {
        fetch('https://cs571.org/rest/s25/hw7/items',{
            headers:{
                "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setdata(data);
            let nums = [];
            nums[0] = num;
            nums[1] = num * data[cur_item]['price'];
            set_ord_num(nums);
        })
        
    },[num,data[cur_item]['price']])
    function change_cur(forward){
        if (forward){
            cur_item <data.length - 1? change_item(cur_item + 1): 0
        }
        else{
            cur_item > 0? change_item(cur_item - 1):0
        }

    }
    function changenum(plus){
        if (plus){
            num < data[cur_item]['upperLimit'] ? set_num(num + 1): 0
        }
        else{
            num > 0? set_num(num - 1): 0
        }
    }
    function display_order(){
        if(dis_ord === 0){
            setord(1);

            console.log(order[0]);
        }
        else{
            setord(0);
        }
    }
    return <View>
        <Text style={{fontSize: 28}}>Welcome to Badger Mart!</Text>
        <Button title="PREVIOUS" onPress={()=>change_cur(0)}></Button>
        <Button title="NEXT" onPress={()=>change_cur(1)}></Button>
        <BadgerSaleItem {...data[cur_item]}/>
        {/* <BadgerSaleItem/>
        <BadgerSaleItem/> */}
        <TouchableOpacity style={{width:50,height:40, flexDirection: 'row',gap: 5,margin:"auto"}}>
            <Button title="-" onPress={()=>changenum(0)}></Button>
            <Text style={{fontSize:18}}> {num} </Text>
            <Button title="+" onPress={()=>changenum(1)}></Button>
        </TouchableOpacity>
        <Text></Text>
        {/* {dis_ord?<Text>1</Text>:<Text>2</Text>} */}
        {dis_ord&&num ?<Text style={{fontSize:18}}>You have {order[0]} item(s) costing ${order[1]} in your cart</Text>:<Text></Text>}
        {num  ?<Button title="PLACE ORDER" onPress={display_order}></Button>:<Text></Text>}
    </View>
}