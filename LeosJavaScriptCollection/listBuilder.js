import {ElementBuilder} from "./CoreBuilder.js"
import {inputTypes, IoModel} from "./ModuleBuilder.js"

export const blueprints = {



  




    /**
     * Create a section, this is used in the settingsView. 
     * @param  {...any} ModuleModels Takes the ModuleModel Class as parameters
     */
      
      listSection: function(sectionName, moduleCollection) {
        return new ElementBuilder()
          .type('div')
          .css('mt-16 ml-0 mr-4')
          .appendElements(
            // Section Button
            new ElementBuilder()
              .type('button')
              .css(
                'flex items-center justify-between w-full px-4 py-2 m-1 font-bold text-white bg-gray-800 hover:bg-gray-900'
              )
              .appendElements(
                // Inside the button for styling
                new ElementBuilder()
                  .type('span')
                  .css('flex items-center')
                  .appendElements(
                    new ElementBuilder()
                      .type('span')
                      .css('mr-2')
                      .innerText(sectionName)
                      .appendElements(
                        new ElementBuilder()
                          .type('svg')
                          .css('w-4 h-4 fill-current')
                          .attribute('xmlns', 'http://www.w3.org/2000/svg')
                          .attribute('viewBox', '0 0 20 20')
                          .appendElements(
                            new ElementBuilder()
                              .type('path')
                              .attribute('d', 'M6 10L14 10L10 14L6 10Z')
                          )
                      )
                  )
              ),
      
            new ElementBuilder()
              .type('div')
              .css('flex flex-col')
              .appendElements(
                new ElementBuilder()
                  .type('div')
                  .css('-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8')
                  .appendElements(
                    new ElementBuilder()
                      .type('div')
                      .css('inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8')
                      .appendElements(
                        new ElementBuilder()
                          .type('div')
                          .css('overflow-hidden border-b border-gray-200 shadow sm:rounded-lg')
                          .appendElements(
                            new ElementBuilder()
                              .type('table')
                              .css('min-w-full')
                              .appendElements(
                                new ElementBuilder()
                                  .type('thead')
                                  .css('bg-gray-50')
                                  .appendElements(
                                    new ElementBuilder()
                                      .type('tr')
                                      .appendElements(
                                        // Description
                                        new ElementBuilder()
                                          .type('th')
                                          .css(
                                            'px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                                          )
                                          .attribute('scope', 'col')
                                          .innerText('Description'),
      
                                        // IO
                                        new ElementBuilder()
                                          .type('th')
                                          .css(
                                            'px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                                          )
                                          .attribute('scope', 'col')
                                          .innerText('IO')
                                      )
                                  ),
      
                                new ElementBuilder()
                                  .type('tbody')
                                  .css('bg-white divide-y divide-gray-200')
                                  .appendElements(
                                    // Call the Json Parser function, to convert from Json to Module elements.
                                    ...moduleCollection
                                  )
                              )
                          )
                      )
                  )
              )
          )
          .build();
      }
      
    }



    







  
  