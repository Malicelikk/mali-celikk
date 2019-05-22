// Burda sadece async awaitle fetch islemi yaptık

class Github {

    constructor(){
        this.url="https://api.github.com/users/"; // url yi özellik olarak ekliyoruz
    }

    async getGithubData(username){

        const responseUser = await fetch(this.url + username);   // response donduruyo
        const responseRepo = await fetch(this.url + username + "/repos"); // response donduruyo 

        const userData = await responseUser.json();
        const repoData = await responseRepo.json();

        return{
            user:userData,
            repo:repoData
        }
    }

}