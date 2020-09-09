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

interface IPlayfairTable {
    map: Map<string, number>;
    array: string[];
}

class PlayFairChiper {
    static ACharCode = 97;

    public static encrypt(plainText: string, cipherKey: string): string {
        const withoutSpaces = removeSpaces(plainText);
        const alphabetOnly = removeNonAlphabet(withoutSpaces);

        const jReplaced = alphabetOnly.replace('j', 'i');
        let paddedWithX = '';
        for (let i = 0; i < jReplaced.length; i += 1) {
            if (i > 0 && jReplaced[i] === jReplaced[i - 1] && i % 2 === 0) {
                paddedWithX = paddedWithX.concat('x');
            }
            paddedWithX = paddedWithX.concat(jReplaced[i]);
        }

        const table = this.createPlayFairTable(cipherKey);
        const arrayOfCharPair = this.separateIntoChunksOfTwo(paddedWithX);

        const encryptedCharArray = arrayOfCharPair.map((charPair) =>
            this.encryptPair(charPair, table),
        );

        return encryptedCharArray.join('');
    }

    public static decrypt(plainText: string, cipherKey: string): string {
        const withoutSpaces = removeSpaces(plainText);
        const alphabetOnly = removeNonAlphabet(withoutSpaces);

        const table = this.createPlayFairTable(cipherKey);
        const arrayOfCharPair = this.separateIntoChunksOfTwo(alphabetOnly);

        const decryptedCharArray = arrayOfCharPair.map((charPair) =>
            this.decryptPair(charPair, table),
        );

        return decryptedCharArray.join('');
    }

    public static encryptPair(
        charPair: string[],
        table: IPlayfairTable,
    ): string {
        const charIndexPair = charPair.map((char) => table.map.get(char)!);
        const encryptedCharIdxPair = this.encryptIndex(charIndexPair);
        const encryptedChar = encryptedCharIdxPair.map(
            (charIdx) => table.array[charIdx],
        );
        return encryptedChar.join('');
    }

    public static decryptPair(
        charPair: string[],
        table: IPlayfairTable,
    ): string {
        const charIndexPair = charPair.map((char) => table.map.get(char)!);
        const decryptedCharIdxPair = this.decryptIndex(charIndexPair);
        const decryptedChar = decryptedCharIdxPair.map(
            (charIdx) => table.array[charIdx],
        );
        return decryptedChar.join('');
    }

    public static encryptIndex(idxPair: number[]): number[] {
        const firstCharIdx = idxPair[0];
        const secondCharIdx = idxPair[1];
        const firstCharRow = this.getCharRowFromCharIdx(firstCharIdx);
        const firstCharColumn = this.getCharColumnFromCharIdx(firstCharIdx);
        const secondCharRow = this.getCharRowFromCharIdx(secondCharIdx);
        const secondCharColumn = this.getCharColumnFromCharIdx(secondCharIdx);
        const sameColumn = firstCharColumn === secondCharColumn;
        const sameRow = firstCharRow === secondCharRow;
        if (sameColumn) {
            return idxPair.map((charIdx) => this.processSameColumn(charIdx));
        }
        if (sameRow) {
            return idxPair.map((charIdx) => this.processSameRow(charIdx));
        }
        if (sameColumn && sameRow) {
            throw new Error('Same char and same row wtf??');
        }
        // Not same row and same char, so need to do some switching
        let horizontalDiff = (firstCharIdx % 5) - (secondCharIdx % 5);
        const firstCharLeftOfSecond = horizontalDiff < 0;
        horizontalDiff = Math.abs(horizontalDiff);
        if (firstCharLeftOfSecond) {
            return [
                firstCharIdx + horizontalDiff,
                secondCharIdx - horizontalDiff,
            ];
        }
        return [firstCharIdx - horizontalDiff, secondCharIdx + horizontalDiff];
    }

    public static decryptIndex(idxPair: number[]): number[] {
        const firstCharIdx = idxPair[0];
        const secondCharIdx = idxPair[1];
        const firstCharRow = this.getCharRowFromCharIdx(firstCharIdx);
        const firstCharColumn = this.getCharColumnFromCharIdx(firstCharIdx);
        const secondCharRow = this.getCharRowFromCharIdx(secondCharIdx);
        const secondCharColumn = this.getCharColumnFromCharIdx(secondCharIdx);
        const sameColumn = firstCharColumn === secondCharColumn;
        const sameRow = firstCharRow === secondCharRow;
        if (sameColumn) {
            return idxPair.map((charIdx) =>
                this.processSameColumn(charIdx, true),
            );
        }
        if (sameRow) {
            return idxPair.map((charIdx) => this.processSameRow(charIdx, true));
        }
        if (sameColumn && sameRow) {
            throw new Error('Same char and same row wtf??');
        }
        // Not same row and same char, so need to do some switching
        let horizontalDiff = (firstCharIdx % 5) - (secondCharIdx % 5);
        const firstCharLeftOfSecond = horizontalDiff < 0;
        horizontalDiff = Math.abs(horizontalDiff);
        if (firstCharLeftOfSecond) {
            return [
                firstCharIdx + horizontalDiff,
                secondCharIdx - horizontalDiff,
            ];
        }
        return [firstCharIdx - horizontalDiff, secondCharIdx + horizontalDiff];
    }

    public static processSameColumn(
        charIdx: number,
        decryption = false,
    ): number {
        if (decryption) {
            const onHighestRow = charIdx <= 4;
            if (!onHighestRow) {
                return charIdx - 5;
            }
            return charIdx + 20;
        }
        const onLowestRow = charIdx >= 20;
        if (!onLowestRow) {
            return charIdx + 5;
        }
        return charIdx - 20;
    }

    public static processSameRow(charIdx: number, decryption = false): number {
        // if decryption
        if (decryption) {
            const onLeftestColumn = charIdx % 5 === 0;
            if (!onLeftestColumn) {
                return charIdx - 1;
            }
            return charIdx + 4;
        }
        const onRightestColumn = charIdx % 5 === 4;
        if (!onRightestColumn) {
            return charIdx + 1;
        }
        return charIdx - 4;
    }

    public static getCharRowFromCharIdx(charIdx: number): number {
        return Math.floor(charIdx / 5);
    }

    public static getCharColumnFromCharIdx(charIdx: number): number {
        return charIdx % 5;
    }

    private static generateAlphabetSet(): Set<string> {
        const alphabetSet = new Set<string>();
        for (let i = 0; i < 26; i += 1) {
            alphabetSet.add(String.fromCharCode(this.ACharCode + i));
        }
        alphabetSet.delete('j');
        return alphabetSet;
    }

    public static createPlayFairTable(cipherKey: string): IPlayfairTable {
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
        tableMap.set('j', tableMap.get('i')!);

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
