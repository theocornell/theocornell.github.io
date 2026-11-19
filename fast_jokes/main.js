const API = "https://fast-jokes-44pz.onrender.com/api/v1/jokes";

async function getJokes(){
    const language = document.querySelector("#selLang").value;
    const category = document.querySelector("#selCat").value;
    const number = document.querySelector("#selNum").value;
    const jokeId = document.querySelector("#jokeId").value;
    const results = document.querySelector("#results");
    results.innerHTML = "";

    const url = jokeId !== ""
    ?`${API}/${jokeId}`
    : `${API}/${language}/${category}/${number}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if(!response.ok){
            throw new Error(data.detail ?? data.error);
        }

        let jokes
        if(data.joke !== undefined){
            jokes = [typeof data.joke === "string" ? data.joke : data.joke.text];
        } else {
            jokes = data.jokes;
        }


        for (const text of jokes){
            const div = document.createElement("article");
            div.className = "notification"
            div.textContent = text;
            results.appendChild(div);
        }
    } catch (err) {
        results.innerHTML = `<article class="notification is-danger">${err}</article>`
    }
}

document.querySelector("#btnAmuse").addEventListener("click", getJokes)