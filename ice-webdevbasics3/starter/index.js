// This is where your JS goes!

fetch('https://cs571.org/rest/s25/ice/chili', {
    headers: {
        "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',// You may hardcode your Badger ID instead.
    }
})
.then(res => {
    console.log(res.status, res.statusText);
    if(res.status === 200) {
        return res.json();
    } else {
        throw new Error();
    }
})
.then(data => {
    console.log(data);
    console.log(data.reviews.filter(i => i.rating === 5).map(i=> i.txt));
    console.log(data.recipe.map(ins => ins.split(':')[0]))
    console.log(Object.keys(data.ingredients).reduce((pre, cur) => {
        let unit = data.ingredients[cur].unit;
        // console.log(unit);
        if (!unit){
            return pre;
        }
        if (pre.includes(unit)){
            return pre;
        }
        pre.push(unit);
        return pre
    }, []))
    // return data;
})
// .then(data => {

    // const star5 = [];
    // const review = data['reviews'].filter(i => {
    //     if (i.rating === 5){
    //     // console.log(i.rating);
    //     star5.push(i.txt);
    //     }
    // });
    // for (let i of star5){
    //     console.log(i)
    // }
    // return data;
// })
// .then(data => {
//     const step = data['recipe'];
//     const steps = step.map(i =>{
//         const index = i.indexOf(':');
//         return i.substring(0, index);
//     })
//     for (let i of steps){
//         console.log(i);
//     }
//     return data;
// })
// .then(data =>{
//     con
//     const ingredient = data['ingredients'].map(i => {
//         return i.key
//     })
// })
// .catch(err => {
//     alert("Uh oh! Something went wrong. Are you logged in with your Badger ID?")
// })