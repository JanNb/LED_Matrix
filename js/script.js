var client = new Paho.MQTT.Client("kassiopeia.mt.haw-hamburg.de", Number(8000), "/ws" , "clientID_" + parseInt(Math.random() * 100, 10));

function start(){
// Create a client instance
//var client = new Paho.MQTT.Client("kassiopeia.mt.haw-hamburg.de", Number(8000), "/ws" , "clientID_" + parseInt(Math.random() * 100, 10));
//tcp://kassiopeia.mt.haw-hamburg.de
// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});
	
	// called when the client connects
function onConnect() {
	alert("Connected to Led-Matrix");
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("ShayanTest");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "ShayanTest";
  client.send(message);
}
	// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}
	// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}
	
}

function onClick(){
	
	let submitBtn = document.getElementById("submit");
	let input = document.getElementById("text");
	let userMessage = input.value;


	  message = new Paho.MQTT.Message(userMessage);
	  message.destinationName = "ShayanTest";
	  client.send(message);

	
		

}


