import { useState } from "react";
import imgprofile from "../../assets/img/edisonospina.jpg";
import Info from "../../data/Info.jsx";
const Profile = () => {
  const [info, setInfo] = useState(Info);
  const { profile } = info;
  const { name, tel, email, profileProfession } = profile;
  return (
    <section id="about">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <img className="profile-pic" src={imgprofile} alt="Imagen de portada"/>
          </div>
          <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
            <h2>Perfil profesional</h2>
            {profileProfession.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <h2>Detalles de contacto</h2>
            <p className="address">
                <span>{name}</span> <br />
                <span>Teléfono: {tel}</span>
                <br />
                <span>{email}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
