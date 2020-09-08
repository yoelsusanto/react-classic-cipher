/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-plusplus */
const removeSpaces = (input: string): string => {
    return input.replace(/\s/g, '');
};

const reverseString = (input: string): string => {
    return input.split('').reverse().join('');
};

const removeNonAlphabet = (input: string): string => {
    const lowerCased = input.toLowerCase();
    const alphabetOnly = lowerCased.replace(/[^a-z]/g, '');
    return alphabetOnly;
};

const removeDuplicateAlphabet = (input: string): string => {
    const reversedString = reverseString(input);
    // Reverse string because regex retains last occurence of every char but we want first occurence
    const noDuplicate = reversedString.replace(/(.)(?=.*\1)/g, '');
    const reverseToOriginal = reverseString(noDuplicate);
    return reverseToOriginal;
};

const getCharCode = (singleChar: string): number => {
    return singleChar.charCodeAt(0);
};

const getCharIdx = (singleChar: string): number => {
    return singleChar.charCodeAt(0) - 'a'.charCodeAt(0);
};

const getCharFromCharCode = (charCode: number): string => {
    return String.fromCharCode(charCode);
};

const getCharFromCharIdx = (charIdx: number): string => {
    const charCode = charIdx + 'a'.charCodeAt(0);
    return String.fromCharCode(charCode);
};

const modulo = (a: number, b: number): number => {
    return ((a % b) + b) % b;
};

// a.x + b.y = gcd(a,b)
const extendedEuclidean = (
    a: number,
    b: number,
): { gcd: number; x: number; y: number } => {
    if (a === 0) {
        return { gcd: b, x: 0, y: 1 };
    }

    const { gcd, x: x1, y: y1 } = extendedEuclidean(b % a, a);

    const x = y1 - Math.floor(b / a) * x1;
    const y = x1;
    return { gcd, x, y };
};

const inverseModulo = (a: number, b: number): number => {
    const { x } = extendedEuclidean(a, b);
    return modulo(x, b);
};

const changeInput = (input: string): string => {
    const changed = input.replace(/[^a-zA-Z0-9+]/g, '').toUpperCase();
    return changed;
};
const generateStandardKey = (initkey: string, updateInput: string): string => {
    let key = changeInput(initkey);

    for (let i = 1; i < updateInput.length / initkey.length - 1; i += 1) {
        key += key;
    }

    for (let i = 0; i < updateInput.length % initkey.length; i += 1) {
        key += key[i];
    }

    return key;
};

const generateAutoKey = (initkey: string, updateInput: string): string => {
    let key = changeInput(initkey);

    if (key.length < updateInput.length) {
        const inputstr = updateInput.substr(0, updateInput.length - key.length);
        key += inputstr;
    }
    return key;
};

const exists = (
    array: string[][],
    keyIndex: number,
    alphabet: string,
): string => {
    let text = '';

    for (let i = 0; i < array.length; i++) {
        if (array[keyIndex][i] === alphabet) {
            text = ALPHABET[i];
        }
    }

    return text;
};
const create2DArray = (
    rows: number,
    columns: number,
    key: string,
): string[][] => {
    const array = new Array(rows);
    for (let i = 0; i < rows; i++) {
        array[i] = new Array(columns);
        const list = generateRandomAlphabet(key, i);
        // console.log(list)
        for (let j = 0; j < columns; j++) {
            array[i][j] = ALPHABET[list[j]];
        }
    }

    return array;
};

const generateRandomAlphabet = (initkey: string, index: number): number[] => {
    const key = initkey.toUpperCase();
    const list = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
    ];

    const totalIndex = totalIndexString(key, 0);

    let seed = ALPHABET.length / totalIndex + index;

    let currentIndex = list.length;
    let temporaryValue;
    let randomIndex;
    seed = seed || 1;

    const random = function () {
        // eslint-disable-next-line no-plusplus
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };
    while (currentIndex !== 0) {
        randomIndex = Math.floor(random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = list[currentIndex];
        list[currentIndex] = list[randomIndex];
        list[randomIndex] = temporaryValue;
    }

    return list;
};
const totalIndexString = (text: string, initValue: number): number => {
    let totalIndex = initValue;
    for (let i = 0; i < text.length; i++) {
        totalIndex += ALPHABET.indexOf(text[i]);
    }

    return totalIndex;
};
const transposeChiper = (chiper: string, key: string): string => {
    const ch = changeInput(chiper);
    console.log(ch.length);
    const reverseKey = changeInput(reverseString(key));
    const finalKey = reverseKey[0] + key[0];
    const total = totalIndexString(finalKey, key.length % 2);

    let seed = Math.round(total / 26) + 1;
    const fixSeed = seed;
    let prevSeed = seed;
    const finalChipher = ch;
    let chiperTranspose = reverseKey[0];

    // for (let i = 0; i < ch.length % seed; i += 1) {
    //     finalChipher += reverseKey[i];
    // }
    for (let i = ch.length - 1; i >= 0; i -= 1) {
        if (i % seed === 0) {
            chiperTranspose += ch[i];
        }
    }
    seed--;
    while (seed !== 0) {
        for (let i = ch.length - 1; i >= seed; i -= seed) {
            if (i % prevSeed !== 0) {
                chiperTranspose += ch[i];
            }
        }
        prevSeed = seed;
        seed--;
    }

    // for (let i = 0; i < ch.length % seed; i += 1) {
    //     finalChipher += reverseKey[i];
    // }

    return chiperTranspose;
};

const retransposeChiper = (chiper: string, key: string): string => {
    const ch = changeInput(chiper);
    const cleanChipher = ch.substr(1, ch.length);
    const reverseKey = changeInput(reverseString(key));
    const finalKey = reverseKey[0] + key[0];
    const total = totalIndexString(finalKey, key.length % 2);

    const seed = Math.round(total / 26) + 1;
    console.log(seed);
    const prevSeed = seed;

    const chiperRetranspose: string[] = new Array(cleanChipher.length).fill('');
    let breakPoint = cleanChipher.length / seed - 1;
    console.log(breakPoint);
    let initial = 0;
    for (let i = cleanChipher.length - 1; i >= 0; i -= 1) {
        if (breakPoint === 0) {
            breakPoint = i;
        }
        chiperRetranspose[initial] += cleanChipher[breakPoint];
        console.log(chiperRetranspose[initial]);
        initial += seed;
        breakPoint--;
    }
    // console.log('aaaa', chiperRetranspose.join(''));
    // seed--;
    // prevSeed = seed;
    // while (seed !== 0) {
    //     for (let i = breakPoint; i < cleanChipher.length - 1; i++) {
    //         if (i % prevSeed !== 0) {
    //             chiperRetranspose[prevSeed] += ch[i];
    //             prevSeed += seed;
    //         }
    //     }
    //     prevSeed = seed;
    //     seed--;
    // }

    return chiperRetranspose.join('');
};
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export {
    removeSpaces,
    removeNonAlphabet,
    reverseString,
    removeDuplicateAlphabet,
    getCharCode,
    getCharIdx,
    getCharFromCharCode,
    getCharFromCharIdx,
    extendedEuclidean,
    inverseModulo,
    modulo,
    ALPHABET,
    generateStandardKey,
    changeInput,
    generateAutoKey,
    exists,
    create2DArray,
    transposeChiper,
    retransposeChiper,
};
