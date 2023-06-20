import { useState } from 'react';
import Info from "../../data/Info";
const Skill = () => {
    const [info, setInfo] = useState(Info);
    const { profile } = info;
    const { habilidades } = profile;
    return (
        <div className="skill">
            <div className='container-xxl pt-5 pb-5'>
                <div className="col-12">
                    <h1><span>Habilidades</span></h1>
                </div>
                <div className="col-12">
                    <p>{habilidades}</p>
                </div>
            </div>
        </div>
    );
}

export default Skill;