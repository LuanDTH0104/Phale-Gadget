Page({
  data: {
    isLogin: false,
    userInfo: {},
    tenant_access_token: ''
  },

  onLoad: function () {
    this.initUser();
  },

  // initUser: function() {
  //   const appInstance = getApp(); 
  //   console.log(`App Instance: ${appInstance.userInfo}`);
  //   var ui = appInstance.userInfo
  //   if(appInstance.userInfo.nickName != "") {
  //     this.setData({
  //       userInfo: ui
  //     })  
  //     console.log(this.userInfo);
  //     this.setData({ 
  //       isLogin: true
  //     })
  //   }
  // },

  initUser: function () {
    const appInstance = getApp();
    tt.getUserInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: JSON.parse(res.rawData),
          isLogin: true
        });
        appInstance.userInfo = this.userInfo;
      },
      fail: (res) => {
        console.log(res)
        this.toLogin()
      }
    });
  },

  toLogin: function () {
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


  redirect: function () {
    tt.navigateTo({
      "url": "../leave-application/index",
      success(res) {
        console.log(JSON.stringify(res));
      },
      fail(res) {
        console.log(`navigateTo fail: ${JSON.stringify(res)}`);
      }
    })
  },

  saturdayRequest: function () {
    tt.openSchema({
      schema: "https://applink.larksuite.com/T8QrEPxiv90q",
      external: true,
      success(res) {
        console.log(JSON.stringify(res));
      },
      fail(res) {
        console.log(`openSchema fail: ${JSON.stringify(res)}`);
      }
    });
  },

  dangkilamthem: function () {
    tt.openSchema({
      schema: "https://applink.larksuite.com/T8QBHBEdEaY5",
      external: true,
      success(res) {
        console.log(JSON.stringify(res));
      },
      fail(res) {
        console.log(`openSchema fail: ${JSON.stringify(res)}`);
      }
    });
  },

  dangkibosungchamcong: function() {
    tt.openSchema({
      schema: "https://applink.larksuite.com/T8QBI74LWh5I",
      external: true,
      success(res) {
        console.log(JSON.stringify(res));
      },
      fail(res) {
        console.log(`openSchema fail: ${JSON.stringify(res)}`);
      }
    });
  },

  dangkixecongtac: function() {
    tt.openSchema({
      schema: "https://applink.larksuite.com/T8QBIaC3DsbQ",
      external: true,
      success(res) {
        console.log(JSON.stringify(res));
      },
      fail(res) {
        console.log(`openSchema fail: ${JSON.stringify(res)}`);
      }
    });
  },

  dangkikhachlamviec: function() {
    tt.openSchema({
      schema: "https://applink.larksuite.com/T8QBIdPdNNpb",
      external: true,
      success(res) {
        console.log(JSON.stringify(res));
      },
      fail(res) {
        console.log(`openSchema fail: ${JSON.stringify(res)}`);
      }
    });
  },

  dangkikhachlamviec: function() {
    tt.openSchema({
      schema: "https://applink.larksuite.com/T8QBIdPdNNpb",
      external: true,
      success(res) {
        console.log(JSON.stringify(res));
      },
      fail(res) {
        console.log(`openSchema fail: ${JSON.stringify(res)}`);
      }
    });
  },


  dangkyhuycom: function() {
    tt.openSchema({
      schema: "https://applink.larksuite.com/T8QBPbkJ3NAi",
      external: true,
      success(res) {
        console.log(JSON.stringify(res));
      },
      fail(res) {
        console.log(`openSchema fail: ${JSON.stringify(res)}`);
      }
    });
  }
})