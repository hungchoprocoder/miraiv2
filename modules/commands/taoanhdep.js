module.exports.config = {
    name: "taoanhdep",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "DuyVuongUwU",
    description: "Tạo ra một ảnh trên taoanhdep.\ntaoanhdep <id nhân vật> <chữ nền> <chữ ký> <màu (nếu không đổi màu thì nhập no.)>\nXem list danh sách id nhân vật của modules\nhttps://listavataranime.repl.co\nVí dụ : taoanhdep 1 HyTommy HyToomyVjp red\n(Lưu ý: tên màu bằng tiếng anh hoặc nhập là tên màu hoặc là mã hex)",
    commandCategory: "image",
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
        "request": "",
        "axios": "",
    }
};
module.exports.handleReply = async function ({ event, api, handleReply }) {
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    if (handleReply.author != event.senderID) return;
    const { threadID, messageID, senderID, body } = event;
    var id = handleReply.id;
    const name = this.config.name;
    var info = await api.getUserInfo(event.senderID);
    var nameSender = info[event.senderID].name;
    var arraytag = [];
        arraytag.push({id: event.senderID, tag: nameSender});
    switch (handleReply.type) {
      case "signature": {
        var id = handleReply.id;
        api.unsendMessage(handleReply.messageID);
        return api.sendMessage(`🔍 Bạn đã chọn chữ nền là ${event.body}\n\n(Reply tin nhắn này nhập vào chữ ký của bạn)`,threadID, function (err, info) {
          return global.client.handleReply.push({
                    type: "color",
                    name,
                    author: senderID,
                    id: id,
                    nen: event.body,
                    messageID: info.messageID
                });
        },messageID)
      }
      case "color": {
        var nen = handleReply.nen;
        var id = handleReply.id;
        api.unsendMessage(handleReply.messageID);
        return api.sendMessage(`🔍 Bạn đã chọn chữ ký : ${event.body}\n\nNhập màu của bạn (lưu ý: nhập tên tiếng anh của màu - Nếu không muốn nhập màu thì nhập "no")(Reply tin nhắn này)`,threadID, function (err, info) {
          return global.client.handleReply.push({
                    type: "create",
                    name,
                    author: senderID,
                    id: id,
                    nen: nen,
                    ky: event.body,
                    messageID: info.messageID
                });
        },messageID) 
      }
      case "create": {
        var nen = handleReply.nen;
        var id = handleReply.id;
        var ky = handleReply.ky;
        var color = event.body;
        var color2 = ``;
        api.unsendMessage(handleReply.messageID);
        if (color == "no") var color = `000000`;
        api.sendMessage(`⏳ Đang khởi tạo chương trình tạo ảnh!`,threadID,messageID);
        setTimeout(() => {
          api.unsendMessage(info.messageID);
                },10000);
                var callback = () => api.sendMessage({body:`Đây là avatar của ${nameSender}\nMã số nhân vật: ${id}\nChữ nền: ${nen}\nChữ ký: ${ky}\nMàu nền: ${color}`,mentions: arraytag,attachment: fs.createReadStream(__dirname + "/cache/taoanhdep.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/taoanhdep.png"),event.messageID); 
       return request(encodeURI(`https://taoanhdep.kaysil.dev/v1/wibu/create?id_nhanvat=${id}&chu_nen=${nen}&chu_ky=${ky}&mau_nen=${color}`)).pipe(fs.createWriteStream(__dirname+'/cache/taoanhdep.png')).on('close',() => callback());     
      }
    }
   }
module.exports.run = async function({ api, event, args,permssion }) {
      const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const { threadID, messageID, senderID, body } = event;

     if (args[0] == "color") {
        var callback = () => api.sendMessage({body:`Bảng Màu Tiếng Anh.`,attachment: fs.createReadStream(__dirname + "/cache/taoanhdep.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/taoanhdep.png"),event.messageID); 
       return request(encodeURI(`https://www.studytienganh.vn/upload/2017/08/40.jpg`)).pipe(fs.createWriteStream(__dirname+'/cache/taoanhdep.png')).on('close',() => callback());    
    } 
    else if (args[0] == "--help") {
      var s = args[1];
      if (s != "all") {
      if (s == "color") {
        var reason = `Dùng để xem danh sách màu!`;
      }
      else if (s == "list") {
        var reason = `Dùng để xem danh sách dữ liệu hiện có!`;
      }
      else if (s == "info") {
        var reason = `Xem info của 1 id nào đó!`;
      }
      else {
        return api.sendMessage(`<${s}> Không tồn tại!`,threadID,messageID);
      }
      return api.sendMessage(`${global.config.PREFIX}${this.config.name} ${s} <${reason}>`,threadID,messageID);
      }
      else {
        var lmao = `${global.config.PREFIX}${this.config.name} `;
        var msg = `${lmao}color <Dùng để xem danh sách màu!>\n\n${lmao}--list <Dùng để xem danh sách dữ liệu hiện có!>\n\n${lmao}--info [mã nhân vật] <Xem info của 1 id nào đó!>`;
        return api.sendMessage(msg,threadID,messageID);
      }
    }
    else if (args[0] == "--info") {
      axios.get(`https://taoanhdep.kaysil.dev/v1/wibu/list`).then(res => {
        var id = args[1];
        let data = res.data.data[id];
        if (!data) return api.sendMessage(`<${id}> Không có trong dữ liệu!`,threadID,messageID);
        else {
          let nameMain = res.data.data[id].characterName;
          let link = res.data.data[id].imageUrl;
          let ext = res.data.data[id].imageUrl.substring(res.data.data[id].imageUrl.lastIndexOf(".") + 1);
            let callback = function () {
                    api.sendMessage({
            body:`ID nhân vật: ${id}\nTên nhân vật: ${nameMain}`,
                        attachment: fs.createReadStream(__dirname + `/cache/infotaoanhdep.${ext}`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/infotaoanhdep.${ext}`), event.messageID);
                };
                request(res.data.data[id].imageUrl).pipe(fs.createWriteStream(__dirname + `/cache/infotaoanhdep.${ext}`)).on("close", callback);
        }
      })
    }
  else if (args[0] == "--list") {
    axios.get(`https://taoanhdep.kaysil.dev/v1/wibu/list`).then(res => {
      var count = res.data.data.length;
      var data = res.data.data
      var page = 1;
      page = parseInt(args[1]) || 1;
      page < -1 ? page = 1 : "";
      var limit = 15;
      var numPage = Math.ceil(count/limit);
      var msg = ``;
      for(var i = limit*(page - 1); i < limit*(page-1) + limit; i++){
         if(i >= count) break;
        msg += `${i+1}/ ID Nhân Vật: ${data[i].characterId} -> Name Nhân Vật: ${data[i].characterName}\n`;
      }
      msg += `<-Trang ${page}/${numPage}->\nDùng ${global.config.PREFIX}${this.config.name} --list <số trang>`;
      return api.sendMessage(msg, threadID,messageID);
    });
  }
  else {
    if (senderID == api.getCurrentUserID()) return;
    const name = this.config.name;
    var id = args[0];
   return api.sendMessage(`🔍 Đã tìm thấy ID nhân vật : ${id}\n\n(Reply tin nhắn này và chọn chữ nền cho hình ảnh của bạn)`,event.threadID, (err, info) => {
     return global.client.handleReply.push({
            type: "signature",
            name,
            author: senderID,
            id: id,
            messageID: info.messageID
        });
    },event.messageID);
}
  }