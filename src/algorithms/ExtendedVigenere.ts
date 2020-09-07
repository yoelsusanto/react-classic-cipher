import {
    ALPHABET,
  
    changeInput
} from './Utils';

class ExtendedVigenere {
    public static encrypt(input: string, initKey: string): string {
      

        let output="";
        let shift;
        let keyIndex =0;
        

        for (let i = 0; i < input.length; i++) {
            let currentLetter = input[i];

            shift= (initKey.charCodeAt(keyIndex))-97
        
            keyIndex++;
            keyIndex = keyIndex % initKey.length

        

            let currentIndex = (currentLetter.charCodeAt(0) + shift )% 256

            let newLetter = String.fromCharCode(currentIndex);
            output+=newLetter
        }
        return output;
    }

    public static decrypt(input: string, initKey: string): string {
        let output="";
        let shift;
        let keyIndex =0;
   


        for (let i = 0; i < input.length; i++) {
            let currentLetter = input[i];

            shift= (initKey.charCodeAt(keyIndex))-97
           
            keyIndex++;
            keyIndex = keyIndex % initKey.length

        

            let currentIndex = ((currentLetter.charCodeAt(0) - shift) )% 256
            if (currentIndex < 0){
              currentIndex +=256
            }
            let newLetter = String.fromCharCode(currentIndex);
            output+=newLetter;
          }
        return output;
    }


}

export default ExtendedVigenere;
