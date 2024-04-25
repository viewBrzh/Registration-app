import React, { useEffect } from "react";

function Logout() {
    
    useEffect(() =>{
        localStorage.removeItem("userData");
        localStorage.removeItem("userRole");
    });

    return (
        <div>you're Loged-out</div>
    )
}

export default Logout;