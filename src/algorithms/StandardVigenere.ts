import { ALPHABET, generateStandardKey, changeInput } from './Utils';

class StandardVigenere {
    public static encrypt(input: string, initKey: string): string {
        const alphabetOnly = changeInput(input);

        const key = generateStandardKey(initKey, alphabetOnly);
      

        let output = '';

        for (let i = 0; i < alphabetOnly.length; i += 1) {
            if (i % 5 === 0) {
                output += ' ';
            }

            const currentLetter = alphabetOnly[i];
            let currentIndex = this.getEncryptionIdx(currentLetter, key[i]);

            if (currentIndex - ALPHABET.length >= 0) {
                currentIndex -= ALPHABET.length;
            }

            const newLetter = ALPHABET[currentIndex];

            output += newLetter;
        }
        return output;
    }

    public static decrypt(input: string, initKey: string): string {
        const alphabetOnly = changeInput(input);
        const key = generateStandardKey(initKey, alphabetOnly);

        let output = '';

        for (let i = 0; i < alphabetOnly.length; i += 1) {
            const currentLetter = alphabetOnly[i];
            let currentIndex = this.getDecryptionIdx(currentLetter, key[i]);

            if (currentIndex - ALPHABET.length >= 0) {
                currentIndex -= ALPHABET.length;
            }

            const newLetter = ALPHABET[currentIndex];

            output += newLetter;
        }
        return output;
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

export default StandardVigenere;
