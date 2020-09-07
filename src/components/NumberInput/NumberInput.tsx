import React from 'react';

interface INumberInputProps {
    label: string;
    value: number;
    onChange: Function;
}

const NumberInput: React.FC<INumberInputProps> = (props) => {
    const { label, onChange, value } = props;
    return (
        <div className="p-4 text-sm flex-1 flex-col">
            <p className="text-gray-600">{label}</p>
            <input
                className="w-full text-center outline-none"
                value={value}
                onChange={(evt): void => {
                    onChange(evt.target.value);
                }}
            />
        </div>
    );
};

export default NumberInput;
