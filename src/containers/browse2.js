import React, {
  useState,
  useEffect,
  useContext,
  createRef,
  setState,
} from "react";
import Fuse from "fuse.js";
import { Card, Header, Loading, Player, Accordion } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../constants/Logowhiteplus.png";
import blacklogo from "../constants/Logolittle.png";
import { FirebaseContext } from "../context/firebase";
import { SelectProfileContainer } from "./profiles";
import { FooterContainer } from "./footer";

import { Background } from "../components/header/styles/header";

import { Container, Row, Col } from "react-bootstrap";
import { FilterContainer } from "./filter";

import SkeletonCard from "../components/SkeletonCard";

import "./browse.css";

import Sticky from "react-stickynode";

export function BrowseContainer({ slides }) {
  const [category, setCategory] = useState("series");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [slideRows, setSlideRows] = useState([]);
  const [navBar, setNavBar] = useState(false);

  const [navBar2, setNavBar2] = useState(false);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);

  useEffect(() => {
    setSlideRows(slides[category]);
  }, [slides, category]);

  useEffect(() => {
    const fuse = new Fuse(slideRows, {
      keys: ["data.description", "data.title", "data.genre"],
    });
    const results = fuse.search(searchTerm).map(({ item }) => item);

    //const subresults = results.slice(1, 3);

    if (slideRows.length > 0 && searchTerm.length > 3 && results.length > 0) {
      setSlideRows(results);
    } else {
      setSlideRows(slides[category]);
    }
  }, [searchTerm]);

  const changeBackground = () => {
    if (window.scrollY >= 195) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };

  const makeBlackLogo = () => {
    if (window.scrollY >= 300) {
      setNavBar2(true);
    } else {
      setNavBar2(false);
    }
  };

  window.addEventListener("scroll", changeBackground);
  window.addEventListener("scroll", makeBlackLogo);

  return (
    <div className="mainBackground">
      <Header left={true} dontShowOnSmallViewPort>
        <Sticky enabled={true} top={0} innerZ={999}>
          <Header.Frame className={navBar ? "navbarTopScrolled " : "navbarTop"}>
            <Header.Group>
              <Header.Logo
                //className="mainlogo"
                className={navBar ? "mainlogoScrolled " : "mainlogo"}
                to={ROUTES.HOME}
                src={navBar ? blacklogo:logo}
                alt="Solotrip"
              />
              <Header.TextLink2
                active={category === "series" ? "true" : "false"}
                onClick={() => setCategory("series")}
              >
                {""}{" "}
              </Header.TextLink2>{" "}
              <Header.TextLink2
                active={category === "films" ? "true" : "false"}
                onClick={() => setCategory("films")}
              >
                {""}{" "}
              </Header.TextLink2>{" "}
            </Header.Group>
            <Header.Group className="loginsignup">
              <Header.ButtonLink className="glow-on-hover" to="/signup">
                {" "}
                🍳Sunny Sign Up{" "}
              </Header.ButtonLink>{" "}
              <Header.ButtonLink2 to="/signin">
                {" "}
                🤘Login{" "}
              </Header.ButtonLink2>{" "}
            </Header.Group>{" "}
          </Header.Frame>{" "}
        </Sticky>
        <div className="mainHeader">
          <Header.FeautureContainer />
          <Header.FeatureContainer>
            <Header.FeatureCallOut>
              Find the best destination for you.{" "}
            </Header.FeatureCallOut>
            <Header.Searchbar>
              <Sticky
                innerZ={999}
                top={-5}
                enabled={true}
                className={navBar ? "searchheaderscrolled " : "searchheader"}
              >
                <Header.Search
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />{" "}
              </Sticky>{" "}
            </Header.Searchbar>{" "}
          </Header.FeatureContainer>{" "}
        </div>{" "}
      </Header>
      <div className="content">
        <Sticky enabled={true} top="#header" bottomBoundary={960 + 300 * (slideRows.length - 1)} >
          <FilterContainer style={{ width: "100px" }} />{" "}
        </Sticky>
        {loading ? (
          <SkeletonCard items={slideRows.length * 3} />
        ) : (
          <Card.Group>
            {" "}
            {console.log("slide rows is", slideRows)}{" "}
            {slideRows.map((slideItem) => (
              <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
                <Card.Title> {slideItem.title} </Card.Title>{" "}
                <hr
                  style={{
                    border: "1px solid rgba(234,234,234,0.3)",
                    width: "100%",
                    marginBottom: "30px",
                    marginTop: "-10px",
                  }}
                />
                <Card.Entities>
                  {" "}
                  {slideItem.data.map((item) => (
                    <Card.Item key={item.docId} item={item}>
                      <Card.Image
                        src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`}
                      />
                      <Card.Meta>
                        <Card.SubTitle> {item.title} </Card.SubTitle>
                        <Card.ButtonLink> Inspect </Card.ButtonLink>{" "}
                        <Card.Text> {item.description} </Card.Text>{" "}
                      </Card.Meta>{" "}
                    </Card.Item>
                  ))}{" "}
                </Card.Entities>{" "}
                <Card.Feature category={category}>
                  <Player>
                    <Card.CityButton> City Details </Card.CityButton>{" "}
                  </Player>{" "}
                </Card.Feature>{" "}
              </Card>
            ))}{" "}
          </Card.Group>
        )}{" "}
        <div> </div>{" "}
      </div>{" "}
      <div className="mainFooter">
        <div />
        <FooterContainer />
       
      </div>
       <Header className="bottomFooterImage" src="background1resized2c"/>

      
      
    </div>
    
  );
}