function buildStudents(data) {
	// TODO This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.
	console.log(data);
	document.getElementById('num-results').innerText = data.length;
	append = document.getElementById('students');
	for (let i of data){
		let block = document.createElement('div');
		block.setAttribute('class', 'col-12 col-md-6 col-lg-4 col-xl-3 dynamic-block')
		append.appendChild(block);
		let block1 = document.createElement('h3');
		block1.innerText = Object.values(i['name']);
		block.appendChild(block1);

		let block2 = document.createElement('h4');
		block2.innerText = (i['major']);
		block1.appendChild(block2);
		let name = i.name.last;
		const cred = i.numCredits;
		const born = (i.fromWisconsin) ? 'is' : 'not'; 
		let block3 = document.createElement('h5');
		block3.innerText  = `${name} is taking ${cred} and ${born} from wisconsin`;
		block2.appendChild(block3);
		block_tmp = document.createElement('h5');
		const num = i.interests.length;
		block_tmp.innerText = `They have ${num} interests including`;
		block3.appendChild(block_tmp);
		let block4 = document.createElement('or');
		block3.appendChild(block4);
		for (i of i.interests){
			let block5 = document.createElement('li');
			block5.innerText = i;
			block4.appendChild(block5);

		}

	}
}

function handleSearch(e) {
	e?.preventDefault(); // You can ignore this; prevents the default form submission!

	// TODO Implement the search
	const name = document.getElementById('search-name').value.toLowerCase();
	const major = document.getElementById('search-major').value.toLowerCase();
	const interest = document.getElementById('search-interest').value.toLowerCase();
	let keep = {};
	let list = [];
	for (let i of data_1){
		const cur_name = Object.values(i.name).toString().toLowerCase();
		// console.log(cur_name);
		const cur_major = i.major.toString().toLowerCase();
		if(cur_name.includes(name) && cur_major.includes(major)){
			if (i.interests.indexOf(interest))
				keep = Object.assign(keep, i);
				list.push(keep);
		}
	}
	console.log(keep);
	const blocks = document.querySelectorAll('.dynamic-block');
    blocks.forEach(block => block.remove());
	// blocks.remove();
	buildStudents(list);

}
let data_1;
fetch('https://cs571.org/rest/s25/hw2/students', {
	headers:{
		"X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',// You may hardcode your Badger ID instead.
	}
})
.then(data => {
	return data.json();

})
.then(data =>{
	data_1 = data;
	buildStudents(data_1);
})
lists = document.getElementsByTagName('li');
console.log(lists);
// for (let i of lists){
// 	i.addEventListener('click', (e) => {
// 		console.log('点击了:', e.target.textContent);
// 		// 可以在这里添加具体的处理逻辑
// 	});
// 	console.log(i + '加了事件处理');
// }
for (let i = 0; i < lists.length; i++) {
	lists[i].addEventListener('click', function() {
	  console.log('按钮被点击:', this.textContent);
	}); //can't add an eventlistener, don't know why;
  }
document.getElementById("search-btn").addEventListener("click", handleSearch);


