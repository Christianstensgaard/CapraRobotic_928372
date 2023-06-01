/**Used to create different elements*/
/**Creating the different Html elements for the DOM */
export class ElementBuilder{

  constructor(){
    this.element = undefined;
    this.idValue;
  }

  type(type){
    this.element = document.createElement(type);
    return this;
  }

  css(css){
    this.element.className = css;
    return this;
  }

  attribute(type, value){
    this.element.setAttribute(type, value);
    return this;
  }

  event(type, func){
    this.element.addEventListener(type, func);
    return this;
  }

  id(value){
    this.idValue = value;
    this.element.id = this.idValue;
    return this;
  }

  getId(){

    return this.idValue;
  }

  storeId(value){
    this.idValue = value;
    return this;
  }

  innerText(text){
    this.element.textContent = text;
    return this;
  }

  /**
   * Append a ElementBuilder to  a element, don't call build() here
   * @param  {...any} ElementBuilder Elementbuilder Class
   */
  appendElements(...element){
    element.forEach(e =>{
      this.element.appendChild(e.build());
    })
    return this;
  }

  build(){
    return this.element;
  }

}