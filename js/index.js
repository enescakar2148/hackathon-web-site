var db = firebase.firestore();
var messages = [];
var dates = [];
var senders = [];
var sendeddates = [];
var listeningRoomId;
var ulist = $(".messages_list");
let d = new Date()
let dstr = (d.toString().substring(0, 10)+d.toString().substring(15,31)+":"+d.toString().substring(31,33)+" "+d.toString().substring(11,15))
/*console.log(d.toString().substring(15,31))
console.log(d.toString().substring(31,33))
console.log(d.toString().substring(11,15))
*/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userMail = urlParams.get('email')
console.log(userMail)
var chatIdSetter = (item) =>{
	listeningRoomId = item.id
	console.log("From now on listening to room: "+listeningRoomId)
	$(".bubble").remove();
	messages = []
	dates = []
	senders = []
	sendeddates = []
	messageListener(listeningRoomId);
}
var messageHandler = () => {
	let messageInput = $("#message_input")
	let dateInstance = new Date()
	let dateHour = dateInstance.getHours().toString()
	let dateMin =  dateInstance.getMinutes().toString()
	let dateSec =  dateInstance.getSeconds().toString()
	let sender = userMail;
	let d = new Date()
	let dstr = (d.toString().substring(0, 10)+d.toString().substring(15,31)+":"+d.toString().substring(31,33)+" "+d.toString().substring(11,15))

	if (dateHour.length == 1) {
		dateHour = "0"+dateHour
	}
	if (dateMin.length == 1) {
		dateMin = "0" +dateMin
	}
	if (dateSec.length == 1) {
		dateSec = "0" +dateSec
	}
	let date = dateHour +":"+dateMin +":"+ dateSec
	
	if (messageInput.val()&&listeningRoomId) {
		console.log(messageInput.val())	
		console.log(date)
		console.log(sender)
			db.collection("ChatRooms")
			.doc(listeningRoomId)
			.collection("Messages")
			.doc(dstr)
			.set({
		    Message: messageInput.val(),
		    Date: date,
		    Sender: sender
		})
		.then(() => {
		    console.log("Document successfully written!");
		})
		.catch((error) => {
		    console.error("Error writing document: ", error);
		});
		messageInput.val("")
		}
}

var messageListener = (listeningRoomId) => {
	db.collection("ChatRooms")
	.doc(listeningRoomId)
	.collection("Messages")
    .onSnapshot((querySnapshot) => {
    	querySnapshot.forEach((doc) => {
    		if (!dates.includes(doc.data().Date)) {
    			messages.push(doc.data().Message);
	    		senders.push(doc.data().Sender);
	    		dates.push(doc.data().Date);
	    		for (var i = 0; i < dates.length; i++) {
	    			if (!sendeddates.includes(dates[i])) {
	    				ulist.append('<div class="bubble"><img src="./images/mentormanimg.png" alt="avatar" id="avatar" /><div class="datas"><h2 id="mail">'+senders[i]+'</h2><p id="message">'+messages[i]+'</p></div></div>')
	    				sendeddates.push(dates[i]);
    				}
    			}
    		}
    	});
    	console.log("Current messages: ", messages.join(", "));
    })
}

//ulist.append('<li class="message_box"><div>Sender: a@b.com<span>Date: 19.19.19		</span></div><div>Message: asdfdasfa</div></li>')

/*
<div class="bubble">
            <img src="./images/mentormanimg.png" alt="avatar" id="avatar" />
            <div class="datas">
              <h2 id="mail">'+senders[i]+'</h2>
              <p id="message">
                '+messages[i]+'
              </p>
            </div>
          </div>
          */