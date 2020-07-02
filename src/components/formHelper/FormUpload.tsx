import * as React from 'react';
import { Button } from 'semantic-ui-react'


export const _uploadfile = async (data: any) => {
    return await fetch(`http://127.0.0.1:5000/api/uploadFile`, {
        method: 'POST',
        body: data
    })
    .then(response => response.json())
};
   

const FormUpload: React.FC<any> = ({idx,schema,onChange }) => {
    const [pictures, setPictures] = React.useState<any>([]);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const onDrop = (picture: any) => {
        setPictures(pictures.concat(picture));        
        const formData = new FormData();
        formData.append('imageFile', picture[0]);
        _uploadfile(formData).then(data => {
            console.log(data)
          })
          .catch(error => {
            console.error(error)
          });
    }

   
    return (
        <div className="logo">
            <Button
                content={schema.name}
                labelPosition="left"
                icon="file"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
            />
            <input
                ref={fileInputRef}
                type="file"
                multiple= {false}
                hidden
                onChange={(e) => onDrop(e.target.files)}
                accept="image/png, image/jpeg"
            />

            {pictures.map((node:any, index: number)=> {
                return <p key={index}>{node[0].name}</p>
            })}
        </div>
    );
};

export default FormUpload;
