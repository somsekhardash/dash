export const alarmDefinition: any = {
    name: 'header',
    type: 'object',
    items: [
        {
            type: 'text',
            description: 'heading',
            value: '',
            name: 'heading',
        },
        {
            type: 'textArea',
            description: 'description',
            value: '',
            name: 'description',
        },
        {
            type: 'upload',
            description: 'logo',
            value: '',
            name: 'logo'
        }
    ]
};
