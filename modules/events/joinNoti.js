module.exports.config = {
	name: "joinNoti",
	eventType: ["log:subscribe"],
	version: "1.0.1",
	credits: "CatalizCS",
	description: "Thông báo bot hoặc người vào nhóm có random gif/ảnh/video",
	dependencies: {
		"fs-extra": "",
		"path": "",
		"pidusage": ""
	}
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

	const path = join(__dirname, "cache", "joinGif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event }) {
	const { join } = global.nodemodule["path"];
	const { threadID } = event;
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "Made by CatalizCS and SpermLord" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		const fs = require("fs");
		return api.sendMessage("", event.threadID, () => api.sendMessage({body:`Đã 𝙠ế𝙩 𝙣ố𝙞 𝙩𝙝à𝙣𝙝 𝙘ô𝙣𝙜! 𝘽𝙤𝙩 𝙣à𝙮 đượ𝙘 𝙩ạ𝙤 𝙧𝙖 𝙗ở𝙞 𝘾𝙖𝙩𝙖𝙡𝙞𝙯𝘾𝙎 𝙫à 𝙎𝙥𝙚𝙧𝙢𝙇𝙤𝙧𝙙 𝘾ả𝙢 ơ𝙣 𝙗ạ𝙣 đã 𝙨ử 𝙙ụ𝙣𝙜 𝙨ả𝙣 𝙥𝙝ẩ𝙢 𝙘ủ𝙖 𝙘𝙝ú𝙣𝙜 𝙩ô𝙞, 𝙘𝙝ú𝙘 𝙗ạ𝙣 𝙫𝙪𝙞 𝙫ẻ 𝙐𝙬𝙐 ❤.𝘽𝙤𝙩 Của Toàn Đã 𝙆ế𝙩 𝙉ố𝙞 𝙑ớ𝙞 𝘽𝙤𝙭 𝘾𝙝𝙖𝙩, 𝙇𝙞ê𝙣 𝙃ệ 𝙑ớ𝙞 𝙏ô𝙞 𝙌𝙪𝙖 𝙁𝙖𝙘𝙚𝘽𝙤𝙤𝙠: https://www.facebook.com/tuilatoanne1. 𝘾𝙝ú𝙘 𝘾á𝙘 𝘽ạ𝙣 𝙏𝙧ả𝙞 𝙉𝙜𝙝𝙞ệ𝙢 𝘽𝙤𝙩 𝙑𝙪𝙞 𝙑ẻ 𝙑à 𝙈𝙤𝙣𝙜 𝘾á𝙘 𝘽ạ𝙣 𝙆𝙝ô𝙣𝙜 𝙇ạ𝙢 𝘿ụ𝙣𝙜 Để 𝙈𝙪𝙖 𝘽á𝙣 𝘽𝙤𝙩 𝙑ì 𝙏ấ𝙩 𝘾ả 𝘽𝙤𝙩 Đề𝙪 𝙇à 𝙈𝙞ễ𝙣 𝙋𝙝í 𝙉𝙝é😉 𝙆𝙝ô𝙣𝙜 𝙎𝙥𝙖𝙢, 𝙋𝙝á 𝘽𝙤𝙩 𝘿ướ𝙞 𝙈ọ𝙞 𝙃ì𝙣𝙝 𝙏𝙝ứ𝙘 𝙈ã𝙞 𝙄𝙪 𝙐𝙬𝙐 🐧❤`, attachment: fs.createReadStream(__dirname + "/cache/joinbox/join.mp4")} ,threadID));
	}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);

			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinGif");
			const pathGif = join(path, `${threadID}.gif`);

			var mentions = [], nameArray = [], memLength = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
				const userName = event.logMessageData.addedParticipants[id].fullName;
				nameArray.push(userName);
				mentions.push({ tag: userName, id });
				memLength.push(participantIDs.length - i++);
			}
			memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = "𝘾𝙝à𝙤 𝙢ừ𝙣𝙜 𝙘𝙤𝙣 𝙫ợ {name} .\n𝘾𝙝à𝙤 𝙢ừ𝙣𝙜 đã đế𝙣 𝙫ớ𝙞 𝙣𝙝ó𝙢 {threadName} .\n{type} 𝙡à 𝙩𝙝à𝙣𝙝 𝙫𝙞ê𝙣 𝙩𝙝ứ {soThanhVien} 𝙘ủ𝙖 𝙣𝙝ó𝙢. 𝙏ươ𝙣𝙜 𝙩á𝙘 𝙣𝙝𝙞ề𝙪 𝙫à𝙤 𝙣𝙝é 𝙠𝙝ô𝙣𝙜 𝙡à 𝙗ị đá 𝙧𝙖 𝙠𝙝ỏ𝙞 𝙣𝙝ó𝙢 đấ𝙮 🥳" : msg = threadData.customJoin;
			msg = msg
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  'các bạn' : 'bạn')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else if (randomPath.length != 0) {
				const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
				formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
			}
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
}