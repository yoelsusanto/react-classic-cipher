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
};
