import React, { useRef, useEffect } from 'react'
import Logo from 'uilab-logo.js/lib/uilab-logo'
import kaistLogo from "../../public/images/kaist_logo.png"

export const Members = () => {
    const logoRef = useRef(null);

    useEffect(() => {
        if (logoRef.current) {
            const logo = new Logo(logoRef.current, { defaultColor: '#222222' });
            return () => {
                logoRef.current = null;
            };
        }
    }, []);

    return <div className="py-12 border-t border-gray-200 mt-8 flex items-center gap-8 flex-wrap">
        <img className="w-[160px]" alt="KAIST logo" src={kaistLogo}/>
        <div className="uilab-logo flex items-center">
            <div style={{ float: "left" }}>
                <div ref={logoRef} style={{ width: 60, height: 60, color: "black" }}></div>
            </div>
            <div style={{ display: "block", float: "left", padding: "0.3rem 0.4rem", color: "#000", fontSize: "1.3rem", fontWeight: "bold", lineHeight: "1.2em" }}>
                USERS &amp;<br />INFORMATION
            </div>
        </div>
    </div>
}
