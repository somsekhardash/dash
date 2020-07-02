import * as React from 'react';
import FormBuilder from './FormBuilder';

const FormObject: React.FC<any> = ({schema, idx, onSchemaChange}) => {
    return (
        <React.Fragment>
            <h2>{schema.name}</h2>
            <FormBuilder 
                schema={schema}
                idx={idx}
                onSchemaChange= {onSchemaChange}
            />
        </React.Fragment>
    );
};

export default FormObject;
