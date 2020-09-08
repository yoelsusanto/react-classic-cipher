import { multiply, mod, det as determinant, inv as inverse } from 'mathjs';
import {
    removeSpaces,
    getCharIdx,
    getCharFromCharIdx,
    extendedEuclidean,
    inverseModulo,
} from './Utils';

class HillCipher {
    public static encrypt(
        plainText = '',
        chunkSize: number,
        matrixText: string,
    ): string {
        const cipherMatrix = this.parseMatrix(matrixText);

        const { error } = this.checkMatrixValidity(cipherMatrix, chunkSize);
        if (error) {
            throw error;
        }

        if (plainText.length <= 0) {
            return '';
        }

        const chunkRegex = new RegExp(`.{1,${chunkSize}}`, 'g');

        const lowerCasedAndWithoutSpace = removeSpaces(plainText).toLowerCase();

        const stringChunks = lowerCasedAndWithoutSpace.match(
            chunkRegex,
        ) as string[];

        const lastStringChunkIdx = stringChunks.length - 1;

        if (stringChunks[lastStringChunkIdx].length < chunkSize) {
            const deficiency =
                chunkSize - stringChunks[lastStringChunkIdx].length;
            for (let i = 0; i < deficiency; i += 1) {
                stringChunks[lastStringChunkIdx] = stringChunks[
                    lastStringChunkIdx
                ].concat('x');
            }
        }

        const charsIdxChunks = stringChunks.map((stringChunk) => {
            const charsIdx = [];
            for (let i = 0; i < stringChunk.length; i += 1) {
                charsIdx.push(getCharIdx(stringChunk[i]));
            }
            return charsIdx;
        });

        const encryptedCharsIdxChunks = charsIdxChunks.map((charsIdx) => {
            const encryptedCharsIdx = (multiply(
                cipherMatrix,
                charsIdx,
            ) as unknown) as number[];
            return mod(encryptedCharsIdx, 26);
        });

        const encryptedStringChunks = encryptedCharsIdxChunks.map(
            (encryptedCharsIdx) => {
                const encryptedStringChunk = encryptedCharsIdx
                    .map((encryptedCharIdx) => {
                        return getCharFromCharIdx(encryptedCharIdx);
                    })
                    .join('');
                return encryptedStringChunk;
            },
        );

        return encryptedStringChunks.join('');
    }

    public static decrypt(
        cipherText = '',
        chunkSize: number,
        matrixText: string,
    ): string {
        const cipherMatrix = this.parseMatrix(matrixText);

        if (cipherText.length <= 0) {
            return '';
        }

        const { error } = this.checkMatrixValidity(cipherMatrix, chunkSize);
        if (error) {
            throw error;
        }

        const chunkRegex = new RegExp(`.{1,${chunkSize}}`, 'g');

        const lowerCasedWithoutSpace = removeSpaces(cipherText).toLowerCase();

        const stringChunks = lowerCasedWithoutSpace.match(
            chunkRegex,
        ) as string[];

        const lastStringChunkIdx = stringChunks.length - 1;

        if (stringChunks[lastStringChunkIdx].length < chunkSize) {
            const deficiency =
                chunkSize - stringChunks[lastStringChunkIdx].length;
            for (let i = 0; i < deficiency; i += 1) {
                stringChunks[lastStringChunkIdx] = stringChunks[
                    lastStringChunkIdx
                ].concat('x');
            }
        }

        const matrixDeterminant = determinant(cipherMatrix);
        let decryptionMatrix = multiply(
            inverse(cipherMatrix),
            matrixDeterminant,
        );
        const inverseDeterminant = inverseModulo(matrixDeterminant, 26);

        decryptionMatrix = mod(
            multiply(decryptionMatrix, inverseDeterminant),
            26,
        );

        const charsIdxChunks = stringChunks.map((stringChunk) => {
            const charsIdx = [];
            for (let i = 0; i < stringChunk.length; i += 1) {
                charsIdx.push(getCharIdx(stringChunk[i]));
            }
            return charsIdx;
        });

        const encryptedCharsIdxChunks = charsIdxChunks.map((charsIdx) => {
            const encryptedCharsIdx = (multiply(
                decryptionMatrix,
                charsIdx,
            ) as unknown) as number[];
            return mod(encryptedCharsIdx, 26);
        });

        const encryptedStringChunks = encryptedCharsIdxChunks.map(
            (encryptedCharsIdx) => {
                const encryptedStringChunk = encryptedCharsIdx
                    .map((encryptedCharIdx) => {
                        return getCharFromCharIdx(encryptedCharIdx);
                    })
                    .join('');
                return encryptedStringChunk;
            },
        );

        return encryptedStringChunks.join('');
    }

    public static checkMatrixValidity(
        matrix: number[][],
        chunkSize: number,
    ): { valid: boolean; error: Error | null } {
        if (matrix.length !== chunkSize) {
            return { valid: false, error: new Error('Invalid matrix size!') };
        }

        if (!matrix.every((numbersRow) => numbersRow.length === chunkSize)) {
            return { valid: false, error: new Error('Invalid matrix size!') };
        }

        if (determinant(matrix) === 0) {
            return {
                valid: false,
                error: new Error('Invalid matrix. Matrix has no inverse!'),
            };
        }

        const { gcd } = extendedEuclidean(determinant(matrix), 26);
        if (gcd !== 1) {
            return {
                valid: false,
                error: new Error(
                    'Invalid matrix. Matrix determinant is not coprime with 26!',
                ),
            };
        }

        return { valid: true, error: null };
    }

    public static parseMatrix(matrixText: string): number[][] {
        const onlyNumber = new RegExp(/^[\d\n ]+$/);
        if (!onlyNumber.test(matrixText)) {
            throw new Error('Invalid matrix input, illegal character!');
        }

        const matrixTextLineArray = matrixText.split('\n');

        const matrix = matrixTextLineArray.map((eachLine) => {
            const numbers = eachLine.split(' ');
            const convertedNumbers = numbers.map((textNumber) => {
                return parseInt(textNumber, 10);
            });
            return convertedNumbers;
        });

        return matrix;
    }
}

export default HillCipher;
