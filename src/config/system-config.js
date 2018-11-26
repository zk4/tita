export var sysConfig = {
    typeNameMaps: {
      productive: ["stackoverflow.com", "mpv", "maginNote","Electron"],
      distracting: ["www.baidu.com","www.zhihu.com", "www.youtube.com", "www.pornhub.com"]
    },
    tagNameMaps: {
      web: ["百度", "淘宝", "知乎", "www.youtube.com"],
      video: [],
      devlopment: [],
      fileManagment: [],
      learning: []
    },
    logKeepedDays: 3,
    intervalSec: 100,
    heartBeat: 30, //must bigger than intervalSec
   
  };
  