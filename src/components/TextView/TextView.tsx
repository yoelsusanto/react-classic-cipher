import React, { useState, useEffect } from 'react';

interface ITextViewProps {
    onChange: Function;
}

const TextView: React.FC<ITextViewProps> = (props) => {
    const { onChange } = props;
    const [value, setValue] = useState('');

    useEffect(() => {
        onChange(value);
        // eslint-disable-next-line
    }, [value]);

    return (
        <div className="w-1/4 bg-white rounded-sm shadow-sm focus-within:shadow-outline">
            <div className="h-auto p-4 border-b">
                <p className="text-teal-500 text-base">VIEW</p>
                <p className="text-teal-500 text-2xl mt-3 font-semibold">
                    Input
                </p>
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

export default TextView;
