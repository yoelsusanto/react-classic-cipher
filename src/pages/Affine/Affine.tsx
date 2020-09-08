import React, { useState, useEffect } from 'react';
import AffineCipher from 'algorithms/Affine';

import TextView from 'components/TextView';
import TextOutput from 'components/TextOutput';
import TextOption from 'components/Configurations/TextOption';
import NumberInput from 'components/NumberInput';

const options = ['ENCRYPT', 'DECRYPT'];

const Affine: React.FC<{}> = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState(options[0]);
    const [paramA, setParamA] = useState(3);
    const [paramB, setParamB] = useState(3);

    useEffect(() => {
        let result;
        if (mode === 'ENCRYPT') {
            result = AffineCipher.encrypt(input, paramA, paramB);
        } else {
            result = AffineCipher.decrypt(input, paramA, paramB);
        }
        setOutput(result);
    }, [input, mode, paramA, paramB]);

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
                    <NumberInput
                        value={paramA}
                        label="Param A"
                        onChange={(valueA: number): void => {
                            setParamA(valueA);
                        }}
                    />
                    <NumberInput
                        value={paramB}
                        label="Param B"
                        onChange={(valueB: number): void => {
                            setParamB(valueB);
                        }}
                    />
                </div>
            </div>
            <TextOutput value={output} />
        </div>
    );
};

export default Affine;
