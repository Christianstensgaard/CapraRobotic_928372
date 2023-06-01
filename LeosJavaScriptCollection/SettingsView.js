// import {inputTypes, IoModel} from "./ModuleBuilder"
// import {listSection} from "./listBuilder"

import { blueprints } from "./listBuilder.js";
import { inputTypes } from "./ModuleBuilder.js";
import {ElementBuilder} from "./CoreBuilder.js";

var mainContainer = document.getElementById('Main');

class TopicModel {
  constructor(headerTitle, ...inputModels) {
    this.headerTitle = headerTitle;
    this.inputModels = inputModels;
  }
}
class InputModel {
  constructor(topic, name, inputType) {
    this.topic = topic;
    this.name = name;
    this.inputType = inputType;
  }
}

const topicModels = [
  new TopicModel(
    'Ultrasound',
    new InputModel('capra/service/tier0/sensors/ultrasound/mode', 'mode', inputTypes.int(undefined))
  ),

  new TopicModel(
    'Position',
    new InputModel('#', 'X', inputTypes.float(0)),
    new InputModel('#', 'Y', inputTypes.float(0)),
    new InputModel('#', 'Z', inputTypes.float(0))
  ),

  new TopicModel(
    'Router',
    new InputModel('#', 'Username', inputTypes.string(0)),
    new InputModel('#', 'Password', inputTypes.string(0)),
    new InputModel('#', 'Wifi', inputTypes.bool(0))
  ),


  new TopicModel(
    'Sounds',
    new InputModel('#', 'Turning_Sound', inputTypes.file())
  )



];

document.addEventListener('DOMContentLoaded', function() {

  const brokerUrl = 'localhost';
    const brokerPort = 8883;
    const client = new Paho.MQTT.Client(brokerUrl, brokerPort, 'WebBigBalls');

    // Function to initialize the MQTT client
    function initializeClient() {
      // Set up the MQTT client


      // Set up the connection options
      const connectOptions = {
        onSuccess: onConnect,
        onFailure: onFailure
      };

      // Set up the message callback
      client.onMessageArrived = onMessageArrived;

      // Connect to the MQTT broker
      client.connect(connectOptions);

      // Function called on successful connection
      function onConnect() {
        console.log('Connected to MQTT broker');

        // Subscribe to a topic
        client.subscribe('capra/robot/status/core');

        // Publish a message to a topic
        const message = new Paho.MQTT.Message('10');
        message.destinationName = 'capra/service/tier0/sensors/ultrasound/mode';
        client.send(message);
      }

      // Function called on connection failure
      function onFailure(error) {
        console.error('Failed to connect:', error);
      }

      // Function called when a message arrives
      function onMessageArrived(message) {
        console.log('Received message:', message.payloadString);
        const data = JSON.parse(message.payloadString);

        // Extract the title and value
        const title = Object.keys(data)[0];
        const value = data[title];

        console.log("Title:", title);
        console.log("Value:", value);
      }
    }



  // Running all the topics
  for (let a = 0; a < topicModels.length; a++) {

    //- Creating an instance of the ListSectionBuilder

    //- Getting the header title
    var title = topicModels[a].headerTitle;
    var collectionBuffer = [];

    //- Getting all the topics from the 
    for(let b = 0; b < topicModels[a].inputModels.length; b++){
      collectionBuffer.push(
        new ElementBuilder().type('tr').appendElements(
          new ElementBuilder().type('td').css('px-6 py-4').appendElements(
            new ElementBuilder().type('div').css('flex items-center').appendElements(
              inputTypes.moduleTitle(topicModels[a].inputModels[b].name)
            )
          ),
      
          new ElementBuilder().type('td').css('px-6 py-4')
          .appendElements(
            new ElementBuilder()
              .type('div')
              .css('flex items-center')
              .appendElements(
                topicModels[a].inputModels[b].inputType
              )

          .appendElements(
              new ElementBuilder()
                .type('button')
                .css('ml-2')
                .innerText('Save')
                .event('click', ()=>{
                  let obj = topicModels[a].inputModels[b].inputType.getId();

                  const message = new Paho.MQTT.Message(document.getElementById(obj).value);
                  message.destinationName = 'capra/service/tier0/sensors/ultrasound/mode';
                  client.send(message);
                  

                  console.log(document.getElementById(obj).value);
                })
          )
          // ...
          ))
      )

      //- Create the element for the table
      
    }
    mainContainer.appendChild(blueprints.listSection(title, collectionBuffer))
  }




  initializeClient();
});

    // const brokerUrl = 'localhost';
    // const brokerPort = 8883;

    // // Function to initialize the MQTT client
    // function initializeClient() {
    //   // Set up the MQTT client

    //   const client = new Paho.MQTT.Client(brokerUrl, brokerPort, 'WebBigBalls');
    //   clientv = client;

    //   // Set up the connection options
    //   const connectOptions = {
    //     onSuccess: onConnect,
    //     onFailure: onFailure
    //   };

    //   // Set up the message callback
    //   client.onMessageArrived = onMessageArrived;

    //   // Connect to the MQTT broker
    //   client.connect(connectOptions);

    //   // Function called on successful connection
    //   function onConnect() {
    //     console.log('Connected to MQTT broker');

    //     // Subscribe to a topic
    //     client.subscribe('capra/robot/status/core');

    //     // Publish a message to a topic
    //     const message = new Paho.MQTT.Message('10');
    //     message.destinationName = 'capra/service/tier0/sensors/ultrasound/mode';
    //     client.send(message);
    //   }

    //   // Function called on connection failure
    //   function onFailure(error) {
    //     console.error('Failed to connect:', error);
    //   }

    //   // Function called when a message arrives
    //   function onMessageArrived(message) {
    //     console.log('Received message:', message.payloadString);
    //     const data = JSON.parse(message.payloadString);

    //     // Extract the title and value
    //     const title = Object.keys(data)[0];
    //     const value = data[title];

    //     console.log("Title:", title);
    //     console.log("Value:", value);
    //   }
    // }


