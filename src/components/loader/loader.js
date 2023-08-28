// import React from "react";
// import { FallingLines } from  'react-loader-spinner';

// const loader = ({ show })=>{
//     return (
//         // <FallingLines
//         //     color="#4fa94d"
//         //     width="100"
//         //     visible={true}
//         //     ariaLabel='falling-lines-loading'
//         //     />
//         show ? (
//             <FallingLines
//                 color="#4fa94d"
//                 width={100}
//                 visible={true}
//                 ariaLabel='falling-lines-loading'
//             />
//         ) : null
//     )
// }


import React from "react";
import { InfinitySpin,ProgressBar ,FallingLines,RotatingSquare} from 'react-loader-spinner';
import "./loader.css";

const LoaderComponent = ({ show }) => {
    return (
        <div className="LoaderrooMy">
        {
        show ? (
            // <FallingLines
            //     color="#4fa94d"
            //     width={100}
            //     height={100}
            //     visible={true}
            //     ariaLabel='falling-lines-loading'
            //     />
            // <InfinitySpin 
            // width='200'
            // color="#4fa94d"
            // />

            // <ProgressBar
            // height="80"
            // width="80"
            // ariaLabel="progress-bar-loading"
            // wrapperStyle={{}}
            // wrapperClass="progress-bar-wrapper"
            // borderColor = '#F4442E'
            // barColor = '#51E5FF'
            // />
            <RotatingSquare
            height="120"
            width="120"
            color="rgb(34,5,65)"
            ariaLabel="rotating-square-loading"
            strokeWidth="4"
            wrapperStyle={{color:"red"}}
            wrapperClass=""
            visible={true}
            />
        ) : null}
        </div>
    );
};

export default LoaderComponent;
