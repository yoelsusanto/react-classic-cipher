import React from 'react';

interface ITextOutputProps {
    value?: string;
}

const TextOutput: React.FC<ITextOutputProps> = (props) => {
    const { value: displayValue } = props;

    return (
        <div className="w-1/4 bg-white rounded-sm shadow-sm focus-within:shadow-outline">
            <div className="h-auto p-4 border-b">
                <p className="text-teal-500 text-base">VIEW</p>
                <p className="text-teal-500 text-2xl mt-3 font-semibold">
                    Output
                </p>
            </div>
            <div className="h-auto p-5 border-b focus:bg-gray-500">
                <textarea
                    className="outline-none wrap w-full h-40 resize-none"
                    value={displayValue}
                    readOnly
                />
            </div>
        </div>
    );
};

export default TextOutput;
