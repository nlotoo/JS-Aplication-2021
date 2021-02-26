function loadRepos() {
	const username = document.querySelector("#username").value

	let url = `https://api.github.com/users/${username}/repos`

	fetch(url)
		.then(r => r.json())
		.then(data => {
			document.querySelector("#repos").innerHTML = ''
			data.forEach(e => {
				console.log(e)
				let clone_url = e.clone_url
				let curent = `${username}/${e.name}`
				let li = document.createElement('li')
				let a = document.createElement('a')
				a.textContent = curent
				a.href = `${clone_url}`
			
				li.appendChild(a)
				document.querySelector("#repos").appendChild(li)
			});
		})
		.catch((error) => {
			console.error(error);
		});

}
