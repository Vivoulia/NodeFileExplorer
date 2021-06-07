const app = new Vue({
    el: '#main',
   
    data: {
        result: null,
        responseAvailable: false,
        dirlist : []
    },
    methods: {
        changefolder(newfolder){
            this.dirlist.push(newfolder)
            this.fetchAPIData()
        },
        back(newfolder){
            this.dirlist.pop()
            this.fetchAPIData()
        },
        fetchAPIData() { 
            this.responseAvailable = false;
            dir = ""
            for (let index = 0; index < this.dirlist.length; index++) {
                const element = this.dirlist[index];
                dir = dir + "/" + element
            }
            fetch("/api/files" + dir, {
                "method": "GET",
            })
            .then(response => { 
                if(response.ok){
                    return response.json()
                } else{
                    alert("Server returned " + response.status + " : " + response.statusText);
                }
            })
            .then(response => {
                this.result = response.listfiles;
                this.responseAvailable = true;
            })
            .catch(err => {
                console.log(err);
            });
        }
    },
    beforeMount(){
        this.fetchAPIData()
     }
})

const app2 = new Vue({
    el: '#headerfolder',
   
    data: {
        dirlist : app.dirlist
    },
    methods: {
        showdir(newfolder){
            dir = "/"
            for (let index = 0; index < this.dirlist.length; index++) {
                const element = this.dirlist[index];
                dir = dir + element + "/"
            }
            return(dir)
        },
    }
})