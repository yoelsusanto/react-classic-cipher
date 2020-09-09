import React, { useState, useEffect } from 'react';
import TextView from 'components/TextView';
import TextOption from 'components/Configurations/TextOption';
import TextOutput from 'components/TextOutput';
import EnigmaAlgorithm from 'algorithms/Enigma';
import TextArea from 'components/Configurations/TextArea';

const options = ['ENCRYPT', 'DECRYPT'];

const Enigma: React.FC<{}> = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState(options[0]);
    const [rotorsSetting, setRotorsSetting] = useState('A A A');
    const [plugboardSetting, setPlugboardSetting] = useState('ab de');
    const [error, setError] = useState<null | Error>(null);

    useEffect(() => {
        let result;
        if (mode === 'ENCRYPT') {
            try {
                result = EnigmaAlgorithm.encrypt(input, {
                    rotorsInitialOffset: rotorsSetting,
                    plugboard: plugboardSetting,
                });
            } catch (err) {
                setError(err);
                return;
            }
        } else {
            try {
                result = EnigmaAlgorithm.decrypt(input, {
                    rotorsInitialOffset: rotorsSetting,
                    plugboard: plugboardSetting,
                });
            } catch (err) {
                setError(err);
                return;
            }
        }
        setOutput(result);
        setError(null);
    }, [input, mode, rotorsSetting, plugboardSetting]);

    return (
        <div className="w-4/5 m-auto py-10 flex justify-between">
            <TextView onChange={setInput} />

            <div className="w-1/4 bg-white rounded-sm shadow-sm">
                <div className="p-4 border-b text-center text-teal-500 text-xl font-bold">
                    Enigma Machine
                </div>
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
                        value={rotorsSetting}
                        label="Rotors Setting"
                        onChange={(rotorSetting: string): void => {
                            setRotorsSetting(rotorSetting);
                        }}
                    />
                    <TextArea
                        value={plugboardSetting}
                        label="Plugboard Setting"
                        onChange={(newPlugboardSetting: string): void => {
                            setPlugboardSetting(newPlugboardSetting);
                        }}
                    />
                </div>
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

export default Enigma;
