import { getUserId } from "../utils/storage.js";
import ifLoggedIn from "./ifLoggedIn.js";
import msgFunction from "../utils/message.js";


ifLoggedIn();


export default function displayPosts(posts){
    
    const postContainer = document.querySelector(".list-group-posts");



    if(posts.length === 0){
        msgFunction("error", "No posts", ".list-group-posts")
    }

    postContainer.innerHTML = "";
    posts.forEach(post => {
        postContainer.innerHTML+=`
        <div class="card mb-4 w-100 custom-post-card">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h5 class="mb-1">${post.title.rendered}</h5>
                    <small class="text-muted">Published ${new Date(post.date_gmt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</small> 
                </div>
                <p class="card-text">${post.excerpt.rendered}</p>
                <div class="d-grid gap-2 d-flex justify-content-between pt-3 btn-custom-container">
                    <a href="postdetails.html?id=${post.id}" class="link-custom"> Click to read <i class="feather-18" data-feather="arrow-right"></i></a>
                    <a class="btn btn-sm btn-custom-bg" id="edit-link" href="edit-post.html?id=${post.id}">Edit Post<i class="feather-18 edit-icon" data-feather="edit"></i></a>
                </div>
            </div>
        </div>
        `
    })
    feather.replace();

    canEditPosts();
}

const userId = getUserId();


function canEditPosts(){
    const editLink = document.querySelectorAll("[id='edit-link']");
    for(var i = 0; i < editLink.length; i++)
    if(userId){
        editLink[i].style.display="inline-flex";
    }
}