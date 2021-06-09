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
        clicnav(namefolder){
            while(this.dirlist[this.dirlist.length - 1] != namefolder){
                this.dirlist.pop()
            }
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
     },
     updated(){
        //var myModal = new bootstrap.Modal(document.getElementById('Modal'))
        var videomodal = document.getElementById('videomodal')
        videomodal.addEventListener('show.bs.modal', function (event) {
        // Button that triggered the modal
        var button = event.relatedTarget
        // Extract info from data-bs-* attributes
        var lienfichier = button.getAttribute('data-bs-lienfichier')
        // If necessary, you could initiate an AJAX request here
        // and then do the updating in a callback.
        //
        // Update the modal's content.
        var modalTitle = videomodal.querySelector('.modal-title')
        var videosource = document.getElementById("videosource");

        videosource.src = lienfichier
        modalTitle.textContent = button.getAttribute('data-bs-nomfichier')
        })
     }
})