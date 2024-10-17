Page({
  data: {
    isLogin: false, //whether the current user is logged in
    userInfo: {}, //user personal information
    personalSign: '',//The personal signature text entered by the user in the multi-line text box
    userSign: '', // personal signature text displayed in personal information
    offDay: [],
    offDays: [],
    userCode: '',
    accessToken: '',
    currentUserOpenId: '',
    isLoading: true,
    taCode: '',
    totalOffDays: 0
  },


  onLoad: function () {
    this.initUser();
    this.getBase();
  },

  initUser: function () {
    tt.getUserInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: JSON.parse(res.rawData),
          isLogin: true
        })
      },
      fail: (res) => {
        if (res.errno == 1001002) {
          console.log('errno : ' + res.errno + " des : " + res.errString);
        }
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

  getBase: function () {
    try {
      const appInstance = getApp();
      console.log(`App Instance: ${appInstance.app_access_token}`);
      tt.login({
        success: (res) => {
          console.log(res.code);
          appInstance.user_code = res.code;
        },
        fail: (err) => {
          console.log(err);
        }
      });
      tt.request({
        url: "https://open.larksuite.com/open-apis/bitable/v1/apps/KbPYbhqFva1KBtsY2HZlrTgmgxf/tables/tblvxfVvIx7STgUu/records",
        header: {
          "content-type": "application/json",
          // "Authorization": `Bearer ${this.data.taCode}`
          "Authorization": `Bearer ${appInstance.app_access_token}`
        },
        method: "GET",
        dataType: "json",
        responseType: "text",
        success: (res) => {
          console.log(res.data);
          console.log(JSON.stringify(res.data.data.items));
          offDay = res.data.data.items
          this.setData({
            offDay: res.data.data.items
          })


          if (appInstance.user_code !== '') {
            console.log(appInstance.user_code);
            tt.request({
              "url": "https://open.larksuite.com/open-apis/authen/v1/oidc/access_token",
              "header": {
                "content-type": "application/json",
                "Authorization": `Bearer ${appInstance.app_access_token}`,
              },
              "data": {
                "grant_type": "authorization_code",
                "code": appInstance.user_code
              },
              "method": "POST",
              "dataType": "json",
              "responseType": "text",
              success: (res) => {
                console.log(res.data);
                this.setData({ accessToken: res.data.data.access_token })
                this.setData({
                  isLoading: false
                })
                tt.request({
                  "url": "https://open.larksuite.com/open-apis/authen/v1/user_info",
                  "header": {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${this.data.accessToken}`
                  },
                  "method": "GET",
                  dataType: "json",
                  responseType: "text",
                  success: (res) => {
                    var startOffDay, endOffDay, typeOfApplication;
                    var sumOfOffDays = 0;
                    this.setData({
                      currentUserOpenId: res.data?.data.open_id
                    })
                    this.data.offDay.forEach(day => {
                      if (this.data.currentUserOpenId === day.fields.Requester[0].id
                        && day.fields.Status === "Approved"
                        && day.fields.Requester[0].id === this.data.currentUserOpenId) {
                        typeOfApplication = day.fields["Loại phép"];
                        startOffDay = new Date(day.fields["Từ ngày"]).toLocaleDateString() + " " + day.fields["Từ ngày-Time"];
                        endOffDay = new Date(day.fields["Đến hết ngày"]).toLocaleDateString() + " " + day.fields["Đến hết ngày-Time"];
                        // Tính tổng cộng số ngày nghỉ
                        sumOfOffDays += day.fields["Số ngày"];
                        this.setData({
                          offDays: [...this.data.offDays, { typeOfApplication, startOffDay, endOffDay }],
                          totalOffDays: sumOfOffDays
                        })

                        console.log(this.data.offDays);
                      }
                    });
                  },
                  fail: (res) => {
                    console.log("Fail");
                  }
                })
              },
              fail: (res) => {
                console.log(`request fail: ${JSON.stringify(res)}`);
              }
            });
          }

        },
        fail(res) {
          console.log(`login fail: ${JSON.stringify(res)}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  changeSign: function () {
    tt.openSchema({
      schema: "https://applink.larksuite.com/T8Qodgo6sGKW",
      external: true,
      success(res) {
        console.log(JSON.stringify(res));
      },
      fail(res) {
        console.log(`openSchema fail: ${JSON.stringify(res)}`);
      }
    });
  },
})
