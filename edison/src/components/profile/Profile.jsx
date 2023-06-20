import { useState } from "react";
import imgprofile from "../../assets/img/profilepic.png";
import cvedison from "../../assets/pdf/EDISON_CV_2023.pdf";
import Info from "../../data/Info.jsx";
const Profile = () => {
  const [info, setInfo] = useState(Info);
  const { profile } = info;
  const { name, tel, email, profileProfession } = profile;
  return (
    <section id="about">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3">
            <img className="profile-pic" src={imgprofile} alt="Imagen de portada"/>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 col-xxl-9">
            <h2>Perfil profesional</h2>
            <p>{profileProfession}</p>
            <h2>Detalles de contacto</h2>
            <p className="address">
                <span>{name}</span> <br />
                <span> Teléfonos:{tel}</span>
                <br />
                <span>{email}</span>
            </p>
                <div className="download">
                  <p>
                    <a href={cvedison} target="_blank" className="button">
                      <i className="fa fa-download"></i>Descarga mi H.V
                    </a>
                  </p>
                </div>
         
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
