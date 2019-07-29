import React from 'react';

export default ({ children }) => {
  return(
    <div>
      {children}
    </div>
  )
};

// above childre the same as 
// const app = props => {
//   return(
//     {props.children}
//   )
// }