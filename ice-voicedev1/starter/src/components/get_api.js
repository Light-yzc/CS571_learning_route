
async function call_api(text){
    // this is an another way to get llm back function for who can't use wit.ai
     const res = await fetch('https://api.siliconflow.cn/v1/chat/completions',{
        method:'POST',
        headers:{    
        "Authorization": "Bearer sk-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // please change url and your own token, i choose deepseek v3 here. another llm might have different apporches.
        "Content-Type": "application/json"
    },
    body:JSON.stringify({
        "model": "deepseek-ai/DeepSeek-V3",
        "messages": [
        {"role": "user", "content": text}
        ],
        "stream": false,
        "max_tokens": 50,
        // "enable_thinking": false,
        // "thinking_budget": 4096,
        "min_p": 0.05,
        // "stop": null,
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
                "name": "get_joke",
                "description": "是否根据用户输入调用get_joke函数",
                "parameters": {
                    // "type": "object",
                    // "properties": {
                    //     "location": {
                    //         "type": "string",
                    //         "description": "The city and state, e.g. San Francisco, CA",
                    //     }
                    // },
                    // "required": ["location"]
                },
            }
        },
    ]

    })

    })
    const data = await res.json();
    const toolCalls = data.choices[0]?.message?.tool_calls;
    if (toolCalls) {
                // console.log("模型决定调用函数:", toolCalls);
                // toolCalls.forEach(call => {
                // console.log(`函数名: ${call.function.name}`);
                // console.log(`参数: ${call.function.arguments}`); // 可能是 JSON 字符串
                // });
                return '$call func';
            } else {
                // console.log("直接回复:", data.choices[0].message.content);
                return data.choices[0].message.content;
            }


}


export default call_api;

