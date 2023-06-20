import { useState } from "react";
import InfoWork from "../../data/InfoWork";
const Work = () => {
    const [work, setWork] = useState(InfoWork);
    return (
        <div className="container-xxl mb-5">
            <div className="row mt-5 mb-5">
                <div className="col-12">
                    <h1 className="text-center work-title-principal"><span>Trabajo</span></h1>
                </div>    
            </div>
            <div className="row">
                    {work.work.map((item) => (
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4" key={item.id}>
                            <h3 className="work-title">{item.empresa}</h3>
                            <p className="work-date">
                                {item.cargo} <span>&bull;</span>{" "}
                                <em>{item.date}</em>
                            </p>
                            <p className="work-description">{item.description}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Work;