import { useEffect, useState } from "react";
import { Text, View ,ScrollView} from "react-native";
import DisplayNews from "./display_news";
function BadgerNewsScreen(props) {
    const [news, setnews] = useState([]);
    useEffect(()=>{
        fetch('https://cs571.org/rest/s25/hw8/articles',{
            headers:{
                "X-CS571-ID":"bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba"
            }
        })
        .then(res => res.json())
        .then(data => {
            setnews(data);
            console.log(news);

        })
    },[])
    return <View>
        <ScrollView>
        {news.length === 0? <Text>Still loading</Text>:news.map(new_1 => (<DisplayNews key = {new_1.id} {...new_1}></DisplayNews>))}
        
        {/* <Text style={{paddingTop: 128}}>When I get to Step 3, I will need to be inside a nested stack navigator!</Text> */}
    </ScrollView>
    </View>
}

export default BadgerNewsScreen;