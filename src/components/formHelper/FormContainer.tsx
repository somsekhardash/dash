import * as React from 'react';
import HeaderForm from './HeaderForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillForm from './SkillForm';

const FormContainer: React.FC<any> = () => {
    return (
        <div className="input">
            <HeaderForm />
            <ExperienceForm />
            <EducationForm />
            <SkillForm />
        </div>
    );
};

export default FormContainer;

