function start(){
// Create a client instance
client = new Paho.MQTT.Client(broker.mqttdashboard.com, Number(8000), "clientId");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect, mqttVersion: 3});
	
	// called when the client connects
function onConnect() {
	alert("jaskdjhsljdasi");
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("Testthetopic");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "Testthetopic";
  client.send(message);
}
}

function onClick(){
	

alert("bsdfsdf");

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}
		let submitBtn = document.getElementById("submit");
		let input = document.getElementById("text");

    
    let message = input.value;
		

}
