import React, { useState, useEffect } from 'react';
import HillCipherAlgorithm from 'algorithms/HillCipher';
import TextView from 'components/TextView';
import TextOption from 'components/Configurations/TextOption';
import NumberInput from 'components/NumberInput';
import TextOutput from 'components/TextOutput';
import TextArea from 'components/Configurations/TextArea';

const options = ['ENCRYPT', 'DECRYPT'];

const HillCipher: React.FC<{}> = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState(options[0]);
    const [chunkSize, setChunkSize] = useState(2);
    const [matrix, setMatrix] = useState('3 3\n2 5');

    const [error, setError] = useState<null | Error>(null);

    useEffect(() => {
        let result;
        if (mode === 'ENCRYPT') {
            try {
                result = HillCipherAlgorithm.encrypt(input, chunkSize, matrix);
            } catch (err) {
                setError(err);
                return;
            }
        } else {
            try {
                result = HillCipherAlgorithm.decrypt(input, chunkSize, matrix);
            } catch (err) {
                setError(err);
                return;
            }
        }
        setOutput(result);
        setError(null);
    }, [input, mode, chunkSize, matrix]);

    return (
        <div className="w-4/5 m-auto py-10 flex justify-between">
            <TextView onChange={setInput} />

            <div className="w-1/4 bg-white rounded-sm shadow-sm">
                <div className="p-4 border-b text-center text-teal-500 text-xl font-bold">
                    Hill Cipher
                </div>
                <div className="p-4 border-b">
                    <TextOption
                        options={options}
                        onChange={(newOption: string): void => {
                            setMode(newOption);
                        }}
                    />
                </div>
                <NumberInput
                    value={chunkSize}
                    label="Chunksize"
                    onChange={(newChunkSize: string): void => {
                        if (newChunkSize.length === 0) {
                            setChunkSize(0);
                            return;
                        }
                        setChunkSize(parseInt(newChunkSize, 10));
                    }}
                />
                <TextArea
                    value={matrix}
                    label="Cipher Matrix"
                    onChange={(newInput: string): void => {
                        setMatrix(newInput);
                    }}
                />
                {error && (
                    <div className="p-4 border-b text-red-700">
                        {error.message}
                    </div>
                )}
            </div>
            <TextOutput value={output} />
        </div>
    );
};

export default HillCipher;
