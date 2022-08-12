import { getUserId } from "../utils/storage.js";
import msgFunction from "../utils/message.js";


export default function recentPostsList(recentPosts){
    const leftRecentPostsContainer = document.querySelector(".list-group-recent-posts")
    const midRecentPostsContainer = document.querySelector(".list-group-recent-posts-sm");

    leftRecentPostsContainer.innerHTML = "";
    midRecentPostsContainer.innerHTML = "";


    if(recentPosts.length === 0){
        msgFunction("error", "No posts", ".list-group-recent-posts")
    }

    recentPosts.forEach(post => {

        leftRecentPostsContainer.innerHTML += 
        `
        <a href="postdetails.html?id=${post.id}" class="custom-recent-post">
            <div class="card mb-3">
                <div class="card-body custom-recent-card-body">
                    <div class="d-flex justify-content-between">
                        <h6 class="mb-1">${post.title.rendered}</h6>
                        <small class="text-muted">Published ${new Date(post.date_gmt).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) }</small> 
                    </div>
                    <small class="card-text ">${post.excerpt.rendered}</small>
                    <div class="d-grid gap-2 d-flex justify-content-between btn-custom-container">
                        <a class="btn btn-sm btn-custom btn-outline-secondary" id="edit-link" href="edit-post.html?id=${post.id}">Edit Post<i class="feather-18 edit-icon" data-feather="edit"></i></a>
                    </div>
                </div>
            </div>
        </a>
        ` 
    })

    recentPosts.forEach(post => {
        midRecentPostsContainer.innerHTML +=`
        <div class="card mb-4 w-100 custom-post-card">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h5 class="mb-1">${post.title.rendered}</h5>
                    <small class="text-muted">Published ${new Date(post.date_gmt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</small> 
                </div>
                <p class="card-text ">${post.excerpt.rendered}</p>
                <div class="d-grid gap-2 d-flex justify-content-between pt-3 btn-custom-container">
                    <a href="postdetails.html?id=${post.id}" class="link-custom">Click to read<i class="feather-18" data-feather="arrow-right"></i></a>
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
        editLink[i].style.display="inline-block";
    }
}