const app = new Vue({
    el: '#newuser',

    data: {
        errors: [],
        username: "",
        password: "",
        admin: false
        },
    methods: {
        checkFormnewuser: function (e) {
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
    }
})