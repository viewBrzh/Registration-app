import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Logout() {
    
    useEffect(() =>{
        localStorage.removeItem("userData");
        localStorage.removeItem("userRole");
    });

    return (
        <div className="container row">
            <div >you're Loged-out</div>
            <Link to="/"><Button>Home</Button></Link>
        </div>
        
    )
}

export default Logout;