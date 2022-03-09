const card = document.querySelector(".card");
const card2 = document.querySelector(".card2");
const profile_not_found = document.querySelector(".profile_not_found");

document.getElementById("btn").addEventListener("click", showGithubUserProfile);
document.getElementById("btn_repos").addEventListener("click", showRepos);

//For display User Avatar Bio and repository count
function showGithubUserProfile() {
  let username = document.getElementById("github_username").value;
  let url = "https://api.github.com/users/" + username;
  let repos = "https://api.github.com/users/" + username / +"repos";

  card2.classList.add("hidden"); //for hide card

  //fetch data from API
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        //if any error occurs
        card.classList.add("hidden");
        profile_not_found.classList.remove("hidden");
      } else {
        //Visualize fetched data
        card.classList.remove("hidden");
        profile_not_found.classList.add("hidden");
        document.querySelector(".card-title").textContent = `${data.name}`;
        document.querySelector(".card-text").textContent = `${data.bio}`;
        document.querySelector(
          ".repositories"
        ).textContent = `${data.public_repos} `;
        document.querySelector(".followers").textContent = `${data.followers}`;
        document.getElementById(
          "image"
        ).innerHTML = `<img class="card-img-top image" src='${data.avatar_url}'>`;

        console.log(data);
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
// for display repository
function showRepos() {
  let username = document.getElementById("github_username").value;
  let url = "https://api.github.com/users/" + username + "/repos";
  card2.classList.remove("hidden");

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.sort((a, b) => {
        return b.stargazers_count - a.stargazers_count;
      });

      if (data.message) {
        profile_not_found.classList.remove("hidden");
      } else {
        let items = "";
        if (data.length >= 15) {
          for (let i = 0; i < 15; i++) {
            let repoName = data[i].name;
            let repoStar = data[i].stargazers_count;

            //Inject to html
            items += `
          <ul class="list-group ">
            <li class="list-group-item d-flex justify-content-between align-items-center ">${
              i + 1
            }. 
            ${repoName}
              <span class="badge badge-primary badge-pill colo">${repoStar}  <img src="images/star.svg" alt="star"> </span>
               </li>
          </ul>`;
          }

          //If total repository is less then 15
        } else {
          for (let i = 0; i < data.length; i++) {
            let repoName = data[i].name;
            let repoStar = data[i].stargazers_count;
            console.log(i);

            console.log(repoName);
            items += `
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">${
                i + 1
              }. 
              ${repoName}
                <span class="badge badge-primary badge-pill colo">${repoStar}  <img src="images/star.svg" alt="star"> </span>
                 </li>
            </ul>`;
          }
        }

        document.getElementById("repository-list").innerHTML = `${items}`;
      }
    })

    .catch((e) => {
      console.log(e);
    });
}
