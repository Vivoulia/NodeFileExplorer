const app = new Vue({
    el: '#main',
   
    data: {
        result: null,
        responseAvailable: false
    },
    methods: {
        fetchAPIData() { 
            this.responseAvailable = false;
            fetch("/api/files", {
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