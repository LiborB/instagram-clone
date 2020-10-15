import {PulseLoader} from "react-spinners";
import * as React from "react";

export default function Loader() {
    return <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}><PulseLoader loading={true} color="lightblue" /></div>
}
