import React, { useEffect } from 'react';
import { Button, Loader, Divider, Grid, Segment, Icon, Header, Modal, Input } from 'semantic-ui-react';
import merge from 'deepmerge';
import FormBuilder from './FormBuilder';
import { skillDefinition } from '../schemas/skillsSchema';
import useHttp from '../share/UseHttp';
var classNames = require('classnames');
var _ = require('lodash');


const SkillForm: React.FC<any> = () => {
    const [experienceComponentData, setExperienceComponentData] = React.useState({});
    const [showModal, setShowModal] = React.useState(false);
    const [widgetName, setWidgetName] = React.useState("");
    const [setExperienceLoader, setExperienceData, setExperienceError, setExperience] = useHttp();
    const [getExperienceLoader, getExperienceData, getExperienceError, getExperience] = useHttp();
    const [localExperienceDefinition, setLocalExperienceDefinition] = React.useState(skillDefinition);

    const onSchemaChange = (idx: any, name: any, data: any) => {
        const idxArray = `${idx}-${name}`.split("-");
        const result = idxArray.reverse().reduce((res, key) => ({ [key]: res }), data);
        setExperienceComponentData(merge(experienceComponentData, result || {}));
    }

    useEffect(() => {
        getExperience(`https://api.npoint.io/5fdc2c1409ff9d30088a`, {
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
        if(getExperienceData && localExperienceDefinition)
        {
            // var companyNames = Object.keys(getExperienceData[localExperienceDefinition.name]);
            // var temp = formGroups[localExperienceDefinition.groups[0]];
            // var temppp = companyNames.map(node => {
            //     var temp1 = {...temp, items: [...updateItem(temp.items,getExperienceData[localExperienceDefinition.name][node])]} 
            //     var obj = {...temp1};
            //     obj.name = node;
            //     return obj;
            // });
            // localExperienceDefinition.items = [...localExperienceDefinition.items, ...temppp];
            // setLocalExperienceDefinition( Object.assign({},localExperienceDefinition));
        }
    },[getExperienceData])

    const addWidgetCall = () => {
        console.log(localExperienceDefinition);
        debugger;
        // var temp = formGroups[localExperienceDefinition.groups[0]];
        // temp.name = widgetName;
        // localExperienceDefinition.items.push({ ...temp });
        // setLocalExperienceDefinition(Object.assign({}, localExperienceDefinition));
        // setShowModal(!showModal);
    }

    const deleteWidgetCall = (name: any, data: any) => {
        console.log(name, data);
    }

    const onSchemaClick = (name: string, data: any) => {
        switch (name) {
            case "formClear":
                break;
            case "saveForm":
                setExperienceCall();
                break;
            case "addTools":
                setShowModal(true);
                break;
            case "deleteWidget":
                deleteWidgetCall(name, data);
                break;
            default:
                break;
        }
    }

    const setExperienceCall = () => {
        const updatedData = merge(getExperienceData, experienceComponentData);
        setExperience(`https://api.npoint.io/5fdc2c1409ff9d30088a`, {
            body: JSON.stringify(updatedData), headers: {
                'Content-Type': 'application/json'
            }, method: 'PUT', mode: 'cors'
        });
    }

    var parentClass = classNames({
        section: true
    }, {
        loader: setExperienceLoader || getExperienceLoader
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
                        {getExperienceData && <FormBuilder
                            schema={localExperienceDefinition}
                            onSchemaChange={onSchemaChange}
                            onSchemaClick={onSchemaClick}
                        />}
                    </Grid.Column>
                    <Grid.Column>
                        <pre>
                            {JSON.stringify(merge(getExperienceData, experienceComponentData), null, 4)}
                        </pre>
                    </Grid.Column>
                </Grid>

            </Segment>
        </div>
    );
};

export default SkillForm;

