import React from 'react';

function Loading() {
    return(
        <div className="col" style={{
            "height": "100%",
            "display": "flex",
            "justify-content": "center",
            "alignItems": "center",
            "align-items": "center"}}>
            <i className="fa fa-spinner fa-lg"/>
            <p>Loading....</p>
          </div>
    );
}

export default Loading;