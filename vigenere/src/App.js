import React, { Component } from 'react';
import './App.css';
import {ALPHABET, DECODE, ENCODE, STANDARD, AUTO} from './constant.js';

function create2DArray(rows, columns, value = (x, y) => 0) {
  var array = new Array(rows);
  for (var i = 0; i < rows; i++) {
    array[i] = new Array(columns);
    for (var j = 0; j < columns; j++) {
      array[i][j] = value(i, j);
    }
  }

  return array;
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      key: '',
      output: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleOutputChange = this.handleOutputChange.bind(this);
    this.encode = this.encode.bind(this);
    this.decode = this.decode.bind(this);

  }
  handleInputChange(event) {
    this.setState({ input: (event.target.value) })
  }
  handleOutputChange(event) {
    this.setState({ output: event.target.value })
  }
  handleKeyChange(event) {
    this.setState({ key: event.target.value })
  }



  vigenereStandard(input,initkey,type){

    let key = initkey.toUpperCase();

    let updateInput = input.replace(/[^a-zA-Z0-9+]/g, "").toUpperCase()
      //create key
        for (let i = 1; i < updateInput.length/initkey.length-1; i++) {
         
          key += initkey; 
        }
  
        for( let i = 0 ; i < updateInput.length%initkey.length;i++){
          key+=initkey[i];
        }


   
  
      //start viginere
    let output = "";
    for (let i = 0; i < updateInput.length; i++) {
      let currentLetter = updateInput[i];
      
      if (currentLetter === " " || !currentLetter.match(/[A-Z]/g)) { 
        output += currentLetter;
        continue;
      }

      let currentIndex;
      if (type === 1){
        //encode
        currentIndex = (ALPHABET.indexOf(currentLetter) + ALPHABET.indexOf(key[i]))%26; 
      } else {
        //decode
        currentIndex = ((ALPHABET.indexOf(currentLetter) - ALPHABET.indexOf(key[i]))+26)%26; 
      }
      
  

      if (currentIndex - ALPHABET.length >= 0) { 
        currentIndex -= ALPHABET.length;
      }

      let newLetter = ALPHABET[currentIndex]; 

      output += newLetter;

    }
    this.setState({
      output: output
    })
  }

  vigenereAuto(input,initkey,type){
    let key = initkey.toUpperCase();

    let updateInput = input.replace(/[^a-zA-Z0-9+]/g, "").toUpperCase()
    
   
    let output = "";
    //console.log(key);
    if( type === ENCODE){
      //encode
      if (key.length <updateInput.length){
        var inputstr = updateInput.substr(0,updateInput.length-key.length)
        key += inputstr
      }
  
      for (let i = 0; i < updateInput.length; i++) {
        if (i % 5 === 0 && type === ENCODE){
          output+=" ";
        }
        let currentLetter = updateInput[i];
        
        if (currentLetter === " " || !currentLetter.match(/[A-Z]/g)) { 
          output += currentLetter;
          continue;
        }
  
        let currentIndex;
 
          //encode
          currentIndex = (ALPHABET.indexOf(currentLetter) + ALPHABET.indexOf(key[i]))%26; 
        
    
  
        if (currentIndex - ALPHABET.length >= 0) { 
          currentIndex -= ALPHABET.length;
        }
  
        let newLetter = ALPHABET[currentIndex]; 
  
        output += newLetter;
  
      }
      localStorage.setItem(AUTO, key);
    } else {

   //decode
    for (let i = 0; i < updateInput.length; i++) {

      let currentLetter = updateInput[i];
      
      if (currentLetter === " " || !currentLetter.match(/[A-Z]/g)) { 
        output += currentLetter;
        continue;
      }

      let currentIndex = ((ALPHABET.indexOf(currentLetter) - ALPHABET.indexOf(key[i])))%26; 
      
      
  

      if (currentIndex < 0) { 
        currentIndex += 26;
      }

      let newLetter = ALPHABET[currentIndex]; 

      output += newLetter;
      key+=newLetter;

    }
  }
    this.setState({
      output: output
    })


  }
  fullVigenere(input,initkey,type){
    let key = initkey;

    let updateInput = input
    let output="";

    var array = create2DArray(26, 26, (row, column) => row + column);
    console.log(array);

      //create key
      let shift;
      let keyIndex =0;

      if (type === ENCODE){
          for (let i = 0; i < updateInput.length; i++) {
              let currentLetter = updateInput[i];

              shift= (key.charCodeAt(keyIndex))-97
              console.log(shift)
              keyIndex++;
              keyIndex = keyIndex % key.length

          

              let currentIndex = (currentLetter.charCodeAt(0) + shift )% 256

              let newLetter = String.fromCharCode(currentIndex);
              output+=newLetter
            }
      } else {
          for (let i = 0; i < updateInput.length; i++) {
              let currentLetter = updateInput[i];

              shift= (key.charCodeAt(keyIndex))-97
              console.log(shift)
              keyIndex++;
              keyIndex = keyIndex % key.length

          

              let currentIndex = ((currentLetter.charCodeAt(0) - shift) )% 256
              if (currentIndex < 0){
                currentIndex +=256
              }
              let newLetter = String.fromCharCode(currentIndex);
              output+=newLetter;
            }
      }


    this.setState({
      output: output
    })  
  }
  extendedVigenere(input,initkey,type){
    let key = initkey;

    let updateInput = input
    let output="";



      //create key
      let shift;
      let keyIndex =0;

      if (type === ENCODE){
          for (let i = 0; i < updateInput.length; i++) {
              let currentLetter = updateInput[i];

              shift= (key.charCodeAt(keyIndex))-97
              console.log(shift)
              keyIndex++;
              keyIndex = keyIndex % key.length

          

              let currentIndex = (currentLetter.charCodeAt(0) + shift )% 256

              let newLetter = String.fromCharCode(currentIndex);
              output+=newLetter
            }
      } else {
          for (let i = 0; i < updateInput.length; i++) {
              let currentLetter = updateInput[i];

              shift= (key.charCodeAt(keyIndex))-97
              console.log(shift)
              keyIndex++;
              keyIndex = keyIndex % key.length

          

              let currentIndex = ((currentLetter.charCodeAt(0) - shift) )% 256
              if (currentIndex < 0){
                currentIndex +=256
              }
              let newLetter = String.fromCharCode(currentIndex);
              output+=newLetter;
            }
      }


    this.setState({
      output: output
    })  
  }
  encode() {
    
      this.vigenereAuto(this.state.input,this.state.key,ENCODE);


    }

  decode() {

          this.extendedVigenere(this.state.input,this.state.key,DECODE);
    
    
  }

    render() {
      return (
        <div className="App">
          <header className="App-header">
            <h3>Vigenère cipher</h3>
         
              <textarea id="input" value={this.state.input} onChange={this.handleInputChange} cols={40} rows={10} className="textarea" />
              <h1>Key:   <input type="text" id="key" onChange={this.handleKeyChange} /></h1>
              <button onClick={this.encode} className="button-primary">Encode</button>
              <button onClick={this.decode} className="button-primary">Decode</button>

              <div className="result">
                <h3>Result</h3>
                <textarea value={this.state.output} onChange={this.handleOutputChange} cols={80} rows={10} className="textarea" id="output" />
              </div>
           

           
          </header>
        </div>
      );
    };
  }
  export default App;