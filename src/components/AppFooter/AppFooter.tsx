import React from 'react';

const AppFooter: React.FC<{}> = () => {
    return (
        <div className="container mx-auto py-4 px-8">
            <p className="text-lg font-bold my-4">
                CryptoPipe: Classical Cryptography Demonstration Tool
            </p>
            <p className="text-gray-900">
                CryptoPipe is a tool that provides you the tool to simulate the
                working of classical cipher.
            </p>
            <div className="flex mt-4 mb-3 font-medium">
                <p className="mr-6">Simple Vigenere Cipher</p>
                <p className="mr-6">Full Vigenere Cipher</p>
                <p className="mr-6">Auto-key Vigenere Cipher</p>
                <p className="mr-6">Extended Vigenere Cipher</p>
                <p className="mr-6">Playfair Cipher</p>
                <p className="mr-6">Super Encryption</p>
                <p className="mr-6">Affine Cipher</p>
                <p className="mr-6">Hill Cipher</p>
                <p className="mr-6">Enigma Cipher</p>
            </div>
        </div>
    );
};

export default AppFooter;
