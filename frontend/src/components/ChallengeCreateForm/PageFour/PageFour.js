import Reac, { useState }  from "react";
import "./PageFour.css"

import AMFImage from '../../../assets/AMFImage.png';
import AMFLogo from '../../../assets/AMFLogo.png';
import GiveDirectlyImage from '../../../assets/GiveDirectlyImage.png';
import GiveDirectlyLogo from '../../../assets/GiveDirectlyLogo.png';
import NTIImage from '../../../assets/NTIImage.png';
import NTILogo from '../../../assets/NTILogo.png';

const PageFour = ({ onButtonClick}) => {
  function Charity(name, description, website, chosen, image, logo) {
    this.name = name;
    this.description = description;
    this.website = website
    this.chosen = chosen;
    this.image = image;
    this.logo = logo
}

    const charities = [
      new Charity("Nuclear Threat Initiative ", "NTI works to reduce catastrophic nuclear, biological, radiological, chemical and cyber risks. They are recommended for their work on biosecurity.", "www.nti.org", false, NTIImage, NTILogo),
      new Charity("Against Malaria Foundation", "Fights malaria by distributing insecticide=treated mosquito nets in at-risk, low-income communities.", "www.againstmalaria.com", false, AMFImage, AMFLogo),
      new Charity("Give Directly", "GiveDirectly makes uncondtional cash transfers to people living in extreme poverty", "www.givedirectly.org", false, GiveDirectlyImage, GiveDirectlyLogo)
    ];

    const [selectedCharityIndex, setSelectedCharityIndex] = useState(null);

    return (
      <div className="mw5 bg-white pa2-ns mt5 dib">
        <h2>Choose your charity:</h2>
        <div className="charityList">
          {charities.map((charity, index) => (
             <div
             className={`charityContainer ${selectedCharityIndex === index ? "selected" : ""}`}
             key={index}
             onClick={() => setSelectedCharityIndex(index)} // Step 2: Update the selected charity index on click
           >
              
              <img className="charityImage" src={charity.image} alt={`${charity.name} `} />
              <div className="charityInfo">
                <h2 className="charityName">{charity.name}</h2>
                <p className="charityDescription">{charity.description}</p>
                <p className="charityWebsite">
                  <a href={charity.website} target="_blank" rel="noopener noreferrer">
                    {charity.website}
                  </a>
                </p>
              </div>
              <img className="charityLogo" src={charity.logo} alt={`${charity.name} Logo`} />
            </div>
          ))}
        </div>
        <input
          className="f6 grow br2 ph3 pv2 mb2 dib white"
          style={{ borderStyle: "none", width: "100%", backgroundColor: "#f39200" }}
          type="submit"
          value="Next"
          onClick={() => onButtonClick("pagefive")}
        />
      </div>
    );
  };

export default PageFour;