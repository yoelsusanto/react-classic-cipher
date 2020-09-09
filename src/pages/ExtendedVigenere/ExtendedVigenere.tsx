/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';
import ExtendedVigenere from 'algorithms/ExtendedVigenere';

import TextOption from 'components/Configurations/TextOption';

import KeyInput from 'components/KeyInput';
import TextView from 'components/TextView/TextView';
import TextOutput from 'components/TextOutput';

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
    const [key, setKey] = useState('test');

    useEffect(() => {
        let result = '';
        if (key !== '') {
            if (mode === 'ENCRYPT') {
                result = ExtendedVigenere.encrypt(input, key);
            } else {
                result = ExtendedVigenere.decrypt(input, key);
            }
        }
        setOutput(result);
    }, [input, mode, key]);

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

    const handleFilesBytes = async (file: File): Promise<void> => {
        let result: any;
        const link = document.createElement('a');
        const { name, type: fileType } = file;
        const buffer = await file.arrayBuffer();
        const inputBytes = new Uint8Array(buffer);
        console.log(fileType);
        if (mode === 'ENCRYPT') {
            if (fileType === 'text/plain') {
                result = ExtendedVigenere.encryptTextFile(inputBytes, key);
            } else {
                result = ExtendedVigenere.encryptBuffer(inputBytes, key);
            }
        } else if (mode === 'DECRYPT') {
            if (fileType === 'text/plain') {
                result = ExtendedVigenere.decryptTextFile(inputBytes, key);
            } else {
                result = ExtendedVigenere.decryptBuffer(inputBytes, key);
            }
        }

        link.download = name;
        const blob = new Blob([result!], { type: fileType });
        link.href = window.URL.createObjectURL(blob);
        link.click();
    };

    return (
        <div className="w-4/5 m-auto py-10 flex justify-between">
            <div className="flex flex-col">
                <input
                    value=""
                    type="file"
                    onChange={(e): void => {
                        e.preventDefault();
                        const file = e.target?.files![0];
                        if (!file) {
                            return;
                        }
                        handleFilesBytes(file);
                    }}
                    disabled={key.length === 0}
                />
                {key.length === 0 && (
                    <div className="p-4 border-b text-red-700">
                        Please specify your key
                    </div>
                )}
            </div>
            <TextView onChange={setInput} />
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
            <TextOutput value={output} />
        </div>
    );
};

export default Extended;
