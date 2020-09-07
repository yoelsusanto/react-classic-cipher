import React, { useState, useEffect } from 'react';
import TextView from 'components/TextView';
import PlayFairChiper from 'algorithms/PlayFair';

const Playfair: React.FC<{}> = () => {
    const [input, setInput] = useState('');

    useEffect(() => {
        const table = PlayFairChiper.createPlayFairTable(input);
        console.log(table);
        console.log(input);
    }, [input]);
    return (
        <div className="w-4/5 m-auto py-10 flex justify-between">
            <TextView onChange={setInput} />
            <div className="w-1/4 bg-white rounded-sm shadow-sm">square</div>
            <div className="w-1/4 bg-white rounded-sm shadow-sm">square</div>
        </div>
    );
};

export default Playfair;
