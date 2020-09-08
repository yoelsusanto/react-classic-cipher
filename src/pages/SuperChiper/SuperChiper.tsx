import React, { useState, useEffect } from 'react';
import SuperEncryption from 'algorithms/SuperEncryption';

import TextView from 'components/TextView';
import TextOutput from 'components/TextOutput';
import TextOption from 'components/TextOption';
import KeyInput from 'components/KeyInput';

const options = ['ENCRYPT', 'DECRYPT'];

const Super: React.FC<{}> = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState(options[0]);
    const [key, setKey] = useState('test');

    useEffect(() => {
        let result = '';
        if (key !== '') {
            if (mode === 'ENCRYPT') {
                result = SuperEncryption.encrypt(input, key);
            } else {
                result = SuperEncryption.decrypt(input, key);
            }
        }
        setOutput(result);
    }, [input, mode, key]);

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
                    <KeyInput onChange={setKey} />
                </div>
            </div>
            <TextOutput value={output} />
        </div>
    );
};

export default Super;
