import React, { useState, useEffect } from 'react';

interface IKeyInputProps {
    onChange: Function;
}

const KeyInput: React.FC<IKeyInputProps> = (props) => {
    const { onChange } = props;
    const [value, setValue] = useState('');

    useEffect(() => {
        onChange(value);
        // eslint-disable-next-line
    }, [value]);

    return (
        <div className="container">
        <div className="h-auto p-4 border-b">
            <p className="text-teal-500 text-base">Key</p>
            
        </div>
            <div className="h-auto p-5 border-b focus:bg-gray-500">
                <textarea
                    className="outline-none wrap w-full h-40 resize-none"
                    value={value}
                    onChange={(evt): void => {
                        setValue(evt.target.value);
                    }}
                />
            </div>
        </div>
    );
};

export default KeyInput;
