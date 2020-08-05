import React, { useEffect } from 'react';
import { Button, Loader, Divider, Grid, Segment, Icon, Header, Modal, Input } from 'semantic-ui-react';
import merge from 'deepmerge';
import FormBuilder from './FormBuilder';
import { educationDefinition, formGroups } from '../schemas/educationSchema';
import useHttp from '../share/UseHttp';
var classNames = require('classnames');
var _ = require('lodash');


const EducationForm: React.FC<any> = () => {
    const [educationComponentData, seteducationComponentData] = React.useState({});
    const [showModal, setShowModal] = React.useState(false);
    const [widgetName, setWidgetName] = React.useState("");
    const [seteducationLoader, seteducationData, seteducationError, seteducation] = useHttp();
    const [geteducationLoader, geteducationData, geteducationError, geteducation] = useHttp();
    const [localeducationDefinition, setLocaleducationDefinition] = React.useState(educationDefinition);

    const onSchemaChange = (idx: any, name: any, data: any) => {
        const idxArray = `${idx}-${name}`.split("-");
        const result = idxArray.reverse().reduce((res, key) => ({ [key]: res }), data);
        seteducationComponentData(merge(educationComponentData, result || {}));
    }

    useEffect(() => {
        geteducation(`https://api.npoint.io/8a1e3ba74b9311130fc5`, {
            headers: {
                'Content-Type': 'application/json'
            }, method: 'GET', mode: 'cors'
        });
    }, []);

    const updateItem = (x:any, y:any) => {
            return x.map((node:any) => {
                node.value = y[node.name]
                return {...node}
            })
    }
   

    useEffect(()=> {
        if(geteducationData && localeducationDefinition)
        {
            var companyNames = Object.keys(geteducationData[localeducationDefinition.name]);
            var temp = formGroups[localeducationDefinition.groups[0]];
            var temppp = companyNames.map(node => {
                var temp1 = {...temp, items: [...updateItem(temp.items,geteducationData[localeducationDefinition.name][node])]} 
                var obj = {...temp1};
                obj.name = node;
                return obj;
            });
            localeducationDefinition.items = [...localeducationDefinition.items, ...temppp];
            setLocaleducationDefinition( Object.assign({},localeducationDefinition));
        }
    },[geteducationData])

    const addWidgetCall = () => {
        var temp = formGroups[localeducationDefinition.groups[0]];
        temp.name = widgetName;
        localeducationDefinition.items.push({ ...temp });
        setLocaleducationDefinition(Object.assign({}, localeducationDefinition));
        setShowModal(!showModal);
    }

    const deleteWidgetCall = (name: any, data: any) => {
        console.log(name, data);
    }

    const onSchemaClick = (name: string, data: any) => {
        switch (name) {
            case "formClear":
                break;
            case "saveForm":
                seteducationCall();
                break;
            case "addWidget":
                setShowModal(true);
                break;
            case "deleteWidget":
                deleteWidgetCall(name, data);
                break;
            default:
                break;
        }
    }

    const seteducationCall = () => {
        const updatedData = merge(geteducationData, educationComponentData);
        seteducation(`https://api.npoint.io/8a1e3ba74b9311130fc5`, {
            body: JSON.stringify(updatedData), headers: {
                'Content-Type': 'application/json'
            }, method: 'PUT', mode: 'cors'
        });
    }

    var parentClass = classNames({
        section: true
    }, {
        loader: seteducationLoader || geteducationLoader
    });


    return (
        <div className={parentClass}>
            {showModal && <div>
                <Input placeholder='Enter Widget Name' value={widgetName} onChange={(a, b) => setWidgetName(b.value)} />
                <Button color='blue' onClick={addWidgetCall}>
                    <Icon name='add' /> Add
                </Button>
            </div>}
            <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Divider vertical> <Icon disabled name='arrow circle right' /> </Divider>
                    <Grid.Column>
                        {geteducationData && <FormBuilder
                            schema={localeducationDefinition}
                            formGroups={formGroups}
                            onSchemaChange={onSchemaChange}
                            onSchemaClick={onSchemaClick}
                        />}
                    </Grid.Column>
                    <Grid.Column>
                        <pre>
                            {JSON.stringify(merge(geteducationData, educationComponentData), null, 4)}
                        </pre>
                    </Grid.Column>
                </Grid>

            </Segment>
        </div>
    );
};

export default EducationForm;

