import "./About.css";

import * as editors from "../../api";

import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import ProfileCard from "../ProfileCard/ProfileCard";
import React from "react";

const About = () => {
  const [founding, setFounding] = React.useState([]);
  const [current, setCurrent] = React.useState([]);
  const [editorial, setEditorial] = React.useState([]);

  const sortName = (array) => {
    array.sort(function(x, y) {
      let a = x.name.toUpperCase(),
        b = y.name.toUpperCase();
      return a === b ? 0 : a > b ? 1 : -1;
    });
  };

  React.useEffect(() => {
    sortName(editors.foundingEditors);
    sortName(editors.currentEditors);
    sortName(editors.editorialAdvicers);

    setFounding(editors.foundingEditors);
    setCurrent(editors.currentEditors);
    setEditorial(editors.editorialAdvicers);
  }, []);

  const HEADERSTYLE = "title has-text-dark has-text-weight-bold is-4 mt-3";
  const HEADERCOLOR = "has-text-link";
  const ABOUT_TEXT = "is-text-5 has-text-dark";

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />

      <div className="about">
        <h2 className={`${HEADERSTYLE} mt-5`}>
          About <span className={HEADERCOLOR}>TheCurrent</span>
        </h2>

        <p className={ABOUT_TEXT}>
          TheCurrent is a practice newspaper produced by Mass Communication
          students of Anchor University, Lagos. The maiden edition of the
          newspaper was a print edition produced in 2019. However, to keep up
          with global trends, we are introducing an online version from March,
          2022, in line with global trends.
        </p>

        <p className={ABOUT_TEXT}>
          As our name suggests, news should be really current to serve its
          purpose. Publishing our contents online helps us keep our news fresh,
          current and easily updated, thereby making The Current more timely and
          visible as people from all parts of the world access timely news from
          this website. We are here to serve you better round the clock.
        </p>

        <h2 className={`${HEADERSTYLE} mt-5`}>
          Founding <span className={HEADERCOLOR}>Editors</span>
        </h2>

        <div className="about-sub-section">
          {founding.map((profile) => {
            return <ProfileCard {...profile} key={profile.id} />;
          })}
        </div>

        <h2 className={`${HEADERSTYLE} mt-5`}>
          Current <span className={HEADERCOLOR}>Editors</span>
        </h2>

        <div className="about-sub-section">
          {current.map((profile) => {
            return <ProfileCard {...profile} key={profile.id} />;
          })}
        </div>

        <h2 className={`${HEADERSTYLE} mt-5`}>
          Editorial <span className={HEADERCOLOR}>Advicers</span>
        </h2>

        <div className="about-sub-section">
          {editorial.map((profile) => {
            return (
              <ProfileCard
                key={profile.id}
                name={profile.title + ". " + profile.name}
                position={profile.position}
                img={profile.img}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
