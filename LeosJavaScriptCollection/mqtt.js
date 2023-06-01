import '../LeosJavaScriptCollection/';


const hostName = 'localhost';
const port = 8883;


export class MqttConnection{

    constructor(address, port){
        mqtt.initClient(address, port);
    }
    
}




const mqtt = {
    isActive: false,
    subscriptTopics: subscripeTopics,
    client,

    initClient:function(host, port){
        this.client = new Paho.MQTT.Client(host, port, 'WebBigBalls');
      // Set up the connection options
      const connectOptions = {
        onSuccess: this.onConnect,
        onFailure: this.onFailure
      };

      // Set up the message callback
      client.onMessageArrived = this.onMessageArrived;

      // Connect to the MQTT broker
      client.connect(connectOptions);

      // Function called on successful connection
      
      
      
      
      
    },
    
    onConnect:function() {
      console.log('Connected to MQTT broker');

      // Subscribe to a topic
      client.subscribe('capra/robot/status/core');

      // Publish a message to a topic
      const message = new m.Paho.MQTT.Message('0');
      message.destinationName = 'capra/service/tier0/sensors/ultrasound/mode';
      client.send(message);
    },

    onFailure:function(){
        console.error('Failed to connect:', error);
    },

    onMessageArrived:function(message){
        console.log('Received message:', message.payloadString);
        const data = JSON.parse(message.payloadString);

        // Extract the title and value
        const title = Object.keys(data)[0];
        const value = data[title];

        console.log("Title:", title);
        console.log("Value:", value);
    }
}