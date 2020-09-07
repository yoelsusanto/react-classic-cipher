import {
    ALPHABET,
    generateFullKey ,
    changeInput,
    create2DArray,
    exists
} from './Utils';

class FullVigenere {

    public static encrypt(input: string, initKey: string): string {
   
        const alphabetOnly = changeInput(input)

        const key = create2DArray(26,26,initKey.toUpperCase())
    
        let output="";
      
        let shift;
        let keyIndex =0;
    
     
        for (let i = 0; i < alphabetOnly.length; i++) {
            if (i % 5 === 0){
                output+=" ";
            }
            let keyAlphabetIndex = ALPHABET.indexOf(key[keyIndex])
            let inputIndex = ALPHABET.indexOf(alphabetOnly[i])
            
            let newLetter =key[keyAlphabetIndex][inputIndex];
            
            keyIndex++;
            keyIndex = keyIndex % key.length
            
            
            output+=newLetter
            }
        return output;
    }

    public static decrypt(input: string, initKey: string): string {
        const alphabetOnly = changeInput(input)
        //let key = initKey.toUpperCase()
       // const key = generateStandardKey(initKey,alphabetOnly);
       const key = create2DArray(26,26,initKey.toUpperCase())
        let output="";
        
        let shift;
        let keyIndex =0;
        for (let i = 0; i < alphabetOnly.length; i++) {
            let currentLetter = alphabetOnly[i];
            let keyAlphabetIndex = ALPHABET.indexOf(key[keyIndex])
           output+=exists(key,keyAlphabetIndex,currentLetter);
            keyIndex++;
            keyIndex = keyIndex % key.length
            
          }
        return output;
    }

    public static getEncryptionIdx(
        currentLetter: string,
        currentKey:string

    ): number {
  
        return (ALPHABET.indexOf(currentLetter) + ALPHABET.indexOf(currentKey))%26;
    }

    public static getDecryptionIdx(
        currentLetter: string,
        currentKey:string
    ): number {
 
        return (ALPHABET.indexOf(currentLetter) - ALPHABET.indexOf(currentKey))%26;
    }
}

export default FullVigenere;
