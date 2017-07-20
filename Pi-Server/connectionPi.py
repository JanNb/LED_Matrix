import paho.mqtt.client as mqtt
import serial
import time

url = "diginet.mt.haw-hamburg.de"

#url = "broker.mqttdashboard.com"
#url = "kassiopeia.mt.haw-hamburg.de"
topic = "Pino-Matrix"
ser = serial.Serial('/dev/ttyACM0',9600)
s = [0]


def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc) + url)
    client.subscribe(topic)

def on_message(client, userdata , msg):
    payload = msg.payload.decode('utf-8')
    print(payload)
    ser.write(bytes(payload, 'UTF-8'))
                
#Hier gehts los
#client = mqtt.Client(transport="websockets") #Client object
client = mqtt.Client() #Client object
client.on_connect = on_connect #Callbacks registrieren
client.on_message = on_message
client.username_pw_set(username="haw",password="schuh+-0")
client.connect(url, 1883, 60) #Connect
client.loop_forever() #Abarbeiten von Paketen
