import React, { useState } from "react";
import StripeContainer from './StripeContainer'

const PageSeven = () => {
  const [showItem, setShowItem] = useState(false)




  return (
    <div>
    <h1> Payment Form </h1>
      {showItem ? <StripeContainer/> : <> <h3>£5</h3><button onClick={() => setShowItem(true)}> Purchase</button></>} 
     </div>
  );
  
}

export default PageSeven;