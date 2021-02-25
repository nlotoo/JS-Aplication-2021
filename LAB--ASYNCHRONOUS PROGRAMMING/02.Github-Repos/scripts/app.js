function loadRepos() {
	const username = document.querySelector("#username").value

	let url = `https://api.github.com/users/${username}/repos`


	fetch(url)
		.then(r => r.json())
		.then(data => {
			data.forEach(e => {
				console.log(e.id)
			});
		})


}