import { useState,useEffect } from "react";
export default function useStorage(key,init_value) {
    const sess_data = JSON.parse(sessionStorage.getItem(key));
    const [data, setdata] = useState(sess_data? sess_data: init_value);
    useEffect(() =>{
        sessionStorage.setItem(key,JSON.stringify(data));
    },[data]);
    return [data, setdata]
}


// import { useState, useEffect } from 'react';

// export default function useStorage(storageKey, initialValue) {

//   const savedData = JSON.parse(sessionStorage.getItem(storageKey));

//   const [data, setData] = useState(savedData ? savedData : initialValue);

//   useEffect(() => {
//     sessionStorage.setItem(storageKey, JSON.stringify(data));
//   }, [data]);

//   return [data, setData];
// }