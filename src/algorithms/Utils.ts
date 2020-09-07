const removeSpaces = (input: string): string => {
    return input.replace(/\s/g, '');
};

const reverseString = (input: string): string => {
    return input.split('').reverse().join('');
};

const removeNonAlphabet = (input: string): string => {
    const lowerCased = input.toLowerCase();
    const alphabetOnly = lowerCased.replace(/[^a-z]/g, '');
    return alphabetOnly;
};

const removeDuplicateAlphabet = (input: string): string => {
    const reversedString = reverseString(input);
    // Reverse string because regex retains last occurence of every char but we want first occurence
    const noDuplicate = reversedString.replace(/(.)(?=.*\1)/g, '');
    const reverseToOriginal = reverseString(noDuplicate);
    return reverseToOriginal;
};

const getCharCode = (singleChar: string): number => {
    return singleChar.charCodeAt(0);
};

const getCharIdx = (singleChar: string): number => {
    return singleChar.charCodeAt(0) - 'a'.charCodeAt(0);
};

const getCharFromCharCode = (charCode: number): string => {
    return String.fromCharCode(charCode);
};

const getCharFromCharIdx = (charIdx: number): string => {
    const charCode = charIdx + 'a'.charCodeAt(0);
    return String.fromCharCode(charCode);
};

const modulo = (a: number, b: number): number => {
    return ((a % b) + b) % b;
};

// a.x + b.y = gcd(a,b)
const extendedEuclidean = (
    a: number,
    b: number,
): { gcd: number; x: number; y: number } => {
    if (a === 0) {
        return { gcd: b, x: 0, y: 1 };
    }

    const { gcd, x: x1, y: y1 } = extendedEuclidean(b % a, a);

    const x = y1 - Math.floor(b / a) * x1;
    const y = x1;
    return { gcd, x, y };
};

const inverseModulo = (a: number, b: number): number => {
    const { x } = extendedEuclidean(a, b);
    return modulo(x, b);
};

const changeInput=(input:string):string=>{
    const changed = input.replace(/[^a-zA-Z0-9+]/g, "").toUpperCase();
    return changed;
}
const generateStandardKey = (initkey:string, updateInput:string): string => {
    let key=changeInput(initkey);

    for (let i = 1; i < updateInput.length/initkey.length-1; i += 1) {
            
        key += key; 
    }

    for( let i = 0 ; i < updateInput.length%initkey.length;i++){
        key+=key[i];
    }

    return key;
};

const generateAutoKey = (initkey:string, updateInput:string): string => {
    let key=changeInput(initkey);

    if (key.length <updateInput.length){
        var inputstr = updateInput.substr(0,updateInput.length-key.length)
        key += inputstr
      }
    return key;
};

const generateFullKey = (initkey:string, updateInput:string): string => {
    let key=changeInput(initkey);

    if (key.length <updateInput.length){
        var inputstr = updateInput.substr(0,updateInput.length-key.length)
        key += inputstr
      }
    return key;
};
const exists= (array:string[][], keyIndex :number,alphabet:string)=> {
    let text =""
    
    
 
    for (var i = 0; i <array.length; i++) {
        if (array[keyIndex][i] === alphabet){

            text = ALPHABET[i]
        }
  }

  return text
}
const create2DArray=(rows:number, columns:number,key:string) =>{
    var array = new Array(rows);
    for (var i = 0; i < rows; i++) {

    array[i] = new Array(columns);
    let list = generateRandomAlphabet(key,i);
    //console.log(list)
    for (var j = 0; j < columns; j++) {
      
        array[i][j] = ALPHABET[list[j]];
        
    }
    }

    return array;
}

const generateRandomAlphabet= (initkey:string,index:number)=>{
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


const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export {
    removeSpaces,
    removeNonAlphabet,
    reverseString,
    removeDuplicateAlphabet,
    getCharCode,
    getCharIdx,
    getCharFromCharCode,
    getCharFromCharIdx,
    extendedEuclidean,
    inverseModulo,
    modulo,
    ALPHABET,
    generateStandardKey ,
    changeInput,
    generateAutoKey,
    generateFullKey,
    exists,
    create2DArray
};
