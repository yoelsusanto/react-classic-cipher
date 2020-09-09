import { mod } from 'mathjs';

class ExtendedVigenere {
    public static encrypt(input: string, initKey: string): string {
        console.log('input', input);
        let output = '';
        let shift;
        let keyIndex = 0;

        for (let i = 0; i < input.length; i += 1) {
            const currentLetter = input[i];

            keyIndex += i;
            keyIndex %= initKey.length;

            shift = initKey.charCodeAt(keyIndex) - 97;

            const currentIndex = (currentLetter.charCodeAt(0) + shift) % 256;

            const newLetter = String.fromCharCode(currentIndex);
            output += newLetter;
        }
        return output;
    }

    public static encryptBuffer(
        funcInput: Uint8Array,
        initKey: string,
    ): Uint8Array {
        const input = funcInput;

        let shift;
        let keyIndex = 0;

        for (let i = 0; i < input.length; i += 1) {
            const byteValue = input[i];

            keyIndex += i;
            keyIndex %= initKey.length;

            shift = initKey.charCodeAt(keyIndex) - 97;

            const newByteValue = (byteValue + shift) % 256;
            input[i] = newByteValue;
        }
        return input;
    }

    public static decryptBuffer(
        funcInput: Uint8Array,
        initKey: string,
    ): Uint8Array {
        const input = funcInput;

        let shift;
        let keyIndex = 0;

        for (let i = 0; i < input.length; i += 1) {
            const byteValue = input[i];

            keyIndex += i;
            keyIndex %= initKey.length;

            shift = initKey.charCodeAt(keyIndex) - 97;

            const newByteValue = mod(byteValue - shift, 256);
            input[i] = newByteValue;
        }
        return input;
    }

    public static decrypt(input: string, initKey: string): string {
        let output = '';
        let shift;
        let keyIndex = 0;

        for (let i = 0; i < input.length; i += 1) {
            const currentLetter = input[i];

            keyIndex += i;
            keyIndex %= initKey.length;

            shift = initKey.charCodeAt(keyIndex) - 97;

            let currentIndex = (currentLetter.charCodeAt(0) - shift) % 256;
            if (currentIndex < 0) {
                currentIndex += 256;
            }
            const newLetter = String.fromCharCode(currentIndex);
            output += newLetter;
        }
        return output;
    }
}

export default ExtendedVigenere;
