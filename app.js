App({
  onLaunch (options) {
    console.log("onLaunch is running");
    // This request is called to get app_access_token 
    tt.request(
      {
        "url": "https://open.larksuite.com/open-apis/auth/v3/app_access_token/internal",
        "method": "POST",
        "dataType": "json",
        "responseType": "text", 
        data: {
          "app_id": "cli_a78e0e4992b8d02f",
          "app_secret": "cOav4fXz4D9j1e2klCLcubiU4rhODCeg"
        },
        success: (res) => {
          this.app_access_token = res.data.app_access_token
          console.log(this.app_access_token);
        },
        fail: (err) => {
          console.log(err);
        }
      }
    );

    this.initUser();

   
  },


  initUser: function () {
    tt.getUserInfo({
      success: (res) => {
        this.userInfo = res.rawData
        console.log(this.userInfo);
      },
      fail: (res) => {
        console.log(res)
        this.toLogin()
      }
    });
  },

  toLogin: function() {
    tt.login({ 
      success: (res) => {
        this.initUser()
        tt.showToast({
          title: 'login',
          icon: 'success',
          success: () => {
            console.log("login success")
          }
        })
      },
      fail(res) {
        console.log(`login fail`);
      }
    });
  },

  onShow (options) {
    // Do something when show.
  },
  onHide () {
    // Do something when hide.
  },
  app_access_token:"",
  user_code: "",
  userInfo: ""
})