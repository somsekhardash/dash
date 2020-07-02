import * as React from 'react';
import 'semantic-ui-css/semantic.min.css'
import FormText from './FormText';
import FormSelect from './FormSelect';
import FormObject from './FormObject';
import FormUpload from './FormUpload';
import FormTextArea from './FormTextArea';

const components: any = {
    text: FormText,
    select: FormSelect,
    object: FormObject,
    upload: FormUpload,
    textArea :FormTextArea
};

const nameformat = (name: string) => {
    return name.replace(/[^A-Z0-9]+/ig, "-");
}

const FormBuilder: React.FC<any> = ({ schema, idx , onSchemaChange }) => {
    
    const onChange = (idx:any,name: any,data: any) => {
        onSchemaChange(idx,name,data);
    };

    return (
        <div className="form-builder-container">
            <h3>{schema.name}</h3>
            {schema.items.map((Item: any, index: number) => {
                const Component = components[Item.type];
                return <Component
                            key={index}
                            schema={Item}
                            idx={idx? `${idx}-${schema.name}` : schema.name}
                            onChange={onChange}
                            onSchemaChange = {onSchemaChange}
                        />
            })}
        </div>
    );
};

export default FormBuilder;
