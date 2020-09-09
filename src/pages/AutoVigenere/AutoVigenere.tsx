import React, { useState, useEffect } from 'react';
import AutoVigenere from 'algorithms/AutoVigenere';

import TextView from 'components/TextView';
import TextOutput from 'components/TextOutput';
import TextOption from 'components/Configurations/TextOption';

import KeyInput from 'components/KeyInput';

const options = ['ENCRYPT', 'DECRYPT'];

const Auto: React.FC<{}> = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState(options[0]);
    const [key, setKey] = useState('test');

    useEffect(() => {
        let result;
        if (mode === 'ENCRYPT') {
            result = AutoVigenere.encrypt(input, key);
        } else {
            result = AutoVigenere.decrypt(input, key);
        }
        setOutput(result);
    }, [input, mode, key]);

    return (
        <div className="w-4/5 m-auto py-10 flex justify-between">
            <TextView onChange={setInput} />

            <div className="w-1/4 bg-white rounded-sm shadow-sm">
                <div className="p-4 border-b text-center text-teal-500 text-xl font-bold">
                    Auto Vigenere
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

export default Auto;
