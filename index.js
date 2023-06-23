let content = document.getElementById("content");
let btn = document.getElementById("btn");
let networkStatus = document.getElementById("networkStatus");
let isLoading = false;
let data = "";

async function fetchJoke() {
    isLoading = true;
    updateDOM(isLoading);
    const jokeRaw = await fetch("https://icanhazdadjoke.com/", { headers: { Accept: 'application/json' } });
    const jokeJSON = await jokeRaw.json();
    isLoading = false;
    updateDOM(isLoading);
    return jokeJSON;
}

btn.addEventListener("click", (e) => {
    console.log("inside btn!!!!!!!!!!!");
    fetchJoke().then((joke) => {
        content.innerText = joke.joke;
    })
})


window.addEventListener("load", (e) => {
    console.log("inside window!!!!!!!!!!!");
    fetchJoke().then((joke) => {
        content.innerText = joke.joke;
    })
})


function emptyNode(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function updateDOM(isLoading) {
    emptyNode(content);
    if (isLoading) {
        content.innerText = "...Loading";
    } else {
        content.innerText = data;
    }
}