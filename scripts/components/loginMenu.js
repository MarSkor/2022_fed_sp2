import { getUserId } from "../utils/storage.js";
import logOutUser from "./logOut.js";

export default function loginMenu(){
    const container = document.querySelector(".admin-col");

    const userId = getUserId();
    
    let authLink = ` <a class="nav-link text-white" href="./login.html" tabindex="-1">Login</a>`

    if(userId){
        authLink = `<span class="text-white nav-link"> Hi ${userId}</span> <a class="nav-link text-white" href="#" id="logout">Logout</a> `
    }

    container.innerHTML=`
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 justify-content-end login-container">
                <li class="nav-item">
                    <a class="nav-link text-white" href="./index.html" tabindex="-1">Home</a>
                </li>
                ${authLink}
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Signup</a>
                </li>
            </ul>
    `
    feather.replace();

    logOutUser();
}