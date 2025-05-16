    import { useEffect, useRef, useState } from "react";
    import { Linking, StyleSheet, Text,View,ScrollView, Animated } from "react-native";
    function News(props){
        const params = props.route.params;
        const Anime = useRef(new Animated.Value(0));
        const total_anime = useRef(new Animated.Value(0))
        const [passage,setpassage] = useState({});
        useEffect(()=>{
            fetch(`https://cs571.org/rest/s25/hw8/article?id=${params.fullArticleId}`,{
                headers:{
                    "X-CS571-ID":"bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba"

                }
            })
            .then(res => res.json())
            .then(data =>{
                // console.log(params);
                console.log(data.body);
                setpassage(data);
            })
            Animated.timing(total_anime.current,{
                toValue:1,
                duration:1000,
                useNativeDriver:true
            }).start()
        },[])
        function start_anime(){
                Animated.timing(Anime.current,{
                toValue:1,
                duration:1000,
                useNativeDriver:true
            }).start()
        }
    return(<ScrollView>
        <Animated.Text style={[style.title,{opacity:total_anime.current}]}>
            {params.title}{'\n'}
        </Animated.Text>
        {Object.keys(passage).length === 0?<Text style={style.title}>Still loading</Text>
    :
    <View>
            {start_anime()}
    <Text style={style.main}>By {passage.author} on {passage.posted}</Text>
        <Text style={[style.main,{color:"lightblue"}]} onPress={() => Linking.openURL(passage.url)}>Read full article here</Text>
        {passage.body.map(p => {return <Animated.Text key={p.slice(0,3)} style={[style.main,{opacity:Anime.current}]}>{p}</Animated.Text>})}    
    </View>
    }
        
        </ScrollView>
    )
    }
    style = StyleSheet.create({
        title:{
            fontSize:24,
            fontWeight:'bold',
            textAlign:'left'},
        main:{
            fontSize:18,marginBottom:10
        }
        }
    )
    export default News;