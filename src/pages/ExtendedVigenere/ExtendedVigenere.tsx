/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';
import ExtendedVigenere from 'algorithms/ExtendedVigenere';

import TextView from 'components/TextView';
import TextOutput from 'components/TextOutput';
import TextOption from 'components/Configurations/TextOption';

import KeyInput from 'components/KeyInput';
import ReactFileReader from 'react-file-reader';

const options = ['ENCRYPT', 'DECRYPT'];

function getContent(dataURI: string) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else byteString = unescape(dataURI.split(',')[1]);

    return byteString;
    // separate out the mime component
}

function dataURItoBlob(dataURI: string) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    const byteString = getContent(dataURI);

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    // let test = byteString;
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
        // test += byteString;
    }
    // console.log(test);
    return new Blob([ia], { type: mimeString });
}

const Extended: React.FC<undefined> = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState(options[0]);
    const [key, setKey] = useState('');

    const handleFiles = (files: { base64: any }) => {
        let result: string;
        const link = document.createElement('a');
        let mimeString;
        if (mode === 'ENCRYPT') {
            const r = files.base64;

            const start = getContent(r);
            mimeString = r.split(',')[0].split(':')[1].split(';')[0];
            result = ExtendedVigenere.encrypt(start, key);
            console.log(result);
            link.download = 'extended-encrypt.txt';
        } else {
            const r = files.base64;

            const start = getContent(r);
            result = ExtendedVigenere.decrypt(start, key);
            link.download = 'extended-decrypt.txt';
        }
        const blob = new Blob([result!], { type: mimeString });
        link.href = window.URL.createObjectURL(blob);
        link.click();
    };

    return (
        <div className="w-4/5 m-auto py-10 flex justify-between">
            <ReactFileReader
                fileTypes={['.txt']}
                handleFiles={handleFiles}
                base64
            >
                <button
                    className="text-teal-500 text-base outline-none"
                    type="button"
                >
                    Upload
                </button>
            </ReactFileReader>

            <div className="w-1/4 bg-white rounded-sm shadow-sm">
                <div className="p-4 border-b text-center text-teal-500 text-xl font-bold">
                    Extended Vigenere
                </div>
                <div className="p-4 border-b">
                    <TextOption
                        options={options}
                        onChange={(newOption: string): void => {
                            setMode(newOption);
                        }}
                    />
                </div>
                <div className="row">
                    <KeyInput onChange={setKey} />
                </div>
            </div>
        </div>
    );
};

export default Extended;
