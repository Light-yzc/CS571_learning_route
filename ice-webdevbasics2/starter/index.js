// This is where your JS goes!

    // You can fetch data from https://cs571api.cs.wisc.edu/rest/s25/ice/chili
    // When you are complete, you should also be able to fetch data from...
//  https://cs571api.cs.wisc.edu/rest/s25/ice/pasta
//  https://cs571api.cs.wisc.edu/rest/s25/ice/pizza
let datas = ''
fetch('https://cs571.org/rest/s25/ice/chili', {
    headers:{
        "X-CS571-ID":CS571.getBadgerId()
    }
})
.then((Data) => {
    console.log('Data fetched.')
    return Data.json()
})

.then(D => {
    console.log(D)
    datas = D
    document.getElementById("recipe-name").innerText = datas['name'];
    let img = document.getElementById('recipe-img');
    img.src = datas['img']['location'];
    img.alt = datas['img']['description'];
    let table = document.getElementById('ingredients-body');
    let ingrNames = Object.keys(datas.ingredients);
    let j = 0;
    for (let i of ingrNames){
        let ingr = datas.ingredients[i];
        let tabel_row1 = document.createElement('tr');
        table.appendChild(tabel_row1);
        let t1 = document.createElement('td')
        t1.innerText = ingr['amount'];
        let t2 = document.createElement('td')
        t2.innerText = ingr['misc'];
        let t3 = document.createElement('td')
        t3.innerText = i;
        tabel_row1.appendChild(t1);
        tabel_row1.appendChild(t2);
        tabel_row1.appendChild(t3);
        j += 1;

    }
})
