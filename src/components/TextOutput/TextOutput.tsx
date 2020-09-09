import React from 'react';

interface ITextOutputProps {
    value?: string;
}

const TextOutput: React.FC<ITextOutputProps> = (props) => {
    const { value: displayValue } = props;

    const triggerTextFileDownload = (): void => {
        if (displayValue?.length === 0) {
            alert('No output to be downloaded');
            return;
        }
        const link = document.createElement('a');
        link.download = 'output.txt';
        const blob = new Blob([displayValue!], { type: 'text/plain' });
        link.href = window.URL.createObjectURL(blob);
        link.click();
    };

    return (
        <div className="w-1/4 bg-white rounded-sm shadow-sm focus-within:shadow-outline">
            <div className="h-auto p-4 border-b">
                <div className="flex justify-between">
                    <p className="text-teal-500 text-base">VIEW</p>
                    <button
                        className="text-teal-500 text-base outline-none"
                        type="button"
                        onClick={(): void => triggerTextFileDownload()}
                    >
                        Download
                    </button>
                </div>

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
