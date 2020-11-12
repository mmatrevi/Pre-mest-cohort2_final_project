import React from "react";
import "./Content.css";
import ContentItem from "./ContentItem";
import Nav from "./Nav";

function Content() {
  return (
    <div className="cards">
      <Nav />
      <h1>Welcome to the new world of African designs</h1>

      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <ContentItem
              src="images/img-9.jpg"
              text="Explore the hidden world of African print Designs"
              label="Casual"
              path="/Casual-Gallery"
            />

            <ContentItem
              src="images/img-2.jpg"
              text="Think you've got what it takes, try this out"
              label="Executive"
              path="/Executive-Gallery"
            />
          </ul>
          <ul className="cards__items">
            <ContentItem
              src="images/img-3.jpg"
              text="Explore the hidden world of African print Designs"
              label="Summer"
              path="/Summer-Gallery"
            />
            <ContentItem
              src="images/img-4.jpg"
              text="Explore the hidden world of African print Designs"
              label="Kids"
              path="/Kids-Gallery"
            />
            <ContentItem
              src="images/img-8.jpg"
              text="Explore the hidden world of African print Designs"
              label="Creative"
              path="/Creative-Gallery"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Content;
