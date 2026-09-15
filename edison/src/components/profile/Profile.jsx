import imgprofile from "../../assets/img/edisonospina.jpg";
import Info from "../../data/Info.jsx";

const Profile = () => {
  const { profile } = Info;
  const { profileProfession } = profile;

  return (
    <section id="about">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <img className="profile-pic" src={imgprofile} alt="Imagen de portada"/>
          </div>
          <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
            <h2>Perfil profesional</h2>
            {profileProfession.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
