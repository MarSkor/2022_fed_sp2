import { wpUrl } from "../settings/baseurl.js";
import {getToken} from "../utils/storage.js";


export default function deletePost(id){
    const container = document.querySelector(".delete-container")
    container.innerHTML = `<button type="button" class="dlt btn btn-outline-secondary">Delete</button>`;

    const button = document.querySelector("button.dlt");

    button.onclick = async function(){
        const deletePost = confirm("Do you mean to delete this post? This action cannot be undone");
        if(deletePost){
            const url = wpUrl + "/wp/v2/posts/" + id;
            const token = getToken();

            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            try {
                const response = await fetch(url, options);
                const json = await response.json();

                location.href = "index.html";

                console.log(json);

                
            } catch (error) {
                console.log(error);
            }
        }
    }
}