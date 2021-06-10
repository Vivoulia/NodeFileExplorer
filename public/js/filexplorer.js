const app = new Vue({
    el: '#main',
   
    data: {
        result: null,
        responseAvailable: false,       // True if result is updated
        dirlist : [],                   // list of repo (ex: [user, home] for user/home)
        modalimagetitle : "Image"
    },
    computed: {
        onlyimages() {
            var listimage = []
            if(this.responseAvailable != false){
                for (let index = 0; index < this.result.length; index++) {
                    const element = this.result[index];
                    if(element.type == 'image'){
                        listimage.push(element)
                    }                
                }
            }
            return listimage
        },
        getaddindeximage: function () {
            this.indeximage++
            return this.indeximage - 1
        }
    },
    methods: {
        getindeximage(indexall) {
            var listimage = []
            for (let index = 0; index < this.result.length; index++) {
                const element = this.result[index];
                if(element.type == 'image'){
                    listimage.push(element)
                }                
            }
            var targetimage = this.result[indexall]
            for (let index = 0; index < listimage.length; index++) {
                const element = listimage[index];
                if(element == targetimage)
                    return index
            }
            // not supposed to happen
            return 0
        },
        changefolder(newfolder){
            this.dirlist.push(newfolder)
            this.fetchAPIData()
        },
        back(){
            // When clic the btn return, we remove 1 folder from the list
            this.dirlist.pop()
            this.fetchAPIData()
        },
        clicnav(index){
            // When clic the folder name in the navbar, we remove folders from the list until
            // The length of dirlist is the same as the index of the folder
            while(this.dirlist.length - 1 > index){
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
                    this.back()
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
            // Update the link
            document.getElementById("videosource").src = lienfichier
            modalTitle.textContent = button.getAttribute('data-bs-nomfichier')
        })

        videomodal.addEventListener('hidden.bs.modal', function (event) {
            // When closed, pause the video
            document.getElementById("videosource").pause();

        })

        var imagemodal = document.getElementById('imagemodal')
        imagemodal.addEventListener('show.bs.modal', function (event) {
            // Button that triggered the modal
            var button = event.relatedTarget
            // Extract info from data-bs-* attributes
            var lienfichier = button.getAttribute('data-bs-lienfichier')
            var indexfichier = button.getAttribute('data-bs-index')
            // Update the modal's content.
            // Update the link
            document.getElementById("carouselnb" + indexfichier).classList.add("active")
            document.getElementById("carouselbtnnb" + indexfichier).classList.add("active")
            app.modalimagetitle = button.getAttribute('data-bs-nomfichier')
        })
        var carouselimagemodal = document.getElementById('carouselIndicators')
        carouselimagemodal.addEventListener('slid.bs.carousel', function (event) {
            // Update the title of the modal when change slide
            app.modalimagetitle = document.getElementsByClassName('carousel-item active')[0].innerText
        
        })


        imagemodal.addEventListener('hidden.bs.modal', function (event) {
            // When closed, desactivate the carousel
            const carouselactive = document.getElementsByClassName('carousel-item active')
            while(carouselactive[0] != undefined){
                const indexcarousel = carouselactive[carouselactive.length-1].id.split("carouselnb")[1]
                document.getElementById("carouselbtnnb" + indexcarousel).classList.remove("active")
                carouselactive[carouselactive.length-1].classList.remove("active")
            }

        })

     }
})