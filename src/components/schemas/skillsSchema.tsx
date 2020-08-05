export const skillDefinition: any = {
    name: 'skills',
    type: 'object',
    items: [
        {
            type: 'text',
            description: 'subtitle',
            value: '',
            name: 'subtitle',
        },
        {
            type: 'object',
            description: 'tools',
            name: 'tools',  
            items: [
                {
                    type: 'button',
                    description: 'save this form',
                    label: 'Add Tools',
                    value: '',
                    name: 'addTools',
                    color: 'blue'
                }
            ] 
        },
        {
            type: 'object',
            description: 'workflow',
            name: 'subtitle',  
            items: [
                {
                    type: 'button',
                    description: 'save this form',
                    label: 'Add Workflow',
                    value: '',
                    name: 'addWorkflow',
                    color: 'blue'
                }
            ] 
        },
        {
            type: 'button',
            description: 'save this form',
            label: 'Save Form',
            value: '',
            name: 'saveForm',
            color: 'green' 
        }
    ]
};