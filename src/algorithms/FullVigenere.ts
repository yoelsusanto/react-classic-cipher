import { ALPHABET, changeInput, create2DArray, exists } from './Utils';

class FullVigenere {
    public static encrypt(input: string, initKey: string): string {
        const alphabetOnly = changeInput(input);

        const array = create2DArray(26, 26, initKey.toUpperCase());
        // console.log(key)
        let output = '';
        const key = initKey.toUpperCase();

        let keyIndex = 0;

        for (let i = 0; i < alphabetOnly.length; i++) {
            if (i % 5 === 0) {
                output += ' ';
            }
            const keyAlphabetIndex = ALPHABET.indexOf(key[keyIndex]);
            const inputIndex = ALPHABET.indexOf(alphabetOnly[i]);

            const newLetter = array[keyAlphabetIndex][inputIndex];

            keyIndex++;
            keyIndex %= key.length;

            output += newLetter;
        }
        return output;
    }

    public static decrypt(input: string, initKey: string): string {
        const alphabetOnly = changeInput(input);
        const key = initKey.toUpperCase();

        const array = create2DArray(26, 26, initKey.toUpperCase());
        let output = '';

        let keyIndex = 0;
        for (let i = 0; i < alphabetOnly.length; i++) {
            const currentLetter = alphabetOnly[i];
            const keyAlphabetIndex = ALPHABET.indexOf(key[keyIndex]);
            output += exists(array, keyAlphabetIndex, currentLetter);
            keyIndex++;
            keyIndex %= key.length;
        }
        return output;
    }
}

export default FullVigenere;
