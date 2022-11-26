import { useState } from "react";
import InfoWork from "../../data/InfoWork";
const Work = () => {
    const [work, setWork] = useState(InfoWork);
    return (
        <div className="row work">
            <div className="three columns header-col">
                <h1><span>Trabajo</span></h1>
            </div>
            <div className="nine columns main-col">
                {work.work.map((item) => (
                    <div className="row item" key={item.id}>
                        <div className="twelve columns">
                            <h3>{item.empresa}</h3>
                            <p className="info">
                                {item.cargo} <span>&bull;</span>{" "}
                                <em className="date">{item.date}</em>
                            </p>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Work;