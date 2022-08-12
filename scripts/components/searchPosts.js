import { wpUrl } from "../settings/baseurl.js";

const postsUrl = wpUrl + "/wp/v2/search";

(async function(){
    try{
        const response = await fetch(postsUrl);
        const posts = await response.json();
        // console.log("posts", posts)
        
        searchPosts(posts)

    }catch(error){
        console.log(error);
    }

})();

const searchInput = document.querySelector("#search-input")
const searchResults = document.querySelector(".search-results");



//from https://www.youtube.com/watch?v=twq69gJgaaI NSCODE with adjustments
export default function searchPosts(val){
    let userInput;
    let filteredArray = [];

    searchInput.onkeyup = function(e){
        userInput = e.target.value.toLowerCase();
        if(userInput){
            filteredArray = val.filter((post) => {
                return post.title.toLowerCase().includes(userInput);
            })
            filteredArray = filteredArray.map((post) => {
                return `<li><a href=postdetails.html?id=${post.id}>${post.title}</a></li>`
            })
            // console.log(filteredArray)
            showResults(filteredArray)
            let allList = searchResults.querySelectorAll("li");
            for(let index = 0; index < allList.length; index++){
                allList[index].setAttribute("onclick", setItem)
            }
        }
        else{
            searchResults.innerHTML="";
            searchResults.classList.remove("inactive")
        }
    }

    const showResults = (list) => {
        let suggestedPosts;
        if(list.length){
            suggestedPosts = list.join("");
        }
        else{
            suggestedPosts = "<li>" + userInput +"</li>"
        }
        searchResults.innerHTML = suggestedPosts
    }

    const setItem = (e) => {
        searchInput.value = e.target.innerHTML;
        if(searchInput.value){
            searchResults.classList.add("inactive")
        }
    }
}
