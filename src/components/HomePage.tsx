import React, { useEffect } from 'react';
import useHttp from './share/UseHttp';
import SiteHeader from './siteHelper/SiteHeader';
import SiteExperience from './siteHelper/SiteExperience';
import SiteNav from './siteHelper/SiteNav';
import SiteEducation from './siteHelper/SiteEducation';

const HomePage: React.FC<any> = () => {
    const [getHeaderLoader, getHeaderData, getHeaderError, getHeader] = useHttp();
    const [getExperienceLoader, getExperienceData, getExperienceError, getExperience] = useHttp();
    const [getEducationLoader, getEducationData, getEducationError, getEducation] = useHttp();
    useEffect(() => {
        getHeader(`https://extendsclass.com/api/json-storage/bin/bcdbefd`, {
            headers: {
                'Content-Type': 'application/json'
            }, method: 'GET', mode: 'cors'
        });
        getExperience(`https://json.extendsclass.com/bin/3c1c15b5ffa8`, {
            headers: {
                'Content-Type': 'application/json'
            }, method: 'GET', mode: 'cors'
        });
        getEducation(`https://api.npoint.io/8a1e3ba74b9311130fc5`, {
            headers: {
                'Content-Type': 'application/json'
            }, method: 'GET', mode: 'cors'
        });
    }, []);
    
    return (
        <div className="input">
            <SiteNav />
            {getHeaderData && <SiteHeader
                data={getHeaderData}
            />}
            {getExperienceData && <SiteExperience 
                data={getExperienceData}
            />}

            {getEducationData &&<SiteEducation 
                data={getEducationData}
            />}


        </div>
    );
};

export default HomePage;


