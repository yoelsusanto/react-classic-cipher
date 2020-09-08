import React from 'react';

interface ITextAreaProps {
    label: string;
    value: string;
    onChange: Function;
}

const TextArea: React.FC<ITextAreaProps> = (props) => {
    const { label, onChange, value } = props;
    return (
        <div className="p-4 text-sm flex-1 flex-col">
            <p className="text-gray-600">{label}</p>
            <textarea
                className="outline-none wrap w-full h-40 resize-none"
                value={value}
                onChange={(evt): void => {
                    onChange(evt.target.value);
                }}
            />
        </div>
    );
};

export default TextArea;
