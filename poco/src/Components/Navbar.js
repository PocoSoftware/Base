import { useRef } from "react";
import {FaBars , FaTimes } from "react-icons/fa";
import "../Models/main.css";
import logo from "../Images/image.png";

function Navbar() {
        const navRef = useRef();

        const showNavBar = () => {
            navRef.current.classList.toggle("responsive_nav")
        }

        return (
            <header>
                <img src={logo}  alt="Logo"/>
                <nav ref={navRef}>
                    <a href="/Kalendarz">KALENDARZ</a>
                    <a href="/#">KALKULATOR</a>
                    <a href="/#">OSZCZĘDNOŚCI</a>
                    <button className="nav-btn nav-close-btn" onClick={showNavBar}>
                        <FaTimes/>
                    </button>
                </nav>
                <button className="nav-btn" onClick={showNavBar}>
                    <FaBars/>
                </button>
            </header>
        );
}

export default Navbar;