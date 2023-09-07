import React, { useState } from "react";
import StripeContainer from './StripeContainer'

const PageSeven = () => {
  const [showItem, setShowItem] = useState(false)




  return (
    <div>
    <h1> Payment Form </h1>
      <StripeContainer/>
     </div>
  );
  
}

export default PageSeven;