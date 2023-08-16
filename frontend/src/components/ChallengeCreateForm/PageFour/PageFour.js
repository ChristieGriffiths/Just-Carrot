import React from "react";
import signUpImage from '../../assets/signUpImage.jpeg';

const PageFour = ({ onButtonClick}) => {
  function Charity(name, description, website, photo, chosen, image, logo) {
    this.name = name;
    this.description = description;
    this.website = website
    this.photo = photo;
    this.chosen = chosen;
    this.image = image;
    this.logo = logo
}

    const charities = [
      new Charity("Nuclear Threat Initiative ", "NTI works to reduce catastrophic nuclear, biological, radiological, chemical and cyber risks. They are recommended for their work on biosecurity.", "www.nti.org", false, "image1.jpg", "logo.jpg"),
      new Charity("Against Malaria Foundation", "Fights malaria by distributing insecticide=treated mosquito nets in at-risk, low-income communities.", "www.againstmalaria.com", false, "image2.jpg", "logo.png"),
      new Charity("Give Directly", "GiveDirectly makes uncondtional cash transfers to people living in extreme poverty", "www.givedirectly.org", false, "image3.jpg", "logo.png")
    ];

    const listItems = charities.map((number) =>
      <li>{number}</li>
    );

    return (
      <div
        className="mw5 bg-white pa2-ns mt5 dib"
        style={{ maxWidth: "30%", maxHeight:'30%' }}
      >
        <h2>Choose your charity:</h2>
        <div>
      {charities.map((charity, index) => (
        <div key={index}>
          <h2>{charity.name}</h2>
          <p>{charity.description}</p>
          <p>{charity.website}</p>
          <img src={charity.photo} alt={charity.name} />
          <img src={charity.image} alt={`${charity.name} Image`} />
          <img src={charity.logo} alt={`${charity.name} Logo`} />
        </div>
      ))}
    </div>
        <input
          className="f6 grow br2 ph3 pv2 mb2 dib white"
          style={{ borderStyle: "none", width: "100%", backgroundColor: '#f39200' }}
          type="submit"
          value="Next"
          onClick={() => onButtonClick("pagefive")}
        />
      </div>
    );
}

export default PageFour;