import loginMenu from "./loginMenu.js";
import { wpUrl }from "../settings/baseurl.js"
import {getUserId} from "../utils/storage.js";
import ifLoggedIn from "./ifLoggedIn.js";



loginMenu();

ifLoggedIn();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

if(!id){
    document.location.href="/"
}

const postUrl = wpUrl + "/wp/v2/posts/" + id;
// console.log(postUrl)
const loading = document.querySelector(".loading");
const detailsContainer = document.querySelector(".details-container");

(async function(){
    
    try{
        const response = await fetch(postUrl);
        const details = await response.json();

        // console.log(details)

        const tabContainer = document.querySelector(".nav-current-post");
        tabContainer.innerHTML = `${details.title.rendered}`;

        const postTitle = document.querySelector(".post-title");
        postTitle.innerHTML = `${details.title.rendered}`

        const lastEdited = document.querySelector(".last-edited");
        lastEdited.innerHTML = `Last updated ${new Date(details.modified_gmt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }`
        
        const breadcrumbLink = document.querySelector(".current-breadcrumb");
        breadcrumbLink.innerHTML = `${details.title.rendered}`

        const postdetailscontainer = document.querySelector(".postdetailscontainer"); 
        postdetailscontainer.innerHTML = `<p>${details.content.rendered}</p>`

        const editContainer = document.querySelector(".edit-post-details");
        editContainer.innerHTML= `<a class="btn btn-sm btn-custom-bg" id="edit-link" href="edit-post.html?id=${details.id}">Edit Post<i class="feather-18 edit-icon" data-feather="edit"></i></a>`
        
        canEditPosts()

        feather.replace();
    }catch(error){
        console.log(error)
    }finally{
        loading.style.display="none";
        detailsContainer.style.display="block";
    }
})();

const userId = getUserId();

function canEditPosts(){
    const editLink = document.querySelectorAll("[id='edit-link']");
    for(var i = 0; i < editLink.length; i++)
    if(userId){
        editLink[i].style.display="inline-flex";
    }
}