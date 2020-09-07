import {
    getCharFromCharIdx,
    getCharIdx,
    removeSpaces,
    removeNonAlphabet,
    inverseModulo,
    modulo,
} from './Utils';

class AffineCipher {
    public static encrypt(plainText: string, a: number, b: number): string {
        const alphabetOnly = removeNonAlphabet(
            removeSpaces(plainText.toLowerCase()),
        );
        const encryptedChars = [];
        for (let i = 0; i < alphabetOnly.length; i += 1) {
            const charIdx = getCharIdx(plainText[i]);
            const replacementCharIdx = this.getEncryptionIdx(charIdx, a, b);
            const replacementChar = getCharFromCharIdx(replacementCharIdx);
            encryptedChars.push(replacementChar);
        }
        return encryptedChars.join('');
    }

    public static decrypt(cipherText: string, a: number, b: number): string {
        const alphabetOnly = removeNonAlphabet(
            removeSpaces(cipherText.toLowerCase()),
        );
        const decryptedChars = [];
        for (let i = 0; i < alphabetOnly.length; i += 1) {
            const charIdx = getCharIdx(cipherText[i]);
            const replacementCharIdx = this.getDecryptionIdx(charIdx, a, b);
            const replacementChar = getCharFromCharIdx(replacementCharIdx);
            decryptedChars.push(replacementChar);
        }
        return decryptedChars.join('');
    }

    public static getEncryptionIdx(
        charIdx: number,
        a: number,
        b: number,
    ): number {
        return (a * charIdx + b) % 26;
    }

    public static getDecryptionIdx(
        charIdx: number,
        a: number,
        b: number,
    ): number {
        const coef = inverseModulo(a, 26);
        const num = modulo(coef * (charIdx - b), 26);
        return num;
    }
}

export default AffineCipher;
