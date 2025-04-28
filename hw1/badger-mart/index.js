// !!! STOP !!!
// You should not need to modify anything below.
// See Step 0 for using your Badger ID to get today's feature,
// there is no code for you to do beyond here!

fetch("https://cs571api.cs.wisc.edu/rest/s25/hw1/featured-sale-item", {
	headers: {
		"X-CS571-ID": CS571.getBadgerId()
	}
})
.then(res => {
	if (res.status === 200 || res.status === 304) {
		return res.json()
	} else {
		throw new Error();
	}
})
.then(data => {
	document.getElementById("feature").innerText = `Today's sale is ${data.name} for \$${data.price}, which can only be asked for at the service desk!`
})
.catch(err => {
	console.error("Could not get the featured item.")
})