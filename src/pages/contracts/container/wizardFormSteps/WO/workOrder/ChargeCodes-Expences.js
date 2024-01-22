import React from 'react';
import ChargeCodes from './ChargeCodes';
import ExpenseCodes from './ExpenseCodes';

const ChargeCodesExpences = ({data}) => {
    return (
        <div>
            <div className="mb-5">
                <ChargeCodes prevData={data}/>
            </div>
            <div>
                <ExpenseCodes prevData={data}/>
            </div>
        </div>
    );
};

export default ChargeCodesExpences;
