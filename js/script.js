var client = new Paho.MQTT.Client("Diginet.mt.haw-hamburg.de", Number(80), "/ws" , "clientID_" + parseInt(Math.random() * 100, 10));

function onStart(){
	

	var RGBChange = function() {
		$('#RGB').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
	};

	var r = $('#R').slider()
			.on('slide', RGBChange)
			.data('slider');
	var g = $('#G').slider()
			.on('slide', RGBChange)
			.data('slider');
	var b = $('#B').slider()
			.on('slide', RGBChange)
			.data('slider');

	
	
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect,userName : "haw",
    password : "schuh+-0"});
	
	// called when the client connects
function onConnect() {
	alert("Connected to Pino-Matrix");
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("Pino-Matrix");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "Pino-Matrix";
 // client.send(message);
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

function onSliderChanged(){
	let slider = document.getElementById("R");
	let red = slider.value;
	
	slider = document.getElementById("G");
	let green = slider.value;

	slider = document.getElementById("B");
	let blue = slider.value;
	

}
onSliderChanged();
	
}

function onClick(){
	
	let slider = document.getElementById("R");
	let red = slider.value;
	
	slider = document.getElementById("G");
	let green = slider.value;

	slider = document.getElementById("B");
	let blue = slider.value;
	
	let submitBtn = document.getElementById("submit");
	let input = document.getElementById("text");
	let userMessage = input.value +";" + red.toString() + ";" + green.toString() + ";" + blue.toString() +":";


	  message = new Paho.MQTT.Message(userMessage);
	  message.destinationName = "Pino-Matrix";
	  client.send(message);
	  

	
		

}



