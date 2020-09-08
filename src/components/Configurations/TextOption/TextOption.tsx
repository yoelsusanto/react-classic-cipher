import React, { useState, useEffect } from 'react';

interface IOptionProps {
    onClick: Function;
    selected: boolean;
}

interface ITextOptionProps {
    options: string[];
    onChange: Function;
}

const Option: React.FC<IOptionProps> = (props) => {
    const { onClick, children, selected } = props;
    return (
        <button
            onClick={(): void => {
                onClick();
            }}
            type="button"
            className={`${
                selected ? 'text-orange-400' : 'text-gray-500'
            } font-semibold focus:outline-none text-base`}
        >
            {children}
        </button>
    );
};

const TextOption: React.FC<ITextOptionProps> = (props) => {
    const { options, onChange } = props;
    const [selectedOption, setSelectedOption] = useState(options[0]);

    useEffect(() => {
        onChange(selectedOption);
        // eslint-disable-next-line
    }, [selectedOption]);

    return (
        <div className="flex justify-evenly">
            {options.map((option) => (
                <Option
                    onClick={(): void => {
                        setSelectedOption(option);
                    }}
                    selected={selectedOption === option}
                    key={option}
                >
                    {option}
                </Option>
            ))}
        </div>
    );
};

export default TextOption;
