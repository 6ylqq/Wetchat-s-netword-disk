// miniprogram/pages/folder/folder.js
const app = getApp();
const db = wx.cloud.database();
const _ = db.command;

Page({
  /**
   * 页面的初始数据
   */
  isloaded: false,
  data: {
    dialogShow: false,
    inputValue: '',
    folders: [],
    buttons: [{text: '取消'}, {text: '确定'}],
    error: ''
  },


  async checkUser() {

    //设置权限，创建者及管理员可读写
    const user = await db.collection('user').get()
    console.log(user)

    if (!user.data.length) {
      app.globalData.hasUser = false
      return wx.switchTab({
        url: '/pages/user/user'
      })
    }
    const userinfo = user.data[0];
    console.log(user.data[0]);
    app.globalData.hasUser = true
    app.globalData.id = userinfo._id
    app.globalData.nickName = userinfo.nickName
    app.globalData.allData.folders = userinfo.folders
    this.getFolders(userinfo.folders)
  },

  async getFolders(foldersParam) {
    const folders = foldersParam || app.globalData.allData.folders
    for (const folder of folders) {
      if (!folder) {
        continue
      }
    }
    this.setData({
      folders
    })
    this.isloaded = true
  },

  addfolders(event) {
    this.setData({
      dialogShow: true,
    })
  },

  keyInput(event) {
    console.log(event),
      this.setData({
        inputValue: event.detail.value
      })
  },
//新建文件夹
  async formSubmit(e) {
    if (e.detail.index == 1) {
      let foldersName = this.data.inputValue
      if (!!foldersName) {
        app.globalData.allData.folders.push({
          foldersName: foldersName,
          files: []
        })
        let result = await db.collection('user').doc(app.globalData.id).update({
          data: {
            albums: _.set(app.globalData.allData.albums),
            folders: _.set(app.globalData.allData.folders)
          }
        })
        this.setData({
          dialogShow: false,
        })
        wx.reLaunch({
          url: '/pages/folder/folder'
        })
      } else {
        this.setData({
          error: '文件夹名不能为空 '
        })
      }
    } else {
      this.setData({
        dialogShow: false,
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.checkUser();
    console.log(this.data.dialogShow);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.isloaded) {
      this.getFolders()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})