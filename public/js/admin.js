Vue.use(VueToast);

const app = new Vue({
    el: '#newuser',
    data: {
      alerts: [],
        username: "",
        password: "",
        admin: false
        },
    methods: {
      adduser(passwordhash){
        const json = {"run": "add", "username": this.username, "password": passwordhash, "admin": this.admin}
        fetch("/api/users", {
          method: "POST",
          body: JSON.stringify(json),
          headers : new Headers({"Content-Length" : "<calculated when request is sent>", "Content-Type": "application/json"})
          }).then(response => { 
            if(response.ok){
              this.username = ""
              this.password = ""
              this.admin = false
              appuserslist.fetchAPIData()
              return response.json()
            } else{
                Vue.$toast.error("User not created");
                this.back()
                alert("Server returned " + response.status + " : " + response.statusText);
            }
        }).then(response => {
          Vue.$toast.open('User ' + response.state);
          this.responseAvailable = true;
      })
      },
      checkFormnewuser: function (e) {
        e.preventDefault();
        if (this.username && this.password) {
            this.adduser(CryptoJS.SHA512(this.password).toString())
        }
        if (!this.username) {
          Vue.$toast.error('Username required');
        }
        if (!this.password) {
          Vue.$toast.error('Password required');
        }
      }
    },
    created(){
    }
})

const appuserslist = new Vue({
  el: '#listusers',
  data: {
      test: "oui",
      responseAvailable: false,
      listusers: []
      },
  methods: {
    removeuser(name){
      const json = {"run": "remove", "username": name}
      fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(json),
        headers : new Headers({"Content-Length" : "<calculated when request is sent>", "Content-Type": "application/json"})
        }).then(response => { 
          if(response.ok){
            Vue.$toast.open('User removed');
            this.fetchAPIData()
          } else{
              Vue.$toast.error("User not removed");
              this.back()
              alert("Server returned " + response.status + " : " + response.statusText);
          }
      })
    },
    fetchAPIData() { 
      this.responseAvailable = false;
      const json = {"run": "listall"}
      fetch("/api/users", {
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
          this.listusers = response.listusers;
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