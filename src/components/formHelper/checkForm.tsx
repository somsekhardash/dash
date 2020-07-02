import React, { useEffect } from 'react';
import FormBuilder from './FormBuilder';
import { alarmDefinition } from './schema';
import merge from 'deepmerge';
import './app.scss';
import useHttp from './UseHttp';
import { Button } from 'semantic-ui-react';

const CheckForm: React.FC<any> = (props: any) => {
    const [header, setHeader] = React.useState({});
    const onSchemaChange = (idx: any, name: any, data: any) => {
        console.log(data);
        const idxArray = `${idx}-${name}`.split("-");
        const result = idxArray.reverse().reduce((res, key) => ({ [key]: res }), data);
        setHeader(merge(header, result));
        console.log(merge(header, result));

    }
    const [isLoading, data, error, makeTheCall] = useHttp();


    const setHeaderCall = () => {
        makeTheCall(`http://127.0.0.1:5000/api/setHeader`, {
            body: JSON.stringify(header), headers: {
                'Content-Type': 'application/json'
            }, method: 'POST', mode: 'cors'
        });
        console.log(isLoading, data, error);
    }

    return (
        <>
            <FormBuilder
                schema={alarmDefinition}
                onSchemaChange={onSchemaChange}
            />
            <Button onClick={setHeaderCall}>click here</Button>
        </>
    );
};

export default CheckForm;
