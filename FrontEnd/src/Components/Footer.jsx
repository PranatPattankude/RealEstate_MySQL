import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <footer className="bg-dark text-light p-4">
            <div className="">
                <div className="row mb-4 text-center text-md-start">
                    {/* Logo and Description */}
                    <div className="col-md-4 mb-3">
                        <h4 className="fw-bold"> <span className="text-primary">F</span> Logo</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                    
                    {/* Links Section */}
                    <div className="col-md-2 mb-3">
                        <h5 className="fw-bold">Explore</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light text-decoration-none">Lorem Ipsum</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Lorem Ipsum</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Lorem Ipsum</a></li>
                        </ul>
                    </div>
                    
                    <div className="col-md-2 mb-3">
                        <h5 className="fw-bold">Services</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light text-decoration-none">Lorem Ipsum</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Lorem Ipsum</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Lorem Ipsum</a></li>
                        </ul>
                    </div>

                    <div className="col-md-2 mb-3">
                        <h5 className="fw-bold">Contact</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light text-decoration-none">Lorem Ipsum</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Lorem Ipsum</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Lorem Ipsum</a></li>
                        </ul>
                    </div>
                    
                    {/* Newsletter Signup */}
                    <div className="col-md-4 mb-3">
                        <h5 className="fw-bold">Newsletter Signup</h5>
                        <div className="input-group">
                            <input type="email" className="form-control" placeholder="Enter your email" />
                            <button className="btn btn-primary">Subscribe</button>
                        </div>
                    </div>
                </div>
                {/* Copyright */}
                <div className="text-center border-top pt-3">
                    <p className="mb-0">&copy; 2025 Lorem Ipsum - All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
