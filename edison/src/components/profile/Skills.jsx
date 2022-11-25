import { useState } from 'react';
import Info from "../../data/Info";
const Skill = () => {
    const [info, setInfo] = useState(Info);
    const { profile } = info;
    const { habilidades } = profile;
    return (
        <div className="row skill">
            <div className="three columns header-col">
                <h1><span>Habilidades</span></h1>
            </div>
            <div className="nine columns main-col">
                <p>{habilidades}</p>
            </div>
        </div>
    );
}

export default Skill;