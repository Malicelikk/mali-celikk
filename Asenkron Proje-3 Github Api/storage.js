
class Storage {  // static classlar class ismi uzerinden erisilebilir 

    static getSearchedUsersFromStorage(){

        let users;

        if (localStorage.getItem("searched") === null) { // böyle bir key yoksa
            users = []; // olustur
        }
        else { // varsa local storage da string olarak yazılan degeri jsonla array e ceviriyoruz
            users = JSON.parse(localStorage.getItem("searched"));
        }

        return users; // array i donduk

    }

    static addSearchedUserToStorage(username){
        // önce böyle bi değer var mı diye bakıcak
        let users = this.getSearchedUsersFromStorage(); // olan değerleri alcak

        if(users.indexOf(username) === -1){ // bu username arrayin içinde yok ekleyebiliriz
            users.push(username);
        }

        localStorage.setItem("searched",JSON.stringify(users)); // stringe çevirip ekle

    }

    static clearAllSearchedUsersFromStorage(){

        localStorage.removeItem("searched");
    }


}