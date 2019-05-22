
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users"); // ul
const github = new Github();  // Github objesi oluşturduk
const ui = new UI();

eventListeners();

function eventListeners(){

    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched); 
}

function getData(e){  // arama yaptıgında

    let username = nameInput.value.trim();  //aranan değer

    if (username === ""){
        ui.showError("Kullanıcı adı giriniz!")
    }
    else {

        github.getGithubData(username)    // fetch islemini yap
        .then(response => {
            if (response.user.message === "Not Found"){  // bulunamadıysa
                // Hata mesajı
                ui.showError("Kullanıcı bulunamadı");
            }
            else { // bulunduysa
                // console.log(response);

                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);  // ui de göster
                ui.showRepoInfo(response.repo);  // ui de göster
            }
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput();
    e.preventDefault();
}

function clearAllSearched(){

    if (confirm("Emin misiniz?")){
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }

}

function getAllSearched(){  // arananları yukle

    let users =  Storage.getSearchedUsersFromStorage(); // array i aldık

    let result ="";
    let i = 0;
    users.forEach(user => {
        i++;
        // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li> 
        result += `<li class="list-group-item">${i}. ${user}</li>`;

    });

    lastUsers.innerHTML = result;
}


