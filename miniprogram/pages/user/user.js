// miniprogram/pages/user/user.js
let appdata=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{},
      hasUserInfo:false,
      canIUse:wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
    if(appdata.globalData.userInfo){
      this.setData({
        userInfo: appdata.globalData.userInfo,
        hasUserInfo:true
      })
      console.log(appdata.globalData.userInfo);
      this.addUser(appdata.globalData.userInfo);
    }else if(this.data.canIUse){
      appdata.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (res) => {
          appdata.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo(event){
    console.log(event);
      if(event.detail.userInfo){
        appdata.globalData.userInfo=event.detail.userInfo
        console.log(appdata.globalData.userInfo);

          this.setData({
            userInfo:event.detail.userInfo,
            hasUserInfo:true
          })

        this.addUser(appdata.globalData.userInfo)
      }
  },


  async addUser(user){
    if (appdata.globalData.hasUser){
      return;
      }
      const db=wx.cloud.database()
      let result=await db.collection('user').add({
        data:{
            nickName:user.nickName,
            albums:{}
        }
      })//send the data to the cloud
    appdata.globalData.nickName=user.nickName;
    console.log(result._id);
    appdata.globalData.id=result._id;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})