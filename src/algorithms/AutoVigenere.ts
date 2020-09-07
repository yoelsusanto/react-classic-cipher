import {
    ALPHABET,
    generateAutoKey ,
    changeInput
} from './Utils';

class AutoVigenere {
    public static encrypt(input: string, initKey: string): string {
   
        const alphabetOnly = changeInput(input)

        const key = generateAutoKey(initKey,alphabetOnly);
    
        let output="";
      
        for (let i = 0; i < alphabetOnly.length; i++) {
            if (i % 5 === 0 ){
              output+=" ";
            }
            let currentLetter = alphabetOnly[i];
            
            if (currentLetter === " " || !currentLetter.match(/[A-Z]/g)) { 
              output += currentLetter;
              continue;
            }
      
            let currentIndex = this.getEncryptionIdx(currentLetter,key[i])
      
              //encode
              
        
      
            if (currentIndex - ALPHABET.length >= 0) { 
              currentIndex -= ALPHABET.length;
            }
      
            let newLetter = ALPHABET[currentIndex]; 
      
            output += newLetter;
      
          }
        return output;
    }

    public static decrypt(input: string, initKey: string): string {
        const alphabetOnly = changeInput(input)
        let key = initKey.toUpperCase()
       // const key = generateStandardKey(initKey,alphabetOnly);

        let output="";
        
        for (let i = 0; i < alphabetOnly.length; i++) {
  
            let currentLetter = alphabetOnly[i];
            
            if (currentLetter === " " || !currentLetter.match(/[A-Z]/g)) { 
              output += currentLetter;
              continue;
            }
        
            let currentIndex = this.getDecryptionIdx(currentLetter,key[i])
            
            
        
        
            if (currentIndex < 0) { 
              currentIndex += 26;
            }
        
            let newLetter = ALPHABET[currentIndex]; 
        
            output += newLetter;
            key+=newLetter;
        
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

export default AutoVigenere;
