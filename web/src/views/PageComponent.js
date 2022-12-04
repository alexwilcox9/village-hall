import React from 'react';

const Page = ({title, children}) => {
      return (
        <div id={`${title}-body`} className="page-body container">
            <h2 className="sr-only">{title}</h2>

            {children}
        </div>
      );
  }
  
export default Page;