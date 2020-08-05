import React, { useEffect } from 'react';
import FormBuilder from './FormBuilder';
import { headerDefinition } from '../schemas/headerSchema';
import merge from 'deepmerge';
import './app.scss';
import useHttp from '../share/UseHttp';
import { Button, Loader,Divider, Grid, Segment,Icon } from 'semantic-ui-react';
var classNames = require('classnames');

const HeaderForm: React.FC<any> = (props: any) => {
    const [headerComponentData, setHeaderComponentData] = React.useState({});
    const [setHeaderLoader, setHeaderData, setHeaderError, setHeader] = useHttp();
    const [getHeaderLoader, getHeaderData, getHeaderError, getHeader] = useHttp();

    const onSchemaChange = (idx: any, name: any, data: any) => {
        const idxArray = `${idx}-${name}`.split("-");
        const result = idxArray.reverse().reduce((res, key) => ({ [key]: res }), data);
        setHeaderComponentData(merge(headerComponentData, result || {}));
    }

    useEffect(() => {
        getHeader(`https://extendsclass.com/api/json-storage/bin/bcdbefd`, {
            headers: {
                'Content-Type': 'application/json'
            }, method: 'GET', mode: 'cors'
        });
    }, [setHeaderData]);

    const updateSchema = (data: any, definition: any) => {
        var selectedNode = data[definition.name];
        
        definition.items.forEach((element: any) => {
            element.value = selectedNode[element.name] ? selectedNode[element.name] : "";
            if (element.type == 'object') {
                updateSchema(selectedNode, element);
            }
        });
        return definition;
    }

    const setHeaderCall = () => {
        const updatedData = merge(getHeaderData, headerComponentData);
        setHeader(`https://extendsclass.com/api/json-storage/bin/bcdbefd`, {
            body: JSON.stringify(updatedData), headers: {
                'Content-Type': 'application/json'
            }, method: 'PUT', mode: 'cors'
        });
    }
    
    const onSchemaClick = (name: string, data: any) => {
        switch(name) {
            case "formClear":
            
                break;
            case "saveForm":
                setHeaderCall();
                break;
        
            default:
                break;
        }
    }

    var parentClass = classNames({
        section: true
    }, {
        loader: getHeaderLoader || setHeaderLoader
    });

    return (
        <div className={parentClass}>
            <Segment placeholder>
            <Grid columns={2} relaxed='very' stackable>
                <Divider vertical> <Icon disabled name='arrow circle right' /> </Divider>
                <Grid.Column>
                    {getHeaderLoader && <b>Loading...</b>}
                    {setHeaderLoader && <b>Loading...</b>}
                    {getHeaderData && <FormBuilder
                        schema={updateSchema(getHeaderData, headerDefinition)}
                        onSchemaChange={onSchemaChange}
                        onSchemaClick= {onSchemaClick}
                    />}
                </Grid.Column>
                <Grid.Column>
                    <pre>
                        {JSON.stringify(merge(getHeaderData, headerComponentData), null, 4)}
                    </pre>
                </Grid.Column>
            </Grid>
            
            </Segment>
        </div>
    );
};

export default HeaderForm;
