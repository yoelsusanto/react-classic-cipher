import React from 'react';
import { Link } from 'react-router-dom';

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
                <p className="mr-6">
                    <Link to="/standardvigenere">Simple Vigenere Cipher</Link>
                </p>
                <p className="mr-6">
                    <Link to="/fullvigenere">Full Vigenere Cipher</Link>
                </p>
                <p className="mr-6">
                    <Link to="/autovigenere">Auto-key Vigenere Cipher</Link>
                </p>
                <p className="mr-6">
                    <Link to="/extendedvigenere">Extended Vigenere Cipher</Link>
                </p>
                <p className="mr-6">
                    <Link to="/playfair">Playfair Cipher</Link>
                </p>
                <p className="mr-6">
                    <Link to="/superencryption">Super Encryption</Link>
                </p>
                <p className="mr-6">
                    <Link to="/affine">Affine Cipher</Link>
                </p>
                <p className="mr-6">
                    <Link to="/hillcipher">Hill Cipher</Link>
                </p>
                <p className="mr-6">
                    <Link to="/enigma">Enigma Cipher</Link>
                </p>
            </div>
        </div>
    );
};

export default AppFooter;
