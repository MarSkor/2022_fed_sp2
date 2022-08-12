import { logOut } from "../utils/storage.js";

export default function logOutUser(){
    const logout = document.querySelector("#logout");
    // console.log(logout)

    if(logout){
        logout.onclick = function(){
            const doLogout = confirm("Log out?")

            if(doLogout){
                logOut();
                location.href="index.html"
            }
        }
    }
}