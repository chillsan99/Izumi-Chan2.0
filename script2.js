

let anime = {
    "apiURL1": "https://api.jikan.moe/v4/anime",
    "apiURL2": "https://animechan.vercel.app/api/quotes/anime?title=",
    


    fetchAnime: function(title){
        fetch(
            "https://api.jikan.moe/v3/search/anime?q="
            + title 
            + "&page=1"
        )
        .then((response) => response.json())
        .then((data) => this.displayAnime(data));
     },

    displayAnime: function(data){
        const{ title, image_url, synopsis } = data.results[0];

        document.querySelector(".title").innerText = title;
        document.querySelector(".img").src =  image_url;
        document.querySelector("#synopsis").innerText = synopsis;
        document.querySelector(".anime").classList.remove("loading");
    },
 
    fetchQuote: function(title){
        fetch(
            "https://animechan.vercel.app/api/quotes/anime?title="
            + title
        )
        .then(response => response.json())
        .then(quotes => this.displayQuote(quotes));     
    },

    displayQuote:function(quotes){
        const number = Math.floor(Math.random() * 10);
        const{ quote } = quotes[number]
       
       
        document.querySelector(".quote").innerText = '"'+ quote + '"';
        document.querySelector(".anime").classList.remove("loading");
    },

    search:function(){
        this.fetchAnime(document.querySelector(".search-bar").value)
        this.fetchQuote(document.querySelector(".search-bar").value);
    },

};

document.querySelector(".search button").addEventListener("click", function(){
    anime.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
    anime.search();
    }
});

anime.fetchAnime("Naruto");
anime.fetchQuote("Kill la Kill")

