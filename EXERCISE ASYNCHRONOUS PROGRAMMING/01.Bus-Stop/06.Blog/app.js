function attachEvents() {



    document.querySelector("#btnLoadPosts").addEventListener('click', loandPost)
    document.querySelector("#btnViewPost").addEventListener('click', viewFunc)
    let posts = document.querySelector("#posts")
    let comentsUL =  document.querySelector("#post-comments")
    async function loandPost(e) {

        let urlPost = `http://localhost:3030/jsonstore/blog/posts`
        let responcePost = await fetch(urlPost)
        let data = await responcePost.json()


        Object.entries(data).forEach(x => {

            let curent = document.createElement('option')
            curent.value = x[0]
            curent.textContent = x[1].title
            posts.appendChild(curent)
        })
    }

    async function viewFunc(e) {
        let id = posts.value

        
        let urlPost = `http://localhost:3030/jsonstore/blog/posts/${id}`
        let urlComents = `http://localhost:3030/jsonstore/blog/comments/`
        let [responcePost, responceComent] = await Promise.all([
            fetch(urlPost),
            fetch(urlComents)
        ])

 
        let data = await responcePost.json()


        document.querySelector("#post-title").textContent = data.title
        document.querySelector("#post-body").textContent = data.body

      
        let dataComent = await responceComent.json()

        comentsUL.innerHTML = ''
        Object.values(dataComent).filter(x => x.postId == id).forEach(x => {
            let curent = document.createElement('li')
            curent.textContent = x.text
            comentsUL.appendChild(curent)
        })

    }

}

attachEvents();