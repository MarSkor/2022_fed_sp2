import { wpUrl } from "./settings/baseurl.js";
import displayPosts from "./components/listPosts.js";
import loginMenu from "./components/loginMenu.js";
import msgFunction from "./utils/message.js";
import recentPostsList from "./components/recentPosts.js";

const postsUrl = wpUrl + "/wp/v2/posts?filter[orderby]=date&order=asc";
const recentPostsUrl = wpUrl + "/wp/v2/posts?filter[orderby]=date&order=desc";

loginMenu();


async function fetchPostData(){
    try {
        const [data1, data2] = await Promise.all([
          fetch(postsUrl),
          fetch(recentPostsUrl),
        ]);
        

        const posts = await data1.json();
        const recentPosts = await data2.json();
        // console.log("data1", posts);
        // console.log("data2", recentPosts);

        displayPosts(posts);
        recentPostsList(recentPosts);

        return [posts, recentPosts];

      } catch (err) {
        console.log(err);
        msgFunction("error", "An error occured", ".list-group-posts")
      }

};

fetchPostData()
.then(([posts, recentPosts]) => {posts,recentPosts})
.catch(error => {
    console.log(error)
})


