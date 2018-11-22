export var config = {
  typeNameMaps: {
    productive: ["stackoverflow.com", "mpv", "maginNote","Electron"],
    distracting: ["www.baidu.com","www.zhihu.com", "www.youtube.com", "www.pornhub.com"]
  },
  categoryNameMaps: {
    web: ["百度", "淘宝", "知乎", "www.youtube.com"],
    video: [],
    devlopment: [],
    fileManagment: [],
    learning: []
  },
  logKeepedDays: 3,
  intervalSec: 1,
  heartBeat: 30, //must bigger than intervalSec
  dayData: [
    {
      name: "百度",
      subTask: [],
      category: "web",
      type: "neutral",
      start: "2018-11-21T23:18:12+08:00",
      duration: 30
    }
  ]
};
