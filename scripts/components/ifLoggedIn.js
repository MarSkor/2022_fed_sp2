import { getUserId } from "../utils/storage.js";


export default function ifLoggedIn(){
    const userId = getUserId();

    const adminContainer = document.querySelector(".admin-div");

    let newPostLink = "";

    if(userId){
        newPostLink=`<a class="btn btn-sm btn-custom-add-new" href="./add-post.html">Create new post<i class="feather-18 ms-1" data-feather="plus-square"></i></a>`;
    }

    adminContainer.innerHTML=`${newPostLink}`
}

