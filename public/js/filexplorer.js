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
        showimageModal(slide) {
            var imagemodal = document.getElementById('imagemodal')
            $('.slickcar').slick({
                lazyLoad: 'ondemand',
                infinite: true,
                centerMode: true,
                variableWidth: false,
                dots: true,
                adaptiveHeight: true,
                initialSlide: slide,
                centerMode: true
            });
            $('.slickcar').on('afterChange', function (event, slick, currentSlide) {
                app.modalimagetitle = document.getElementsByClassName('slick-current')[0].children[0].alt;
            });
            imagemodal.addEventListener('hidden.bs.modal', function () {
                console.log('hidden')
                $('.slickcar').slick('unslick');
                $('.slickcar').off('afterChange')
                this.removeEventListener('hidden.bs.modal',arguments.callee)
            })
        },
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
            const json = {"dir": this.dirlist}
            fetch("/api/files", {
                method: "POST",
                body: JSON.stringify(json),
                headers : new Headers({"Content-Length" : "<calculated when request is sent>", "Content-Type": "application/json"})
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
        /* 
        var carouselimagemodal = document.getElementById('carouselIndicators')
        carouselimagemodal.addEventListener('slid.bs.carousel', function (event) {
            // Update the title of the modal when change slide
            app.modalimagetitle = document.getElementsByClassName('carousel-item active')[0].innerText
        
        })
        */
     },
     created(){

     }
})