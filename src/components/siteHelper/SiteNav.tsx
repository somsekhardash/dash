import * as React from 'react';
import { Link, animateScroll as scroll } from "react-scroll";

const SiteNav: React.FC<any> = () => {
    return (
        <div className="input">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
                <a className="navbar-brand js-scroll-trigger" href="#page-top">
                    <span className="d-block d-lg-none">Clarence Taylor</span>
                    <span className="d-none d-lg-block">
                        <img className="img-fluid img-profile rounded-circle mx-auto mb-2"
                            src="assets/img/profile.jpg" alt="" />
                    </span>
                </a>
                <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                activeClass="active"
                                to="about"
                                className="nav-link"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}>
                                About
                            </Link>
                        </li>
                        <li className="nav-item">   
                            <Link
                                activeClass="active"
                                to="experience"
                                className="nav-link"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}>
                                Experience
                            </Link>
                        </li>
                        <li className="nav-item"> 
                            <Link
                                activeClass="active"
                                to="education"
                                className="nav-link"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}>
                                Education
                            </Link>
                        </li>
                        <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#skills">Skills</a></li>
                        <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#interests">Interests</a></li>
                        <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#awards">Awards</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default SiteNav;



