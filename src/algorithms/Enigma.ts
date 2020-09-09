import { mod } from 'mathjs';
import {
    arrayHasNoDuplicate,
    getCharFromCharIdx,
    getCharIdx,
    removeNonAlphabet,
    removeSpaces,
} from './Utils';

// Type Enigma 1
const rotor1Mapping = 'ekmflgdqvzntowyhxuspaibrcj';
const rotor2Mapping = 'ajdksiruxblhwtmcqgznpyfvoe';
const rotor3Mapping = 'bdfhjlcprtxvznyeiwgakmusqo';

const reflectorB = 'yruhqsldpxngokmiebfzcwvjat';

interface IEnigmaConfiguration {
    rotorsInitialOffset: string;
    plugboard: string;
}

class Enigma {
    public static encrypt(
        plainText: string,
        configuration: IEnigmaConfiguration,
    ): string {
        const preprocessed = removeNonAlphabet(
            removeSpaces(plainText.toLowerCase()),
        );
        const initialSetting = this.parseRotorInitialOffset(
            configuration.rotorsInitialOffset,
        );

        const rotor1Offset = initialSetting[2];
        const rotor2Offset = initialSetting[1];
        const rotor3Offset = initialSetting[0];

        const plugboard = this.parsePlugboardSetting(configuration.plugboard);

        const afterPlugboard = this.processSentenceThroughPlugboard(
            preprocessed,
            plugboard,
        );

        console.log(afterPlugboard);
        let encrypted = '';
        for (let i = 0; i < afterPlugboard.length; i += 1) {
            const charIdx = getCharIdx(afterPlugboard[i]);

            const r1Output = this.mapRotorOutputForward(
                charIdx,
                rotor1Mapping,
                rotor1Offset + mod(i + 1, 26),
            );
            const r2Output = this.mapRotorOutputForward(
                r1Output,
                rotor2Mapping,
                rotor2Offset + Math.floor((i + 1) / 26),
            );

            const r3Output = this.mapRotorOutputForward(
                r2Output,
                rotor3Mapping,
                rotor3Offset + Math.floor((i + 1) / 676),
            );

            const reflector = this.mapReflector(r3Output, reflectorB);
            const r3ReflectOutput = this.mapRotorOutputBackward(
                reflector,
                rotor3Mapping,
                rotor3Offset + Math.floor((i + 1) / 676),
            );
            const r2ReflectOutput = this.mapRotorOutputBackward(
                r3ReflectOutput,
                rotor2Mapping,
                rotor2Offset + Math.floor((i + 1) / 26),
            );
            const r1ReflectOutput = this.mapRotorOutputBackward(
                r2ReflectOutput,
                rotor1Mapping,
                rotor1Offset + mod(i + 1, 26),
            );

            const char = getCharFromCharIdx(r1ReflectOutput);
            encrypted = encrypted.concat(char);
        }

        const lastPlugboard = this.processSentenceThroughPlugboard(
            encrypted,
            plugboard,
        );

        return lastPlugboard;
    }

    public static decrypt(
        cipherText: string,
        configuration: IEnigmaConfiguration,
    ): string {
        return this.encrypt(cipherText, configuration);
    }

    public static processSentenceThroughPlugboard(
        sentence: string,
        plugboard: Map<string, string>,
    ): string {
        let afterPlugboard = '';
        for (let i = 0; i < sentence.length; i += 1) {
            afterPlugboard = afterPlugboard.concat(
                this.mapToPlugboard(sentence[i], plugboard),
            );
        }
        return afterPlugboard;
    }

    public static mapToPlugboard(
        char: string,
        plugboard: Map<string, string>,
    ): string {
        let replacement = plugboard.get(char);
        if (!replacement) {
            replacement = char;
        }
        return replacement;
    }

    public static parseRotorInitialOffset(setting: string): number[] {
        if (!setting.match(/^([A-Z]\s){2}[A-Z]$/)) {
            throw new Error('Invalid rotor settings. Example: A B C');
        }
        const lowerCased = setting.toLowerCase();
        const indexes = lowerCased.split(' ').map((char) => getCharIdx(char));
        return indexes;
    }

    public static parsePlugboardSetting(setting: string): Map<string, string> {
        if (!setting.match(/^([a-z]{2}\s)*([a-z]{2})$/)) {
            throw new Error(
                "Invalid plugboard format. Example: 'ab'. Minimal one setting",
            );
        }

        const plugboardChars = setting.replace(/\s/g, '').split('');
        if (!arrayHasNoDuplicate(plugboardChars)) {
            throw new Error('Plugboard settings must be unique');
        }
        const plugboard = new Map<string, string>();
        setting.split(' ').forEach((twoDigitChar: string): void => {
            const [firstChar, secondChar] = twoDigitChar.split('');
            plugboard.set(firstChar, secondChar);
            plugboard.set(secondChar, firstChar);
        });
        return plugboard;
    }

    public static mapRotorOutputForward(
        charIdx: number,
        rotorSetting: string,
        offset: number,
    ): number {
        const charIdxWithOffset = mod(charIdx + offset, 26);
        const resultingChar = rotorSetting[charIdxWithOffset];
        const resultingIdx = getCharIdx(resultingChar);
        return mod(resultingIdx - offset, 26);
    }

    public static mapRotorOutputBackward(
        charIdx: number,
        rotorSetting: string,
        offset: number,
    ): number {
        const charIdxWithOffset = mod(charIdx + offset, 26);
        const resultantChar = getCharFromCharIdx(charIdxWithOffset);
        const sourceChar = getCharFromCharIdx(
            rotorSetting.indexOf(resultantChar),
        );
        const resultingIdx = getCharIdx(sourceChar);
        return mod(resultingIdx - offset, 26);
    }

    public static mapReflector(
        charIdx: number,
        reflectorSetting: string,
    ): number {
        const resultingChar = reflectorSetting[charIdx];
        const resultingIdx = getCharIdx(resultingChar);
        return resultingIdx;
    }
}

export default Enigma;
