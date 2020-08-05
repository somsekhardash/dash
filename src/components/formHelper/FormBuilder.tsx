import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import FormText from './FormText';
import FormSelect from './FormSelect';
import FormObject from './FormObject';
import FormUpload from './FormUpload';
import FormTextArea from './FormTextArea';
import FormButton from './FormButton';
import FormDatePicker from './FormDatePicker';

const components: any = {
    text: FormText,
    number: FormText,
    select: FormSelect,
    object: FormObject,
    upload: FormUpload,
    textArea: FormTextArea,
    button: FormButton,
    datePicker: FormDatePicker
};

const nameformat = (name: string) => {
    return name.replace(/[^A-Z0-9]+/ig, "-");
}

const FormBuilder: React.FC<any> = ({ schema, idx, onSchemaChange, onSchemaClick, formGroups }) => {

    const onChange = (idx: any, name: any, data: any) => {
        onSchemaChange(idx, name, data);
    };

    const onClick = (name: any, data: any) => {
        onSchemaClick(name, data);
    }
  
    return (
        <div className="form-builder-container">
            <h3>{schema.name}</h3>
            {schema.items.map((Item: any, index: number) => {
                let Component = components["text"];
                Component = components[Item.type];
                return <Component
                    key={index}
                    schema={Item}
                    idx={idx ? `${idx}-${schema.name}` : schema.name}
                    onChange={onChange}
                    onClick={onClick}
                    onSchemaChange={onSchemaChange}
                />
            })}
        </div>
    );
};

export default FormBuilder;
