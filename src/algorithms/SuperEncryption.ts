import {
    ALPHABET,
    generateStandardKey,
    transposeChiper,
    retransposeChiper,
    changeInput,
} from './Utils';
import StandardVigenere from './StandardVigenere';

class SuperEncryption {
    public static encrypt(input: string, initKey: string): string {
        const result = StandardVigenere.encrypt(input, initKey);

        const transposeResult = transposeChiper(result, initKey);
        return transposeResult;
    }

    public static decrypt(input: string, initKey: string): string {
        const realChipher = retransposeChiper(input, initKey);

       
        const result = StandardVigenere.decrypt(realChipher, initKey);

        return result;
    }

    public static getEncryptionIdx(
        currentLetter: string,
        currentKey: string,
    ): number {
        return (
            (ALPHABET.indexOf(currentLetter) + ALPHABET.indexOf(currentKey)) %
            26
        );
    }

    public static getDecryptionIdx(
        currentLetter: string,
        currentKey: string,
    ): number {
        return (
            (ALPHABET.indexOf(currentLetter) -
                ALPHABET.indexOf(currentKey) +
                26) %
            26
        );
    }
}

export default SuperEncryption;
