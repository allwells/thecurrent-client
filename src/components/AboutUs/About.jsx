import "./About.css";

import { Text, Title } from "@mantine/core";

import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import ProfileCard from "../ProfileCard/ProfileCard";
import React from "react";

const About = () => {
  // const [founding, setFounding] = React.useState([]);
  // const [current, setCurrent] = React.useState([]);
  // const [editorial, setEditorial] = React.useState([]);

  // const sortName = (array) => {
  //   array.sort(function(x, y) {
  //     let a = x.name.toUpperCase(),
  //       b = y.name.toUpperCase();
  //     return a === b ? 0 : a > b ? 1 : -1;
  //   });
  // };

  // React.useEffect(() => {
  //   sortName(currentEditors);
  //   sortName(foundingEditors);

  //   setCurrent(currentEditors);
  //   setFounding(foundingEditors);
  //   setEditorial(editorialAdvicers);
  // }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />

      <div className="about">
        <Title className="aboutHead" order={1}>
          About <span>TheCurrent</span>
        </Title>

        <Text className="aboutText">
          TheCurrent is a practice newspaper produced by Mass Communication
          students of Anchor University, Lagos. The maiden edition of the
          newspaper was a print edition produced in 2019. However, to keep up
          with global trends, we are introducing an online version from March,
          2022, in line with global trends.
        </Text>

        <Text className="aboutText">
          As our name suggests, news should be really current to serve its
          purpose. Publishing our contents online helps us keep our news fresh,
          current and easily updated, thereby making The Current more timely and
          visible as people from all parts of the world access timely news from
          this website. We are here to serve you better round the clock.
        </Text>

        <Title className="head" order={1}>
          Founding <span>Editors</span>
        </Title>

        <div className="editors">
          {/* {founding.map((profile) => {
          return <ProfileCard {...profile} key={profile.id} />;
        })} */}
          <ProfileCard name={"Favor Akeredola"} position={"Editor-in-chief"} />
          <ProfileCard name={"Favor Akeredola"} position={"Editor-in-chief"} />
          <ProfileCard
            name={"Favor sjdsdbja garg"}
            position={"Editor-in-chief"}
          />
          <ProfileCard
            name={"aewggag Akeragsgedola"}
            position={"Editor-in-chief"}
          />
          <ProfileCard
            name={"asgasgagdgdgd asgdggagsgd AEFEFG"}
            position={"Editor-in-chief"}
          />
          <ProfileCard name={"Favor RGSGSGR"} position={"Editor-in-chief"} />
          <ProfileCard name={"DGDFGFDG SDG"} position={"Editor-in-chief"} />
          <ProfileCard
            name={"SRGGRGSERGR FGSGSG"}
            position={"Editor-in-chief"}
          />
        </div>

        <Title className="head" order={1}>
          Current <span>Editors</span>
        </Title>

        <div className="editors">
          {/* {current.map((profile) => {
          return <ProfileCard {...profile} key={profile.id} />;
        })} */}

          <ProfileCard name={"Favor Akeredola"} position={"Editor-in-chief"} />
          <ProfileCard name={"Favor Akeredola"} position={"Editor-in-chief"} />
          <ProfileCard
            name={"Favor sjdsdbja garg"}
            position={"Editor-in-chief"}
          />
          <ProfileCard
            name={"aewggag Akeragsgedola"}
            position={"Editor-in-chief"}
          />
          <ProfileCard
            name={"asgasgagdgdgd asgdggagsgd AEFEFG"}
            position={"Editor-in-chief"}
          />
          <ProfileCard name={"Favor RGSGSGR"} position={"Editor-in-chief"} />
          <ProfileCard name={"DGDFGFDG SDG"} position={"Editor-in-chief"} />
          <ProfileCard
            name={"SRGGRGSERGR FGSGSG"}
            position={"Editor-in-chief"}
          />
        </div>

        <Title className="head" order={1}>
          Editorial <span>Advicers</span>
        </Title>

        <div className="editors">
          {/* {editorial.map((profile) => {
          return (
            <ProfileCard
              key={profile.id}
              name={profile.title + ". " + profile.name}
              position={profile.position}
              img={profile.img}
            />
          );
        })} */}

          <ProfileCard name={"Favor Akeredola"} position={"Editor-in-chief"} />
          <ProfileCard name={"Favor Akeredola"} position={"Editor-in-chief"} />
          <ProfileCard
            name={"Favor sjdsdbja garg"}
            position={"Editor-in-chief"}
          />
          <ProfileCard
            name={"aewggag Akeragsgedola"}
            position={"Editor-in-chief"}
          />
          <ProfileCard
            name={"asgasgagdgdgd asgdggagsgd AEFEFG"}
            position={"Editor-in-chief"}
          />
          <ProfileCard name={"Favor RGSGSGR"} position={"Editor-in-chief"} />
          <ProfileCard name={"DGDFGFDG SDG"} position={"Editor-in-chief"} />
          <ProfileCard
            name={"SRGGRGSERGR FGSGSG"}
            position={"Editor-in-chief"}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
