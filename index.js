let content = document.getElementById("content");
let btn = document.getElementById("btn");
let networkStatus = document.getElementById("networkStatus");
let isLoading = false;
let data = "";
let error = null;

async function fetchJoke() {
    isLoading = true;
    updateDOM(isLoading, error, data);
    const jokeRaw = await fetch("https://icanhazdadjok.com/", { headers: { Accept: 'application/json' } });
    if (!jokeRaw.ok) {
        const error = await jokeRaw.json() || jokeRaw.status;
        return Promise.reject(error)
    }
    const jokeJSON = await jokeRaw.json();
    isLoading = false;
    return jokeJSON;
}

btn.addEventListener("click", (e) => {
    console.log("inside btn!!!!!!!!!!!");
    fetchJoke().then((joke) => {
        data = joke.joke;
        updateDOM(isLoading, error, data);
    }).catch((err) => {
        error = err;
        updateDOM(isLoading, error, data);
    })
})


window.addEventListener("load", (e) => {
    console.log("inside window!!!!!!!!!!!");
    fetchJoke().then((joke) => {
        data = joke.joke;
        updateDOM(isLoading, error, data);
    }).catch((err) => {
        error = err;
        updateDOM(isLoading, error, data);
    })
})


function emptyNode(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function updateDOM(isLoading, error, data) {
    emptyNode(content);
    if (error) {
        content.innerText = error;
        return;
    }

    if (isLoading) {
        content.innerText = "...Loading";
    } else {
        content.innerText = data;
    }
}