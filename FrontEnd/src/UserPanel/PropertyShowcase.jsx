import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import mainImage from "../assets/mainImage.png";
import HighLightedImage from "../assets/HighLightedImage.png"
import bathRoomImage from "../assets/bathRoomImage.png";
import StairImage from "../assets/StairImage.png"
import LivingRoom from "../assets/LivingRoom.png"
import InteriorImage from "../assets/InteriorImage.png"
const PropertyShowcase = () => {
    return (
        <div className="container my-5">
            <div className="row align-items-center">
                {/* Main Image */}
                <div className="col-md-6">
                    <img 
                        src={mainImage}
                        alt="Main Property" 
                        className="img-fluid rounded" 
                        style={{height:"400px", width: '100%', }}
                    />
                </div>
                
                {/* Property Details and Small Images */}
                <div className="col-md-6">
                    <h2 className="fw-bold">Wide Selection Of Properties</h2>
                    <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
                    <hr style={{ width: '50px', border: '2px solid #000' }} />
                    
                    <div className="row mt-3">
                        {/* Highlighted Image */}
                        <div className="col-4">
                            <img 
                                src={HighLightedImage}
                                alt="Highlighted" 

                                className="img-fluid rounded" 
                                style={{height:"100%",width:"100%", border: '3px solid #ff0080' }}
                            />
                        </div>
                        {/* Other Small Images */}
                        <div className="col-8">
                            <div className="row">
                                <div className="col-6">
                                    <img 
                                        src={bathRoomImage}
                                        alt="Bathroom" 
                                        className="img-fluid rounded mb-2" 
                                    />
                                </div>
                                <div className="col-6">
                                    <img 
                                        src={StairImage}
                                        alt="Stairs" 
                                        className="img-fluid rounded mb-2" 
                                    />
                                </div>
                                <div className="col-6">
                                    <img 
                                        src={InteriorImage}
                                        style={{width:"200px"}}
                                        alt="Interior" 
                                        className="img-fluid rounded" 
                                    />
                                </div>
                                <div className="col-6">
                                    <img 
                                        src={LivingRoom}
                                        style={{height:"150px"}}
                                        alt="Living Room" 
                                        className="img-fluid rounded" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyShowcase;
