 emmodule.exports.config = {
	name: "gái2",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Khánh Milo",
	description: "NGẮM GÁI NÀO CÁC BẠN",
	commandCategory: "IMAGE",
	usages: "",
    cooldowns: 5,
    dependencies: {
     "axios": "",
     "fs-extra": ""
    }
};

module.exports.run = async function ({ event, api }) {
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];
    var getlink = (await axios.get(`https://6ad18d86-42f6-49ce-86c1-367e843f854b.id.repl.co/gai`)).data;
    var url = getlink.url
    var stt = getlink.stt
    var length = getlink.length
    var getimg = (await axios.get(url, {responseType: "arraybuffer"})).data;
    fs.writeFileSync(__dirname + `/cache/${event.senderID}-${event.threadID}.png`, Buffer.from(getimg, "utf-8")); 
    api.sendMessage({body: `ảnh số : (${stt}/${length})`,attachment: fs.createReadStream(__dirname + `/cache/${event.senderID}-${event.threadID}.png`)}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.senderID}-${event.threadID}.png`), event.messageID);

    console.log(getlink)
}