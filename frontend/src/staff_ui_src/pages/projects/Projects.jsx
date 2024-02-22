import Navbar from "../../components/navbar/Navbar";
import "./projects.scss";

import projects_img from "../../assets/images/projects_img.jpg"

import upcoming_projects_img_1 from "../../assets/images/upcoming_projects_img_1.jpg"
import upcoming_projects_img_2 from "../../assets/images/active project_image.jpg"
import upcoming_projects_img_3 from "../../assets/images/upcoming_projects_img_3.jpg"
import upcoming_projects_img_4 from "../../assets/images/upcoming_projects_img_4.jpg"
import upcoming_projects_img_5 from "../../assets/images/upcoming_projects_img_5.jpg"
import upcoming_projects_img_6 from "../../assets/images/upcoming_projects_img_6.jpg"
import upcoming_projects_img_7 from "../../assets/images/upcoming_projects_img_7.jpg"
import upcoming_projects_img_8 from "../../assets/images/upcoming_projects_img_8.jpg"

import Footer from "../../components/footer/Footer";


const Projects = () => {

    return (
        <div classNameName="home custom-page shadow-none">
            <Navbar />

            <div class="position-relative" style={{ height: "500px" }}>
                <img src={projects_img} alt="Image" class="img-fluid" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                <div class="position-absolute top-50 start-50 translate-middle">
                    <h1 class="display-3 text-white animated slideInDown" style={{ fontWeight: "400" }} >Projects</h1>
                </div>
            </div>

            <div className="container-xxl py-5">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h1 className="mb-4">Active Development</h1>
                </div>
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-globe text-primary mb-4"></i>
                                    <h5>Riverview Residences</h5>
                                    <p>Riverview resort-style community offering villas and resort amenities.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-hotel text-primary mb-4"></i>
                                    <h5>Skyline Heights</h5>
                                    <p>Elevated living in high-rise apartments offering city views and top-notch facilities.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-user text-primary mb-4"></i>
                                    <h5>Harmony Gardens</h5>
                                    <p>Eco-friendly residential development surrounded by lush greenery & nature trails.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-cog text-primary mb-4"></i>
                                    <h5>Heritage Square</h5>
                                    <p>Prestigious towers defining the city, featuring premium residences and amenities.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-globe text-primary mb-4"></i>
                                    <h5>Tranquil Heights</h5>
                                    <p>Modern apartments with stunning views & convenient access to amenities.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-hotel text-primary mb-4"></i>
                                    <h5>Oasis Park</h5>
                                    <p>Residential enclave providing a peaceful sanctuary amidst landscaped gardens & ponds.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-user text-primary mb-4"></i>
                                    <h5>Urban Haven</h5>
                                    <p>Contemporary urban living in a vibrant neighborhood with trendy cafes and boutiques.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-cog text-primary mb-4"></i>
                                    <h5>Pristine Penthouses</h5>
                                    <p>Luxurious penthouse living with exquisite design and breathtaking city vistas.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-xxl py-5">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h1 className="mb-5">Upcoming Projects</h1>
                </div>
                <div className="container">
                    <div className="row g-3">
                        <div className="col-lg-7 col-md-6">
                            <div className="row g-3">
                                <div className="col-lg-12 col-md-12 wow zoomIn" data-wow-delay="0.1s">
                                    <a className="position-relative d-block overflow-hidden" href="">
                                        <img className="img-fluid" src={upcoming_projects_img_5} alt="" />
                                        <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">9% Incentive</div>
                                        <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Skyline Vista</div>
                                    </a>
                                </div>
                                <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.3s">
                                    <a className="position-relative d-block overflow-hidden" href="">
                                        <img className="img-fluid" src={upcoming_projects_img_2} alt="" />
                                        <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">12% Incentive</div>
                                        <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Serenity Springs</div>
                                    </a>
                                </div>
                                <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.5s">
                                    <a className="position-relative d-block overflow-hidden" href="">
                                        <img className="img-fluid" src={upcoming_projects_img_4} alt="" />
                                        <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">10% Incentive</div>
                                        <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Emerald Gardens</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6 wow zoomIn" data-wow-delay="0.7s" style={{ minHeight: "350px" }}>
                            <a className="position-relative d-block h-100 overflow-hidden" href="">
                                <img className="img-fluid position-absolute w-100 h-100" src={upcoming_projects_img_6} alt="" style={{ objectFit: "cover" }} />
                                <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">11% Incentive</div>
                                <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Harmony Heights</div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row g-3 mt-1">
                        <div className="col-lg-5 col-md-6 wow zoomIn" data-wow-delay="0.7s" style={{ minHeight: "350px" }}>
                            <a className="position-relative d-block h-100 overflow-hidden" href="">
                                <img className="img-fluid position-absolute w-100 h-100" src={upcoming_projects_img_7} alt="" style={{ objectFit: "cover" }} />
                                <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">12% Incentive</div>
                                <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Blissful Haven</div>
                            </a>
                        </div>
                        <div className="col-lg-7 col-md-6">
                            <div className="row g-3">
                                <div className="col-lg-12 col-md-12 wow zoomIn" data-wow-delay="0.1s">
                                    <a className="position-relative d-block overflow-hidden" href="">
                                        <img className="img-fluid" src={upcoming_projects_img_8} alt="" />
                                        <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">9% Incentive</div>
                                        <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Azure Residences</div>
                                    </a>
                                </div>
                                <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.3s">
                                    <a className="position-relative d-block overflow-hidden" href="">
                                        <img className="img-fluid" src={upcoming_projects_img_3} alt="" />
                                        <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">11% Incentive</div>
                                        <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Riverside Retreat</div>
                                    </a>
                                </div>
                                <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.5s">
                                    <a className="position-relative d-block overflow-hidden" href="" >
                                        <img className="img-fluid" src={upcoming_projects_img_1} alt="" />
                                        <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">10% Incentive</div>
                                        <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Majestic Oaks</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: "#0b0b0b" }}>
                <Footer />
            </div>

        </div>
    );
};

export default Projects;
