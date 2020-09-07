import {ALPHABET, DECODE, ENCODE, STANDARD, AUTO, FULL, EXTENDED, SUPER} from '../static/index';
import { Col } from 'reactstrap';
class Utils{
    exists(array, keyIndex,alphabet) {
        let text =""
        
        
     
        for (var i = 0; i <array.length; i++) {
            if (array[keyIndex][i] === alphabet){

                text = ALPHABET[i]
            }
      }

      return text
    }
    create2DArray(rows, columns,key) {
        var array = new Array(rows);
        for (var i = 0; i < rows; i++) {
  
        array[i] = new Array(columns);
        let list = this.generateRandomAlphabet(key,i);
        for (var j = 0; j < columns; j++) {
          
            array[i][j] = ALPHABET[list[j]];
            
        }
        }
    
        return array;
    }

    generateRandomAlphabet (initkey,index){
        let key = initkey.toUpperCase()
        let list = [0,1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]

        let totalIndex =0;
        for (let i = 0 ; i < key.length;i++){
            totalIndex+= ALPHABET.indexOf(key[i])
            
        }

        
        let seed = ALPHABET.length/totalIndex+index

        let currentIndex = list.length, temporaryValue, randomIndex;
        seed = seed || 1;
        let random = function() {
          var x = Math.sin(seed++) * 10000;
          return x - Math.floor(x);
        };
     
        while (0 !== currentIndex) {
       
          randomIndex = Math.floor(random() * currentIndex);
          currentIndex -= 1;
      
          temporaryValue = list[currentIndex];
          list[currentIndex] = list[randomIndex];
          list[randomIndex] = temporaryValue;
        }

    return list;
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
    let key = initkey.toUpperCase();
  
    let updateInput =input.replace(/[^a-zA-Z0-9+]/g, "").toUpperCase()
    let output="";
  
    var array = this.create2DArray(26, 26, key);

      //create key
      let shift;
      let keyIndex =0;
  
      if (type === ENCODE){
          for (let i = 0; i < updateInput.length; i++) {
            if (i % 5 === 0 && type === ENCODE){
                output+=" ";
              }
              let keyAlphabetIndex = ALPHABET.indexOf(key[keyIndex])
             let inputIndex = ALPHABET.indexOf(updateInput[i])
           
             let newLetter =array[keyAlphabetIndex][inputIndex];
           
              keyIndex++;
              keyIndex = keyIndex % key.length
              
              
              output+=newLetter
            }
      } else {
        
          for (let i = 0; i < updateInput.length; i++) {
              let currentLetter = updateInput[i];
              let keyAlphabetIndex = ALPHABET.indexOf(key[keyIndex])
             output+=this.exists(array,keyAlphabetIndex,currentLetter);
              keyIndex++;
              keyIndex = keyIndex % key.length
              
            }
      }
  
  
    return output; 
  }
}
  export default new Utils();