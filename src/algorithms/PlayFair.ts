import {
    removeSpaces,
    removeNonAlphabet,
    removeDuplicateAlphabet,
} from './Utils';

/*
    Playfair Table
    | 0| 1| 2| 3| 4|
    | 5| 6| 7| 8| 9|
    |10|11|12|13|14|
    |15|16|17|18|19|
    |20|21|22|23|24|
*/

class PlayFairChiper {
    static ACharCode = 97;

    public static encrypt(plainText: string, cipherKey: string): string {
        const withoutSpaces = removeSpaces(plainText);
        const alphabetOnly = removeNonAlphabet(withoutSpaces);

        const table = this.createPlayFairTable(cipherKey);
        const arrayOfTwo = this.separateIntoChunksOfTwo(plainText);

        return alphabetOnly;
    }

    private static generateAlphabetSet(): Set<string> {
        const alphabetSet = new Set<string>();
        for (let i = 0; i < 26; i += 1) {
            alphabetSet.add(String.fromCharCode(this.ACharCode + i));
        }
        alphabetSet.delete('j');
        return alphabetSet;
    }

    public static createPlayFairTable(
        cipherKey: string,
    ): { map: Map<string, number>; array: string[] } {
        // Clean cipherKey first
        const keyWithoutSpace = removeSpaces(cipherKey);
        const alphabetOnly = removeNonAlphabet(keyWithoutSpace);
        const withoutRepetition = removeDuplicateAlphabet(alphabetOnly);

        const tableMap = new Map<string, number>();
        const unusedChars = this.generateAlphabetSet();

        for (let i = 0; i < withoutRepetition.length; i += 1) {
            if (withoutRepetition[i] !== 'j') {
                unusedChars.delete(withoutRepetition[i]);
                tableMap.set(withoutRepetition[i], i);
            }
        }

        // Reverse array because need to get first element but uses pop method
        const unusedCharsArray = Array.from(unusedChars).reverse();
        let char: string;
        while (tableMap.size < 25) {
            char = unusedCharsArray.pop()!;
            tableMap.set(char, tableMap.size);
        }

        const tableArray = Array.from(tableMap.keys());

        return { map: tableMap, array: tableArray };
    }

    public static separateIntoChunksOfTwo(input: string): string[][] {
        let i = 0;
        const output: string[][] = [];
        while (i <= input.length - 2) {
            if (input[i] !== input[i + 1]) {
                output.push([input[i], input[i + 1]]);
                i += 2;
            } else {
                output.push([input[i], 'x']);
                i += 1;
            }
        }
        if (i === input.length - 1) {
            output.push([input[i], 'x']);
        }
        return output;
    }

    public static getCharIndexFromTable(
        char: string,
        table: Map<string, number>,
    ): number {
        if (char === 'j') {
            return table.get('i')!;
        }
        return table.get(char)!;
    }
}

export default PlayFairChiper;
