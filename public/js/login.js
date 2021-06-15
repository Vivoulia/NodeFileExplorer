const app = new Vue({
    el: '#login',

    data: {
        errors: [],
        username: "",
        password: ""
    },
    methods: {
        checkForm: function (e) {
            if (this.username && this.password) {
                this.password = CryptoJS.SHA512(this.password).toString()
                return true;
            }
      
            this.errors = [];
            if (!this.username) {
              this.errors.push('Username required');
            }
            if (!this.password) {
              this.errors.push('Password required');
            }

            e.preventDefault();
          }
    },
    created(){
        let uri = window.location.href.split('?');
        if (uri.length == 2){
            let vars = uri[1].split('&');
            let getVars = {};
            let tmp = '';
            vars.forEach(function(v){
                tmp = v.split('=');
                if(tmp.length == 2)
                getVars[tmp[0]] = tmp[1];
        });
        if(getVars.bad){
            this.errors.push('Bad credentials')
        }        
        }
    }
})