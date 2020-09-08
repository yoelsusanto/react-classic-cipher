import React, { useState, useEffect } from 'react';
import TextView from 'components/TextView';
import PlayFairChiper from 'algorithms/PlayFair';
import TextOption from 'components/Configurations/TextOption';
import TextArea from 'components/Configurations/TextArea';
import TextOutput from 'components/TextOutput';

const options = ['ENCRYPT', 'DECRYPT'];

const Playfair: React.FC<{}> = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [key, setKey] = useState('');
    const [mode, setMode] = useState(options[0]);

    useEffect(() => {
        let result;
        if (mode === 'ENCRYPT') {
            result = PlayFairChiper.encrypt(input, key);
        } else {
            result = PlayFairChiper.decrypt(input, key);
        }
        setOutput(result);
    }, [input, key, mode]);
    return (
        <div className="w-4/5 m-auto py-10 flex justify-between">
            <TextView onChange={setInput} />

            <div className="w-1/4 bg-white rounded-sm shadow-sm">
                <div className="p-4 border-b">
                    <TextOption
                        options={options}
                        onChange={(newOption: string): void => {
                            setMode(newOption);
                        }}
                    />
                </div>
                <div className="flex">
                    <TextArea
                        label="Playfair Key"
                        value={key}
                        onChange={(newKeyValue: string): void => {
                            setKey(newKeyValue);
                        }}
                    />
                </div>
            </div>
            <TextOutput value={output} />
        </div>
    );
};

export default Playfair;
