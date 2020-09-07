import {ALPHABET, DECODE, ENCODE, STANDARD, AUTO, FULL, EXTENDED, SUPER} from '../static/index';
class Utils{

    create2DArray(rows, columns, value = (x, y) => 0) {
        var array = new Array(rows);
        for (var i = 0; i < rows; i++) {
        array[i] = new Array(columns);
        for (var j = 0; j < columns; j++) {
            array[i][j] = value(i, j);
        }
        }
    
        return array;
    }
    vigenereStandard(input,initkey,type){
    
        let key = initkey.toUpperCase();
    
        let updateInput = input.replace(/[^a-zA-Z0-9+]/g, "").toUpperCase()
        //create key
            for (let i = 1; i < updateInput.length/initkey.length-1; i++) {
            
            key += key; 
            }
    
            for( let i = 0 ; i < updateInput.length%initkey.length;i++){
            key+=key[i];
            }
    
    
    
        //start viginere
        let output = "";
        for (let i = 0; i < updateInput.length; i++) {
        let currentLetter = updateInput[i];
        if (i % 5 === 0 && type === ENCODE){
            output+=" ";
        }
        // if (currentLetter === " " || !currentLetter.match(/[A-Z]/g)) { 
        //   output += currentLetter;
        //   continue;
        // }
    
        let currentIndex;
        if (type === ENCODE){
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
    
        return output
    
    
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
    return output;
  
  
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
  
      return output;
    
  }
  fullVigenere(input,initkey,type){
    let key = initkey;
  
    let updateInput = input
    let output="";
  
    var array = this.create2DArray(26, 26, (row, column) => row + column);
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
  
  
    return output; 
  }
}
  export default new Utils();