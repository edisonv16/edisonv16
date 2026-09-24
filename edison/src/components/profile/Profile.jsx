import imgprofile from "../../assets/img/edisonospina.jpg";
import useProfile from "./useProfile";

const Profile = () => {
  const { title, description, subtitle, strengths } = useProfile();

  return (
    <section id="about">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <img className="profile-pic" src={imgprofile} alt="Imagen de portada"/>
          </div>
          <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
            <div className="mb-4">
              <span className="section-badge section-badge--dark">
                <i className="fa fa-user" aria-hidden="true"></i> Sobre Mí
              </span>
              <h2 className="section-title-principal section-title-principal--dark text-start">
                <span>Perfil Profesional</span>
              </h2>
            </div>

            {title && (
              <h3 className="profile-title">
                {title}
              </h3>
            )}

            {description && (
              <p className="profile-description">
                {description}
              </p>
            )}

            {subtitle && (
              <h4 className="profile-subtitle">
                <i className="fa fa-star" aria-hidden="true"></i>
                <span>{subtitle}</span>
              </h4>
            )}

            {strengths.length > 0 && (
              <ul className="profile-items-list">
                {strengths.map((strengthItem) => (
                  <li key={strengthItem.boldTitle} className="profile-item">
                    <i className="fa fa-chevron-right profile-item-icon" aria-hidden="true"></i>
                    <div>
                      <strong>{strengthItem.boldTitle} </strong>
                      <span>{strengthItem.descriptionText}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
