import React, { useState, useEffect } from 'react';
import ExtendedVigenere from 'algorithms/ExtendedVigenere';

import TextView from 'components/TextView';
import TextOutput from 'components/TextOutput';
import TextOption from 'components/Configurations/TextOption';

import KeyInput from 'components/KeyInput';

const options = ['ENCRYPT', 'DECRYPT'];

const Extended: React.FC<undefined> = () => {
    let fileReader: FileReader;
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState(options[0]);
    const [key, setKey] = useState('test');

    useEffect(() => {
        let result;

        if (mode === 'ENCRYPT') {
            result = ExtendedVigenere.encrypt(input, key);
        } else {
            result = ExtendedVigenere.decrypt(input, key);
        }
        setOutput(result);
    }, [input, mode, key]);

    const handleFileRead = (_e: any) => {
        const content = fileReader.result;
        console.log(content);
    };

    const handleFileChosen = (file: Blob) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };
    return (
        <div className="w-4/5 m-auto py-10 flex justify-between">
            <div className="upload-expense">
                <input
                    type="file"
                    id="file"
                    className="input-file"
                    accept=".txt"
                />
            </div>

            <div className="w-1/4 bg-white rounded-sm shadow-sm">
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
