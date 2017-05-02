var login = require("facebook-chat-api");
 
var answeredThreads = {};
 
// Create simple echo bot
login({email: "hoanghyhi@gmail.com", password: "2402IThuy???"}, function callback (err, api) {
    if(err) return console.error('err', err);
 
    api.listen(function callback(err, message) {
        console.log(message.threadID);
        if(!answeredThreads.hasOwnProperty(message.threadID)){
            answeredThreads[message.threadID] = true;
            api.sendMessage("BOT - Hiện tại Huy đang làm đồ án, các bạn thông cảm !!!", message.threadID);
        }
    });

    api.listen(function callback(err, message) {
        var d = new Date();
        var h = d.getHours();
        if(h >= 20 && h <= 7 && !answeredThreads.hasOwnProperty(message.threadID)){
            api.getUserInfo(message.senderID, function(err, ret) {
                if(err) return console.error(err);
                console.log(ret);
                for(var prop in ret) {
                    if(ret.hasOwnProperty(prop) && ret[prop].name) {
                        api.sendMessage( "BOT : Xin lỗi nha " + ret[prop].name + ", Giờ ngủ rồi, nhắn tin gì nữa má.", prop, function(){
                            answeredThreads[message.threadID] = true;
                        });
                    }
                }
            });
        }
    });
});