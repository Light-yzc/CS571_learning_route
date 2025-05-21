async function get_api(text){
        // this is an another way to get llm back function for who can't use wit.ai
        // please change url and your own token, i choose deepseek v3 here. another llm might have different apporches.
        // note: this apporch have no need to train, it use llm's understainding for result.you just need to specify in description.
    const res =  await fetch("https://api.siliconflow.cn/v1/chat/completions",{
        method:'POST',
        headers:{
        "Authorization": "Bearer sk-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "Content-Type": "application/json"
        },
        body:JSON.stringify({
        "model": "deepseek-ai/DeepSeek-V3",
        "messages": [
        {"role": "user", "content": text}
        ],
        "stream": false,
        "max_tokens": 50,
        "min_p": 0.05,
        "temperature": 0.7,
        "top_p": 0.7,
        "top_k": 50,
        "frequency_penalty": 0.5,
        "n": 1,
        "response_format": {"type": "text"},
        "tools" : [
        {
            "type": "function",
            "function": {
                "name": "get_chatrooms",
                "description": "获取chatroom，得到chatroom的完整名单",
                "parameters": {
                },
            }
        },
        {
            'type':'function',
            'function':{
                'name': 'get_help',
                'description':'给与用户帮助，当用户输入我能做什么之类的调用此函数',
                'parameters':{

                },
            }
        },
        {
            "type": "function",
            "function": {
                "name": "get_msg",
                "description": "获取特定chatroom中的信息",
                "parameters": {
                    'type':'object',
                    'properties':{
                        'num':{
                            'type':'num',
                            'description':'获取用户请求消息的条数',
                        },
                        'chatroom':{
                            'type':'string',
                            'description':"获取用户当前实在请求哪个房间？"
                        }
                    }
                },
            }
        },
        
    ]
    })
    })
    const data = await res.json();
    const toolCalls = data.choices[0]?.message?.tool_calls;
    if(toolCalls){
        return toolCalls
    }
    else{
        return data.choices[0].message.content;
    }


}

export default get_api;