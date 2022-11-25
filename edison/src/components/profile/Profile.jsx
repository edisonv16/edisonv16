import { useState } from 'react';
import imgprofile from '../../assets/img/profilepic.png';
import cvedison from '../../assets/pdf/CV2016A.pdf';
import Info from '../../data/Info.jsx';
const Profile = () => {
    const [info, setInfo] = useState(Info);
    const { profile } = info;
    const { name, tel, email, profileProfession } = profile;
    return (
        <section id="about">
            <div className="row">
                <div className="three columns">
                    <img className="profile-pic" src={imgprofile} alt="Imagen de portada" />
                </div>
                <div className="nine columns main-col">
                    <h2>Perfil profesional</h2>
                    <p>{profileProfession}</p>
                    <div className="row">
                        <div className="columns contact-details">
                            <h2>Detalles de contacto</h2>
                            <p className="address">
                                <span>{name}</span> <br/>
                                <span> Teléfonos:{tel}</span><br/>
                                <span>{email}</span>
                            </p>
                            <div className="columns download">
                                <p>
                                    <a href={cvedison} target="_blank" className="button"><i className="fa fa-download"></i>Descarga mi H.V</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;