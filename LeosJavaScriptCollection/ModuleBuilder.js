/**Create the modules for the Mqtt settings, this file can create floats, int, bool, string etc. 
 * it will return a class with all information and the containing Html element.
 */
import { ElementBuilder } from "../LeosJavaScriptCollection/CoreBuilder.js" 

var id = 0;

export const inputTypes = {
    float:function(value){
        return new ElementBuilder().storeId(id)
        .type('div').appendElements(
            new ElementBuilder().type('input')
            .css('px-0.5 py-0.5 w-38 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none')
            .attribute('type', 'number')
            .attribute('step', '0.01')
            .attribute('placeholder', 'Enter a float value')
            .attribute('value', value)
            .id(id++)
        )
    },

    int:function(value){
        return new ElementBuilder().type('div').css('flex items-center').storeId(id).appendElements(
            new ElementBuilder().type('input')
            .css('px-0.5 py-0.5 w-38 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none')
            .attribute('type', 'number')
            .attribute('placeholder', 'Enter an integer value')
            .attribute('value', value)
            .id(id++)
        )
    },

    string:function(value){
        return new ElementBuilder().type('div').css('flex items-center').storeId(id).appendElements(
            new ElementBuilder().type('input')
            .css('px-0.5 py-0.5 w-38 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none')
            .attribute('type', 'text')
            .attribute('placeholder', 'Enter a string value')
            .attribute('value', value)
            .id(id++)
        )
    },

    bool:function(){
        return new ElementBuilder().type('div').css('relative inline-block w-10 mr-2 align-middle pr-16 select-none').storeId(id).appendElements(

                new ElementBuilder().type('label').css('switch').appendElements(
                    new ElementBuilder().type('input')
                    .attribute('type', 'checkbox')
                    .id(id++),

                    new ElementBuilder().type('span')
                    .css('slider round')
                )
        )
    },

    file:function(){
        return new ElementBuilder()
    .type('div')
    .css('relative inline-block mr-2 align-middle select-none')
    .appendElements(
      new ElementBuilder()
        .type('label')
        .css('relative inline-flex items-center cursor-pointer')
        .appendElements(
          new ElementBuilder()
            .type('input')
            .attribute('type', 'file')
            .css('sr-only')
            .id(id++),
            
          new ElementBuilder()
            .type('span')
            .css('bg-gray-300 hover:bg-gray-400 text-white rounded-md px-2 py-1')
            .innerText('Choose File')
        )
    );
    },

    moduleTitle:function(title){
        return new ElementBuilder().type('label').css('px-1 py-1   border-gray-300 focus:outline-none').innerText(title);
    }
}


export class IoModel{
    constructor(value, ElementBuilder_Title, ElementBuilder_Input){
        this.ElementBuilder_Input = ElementBuilder_Input;
        this.ElementBuilder_Title = ElementBuilder_Title;
        this.value = value;
    }
}













