import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import "../../css/bootstrap.min.css";
import List from "../../components/list/List";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

import active_project_img from "../../assets/images/active project_image.jpg"
import financial_services_img from "../../assets/images/financial_services_img.jpg"
import investor_img from "../../assets/images/investor_img.jpg"

import Footer from "../../components/footer/Footer";
import { AttachMoneyRounded, HouseRounded, TrendingUpRounded } from "@material-ui/icons";


const Home = () => {

  return (
    <div className="home">
      <Navbar />
      <Featured />

      <div className="bg-white">
        <div className="container-xxl py-5">
          <div className="text-center pb-4 wow fadeInUp" data-wow-delay="0.1s">
            <h1 className="mb-5">Investment Solutions</h1>
          </div>
          <div className="container">
            <div className="row gy-5 gx-4 justify-content-center">
              <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.1s">
                <div className="position-relative border border-primary pt-5 pb-4 px-4">
                  <div className="d-inline-flex align-items-center justify-content-center bg-warning rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                    style={{ width: "100px", height: "100px" }}>
                    <HouseRounded className="fs-1 text-white" />
                  </div>
                  <h5 className="mt-4">Real Estate</h5>
                  <hr className="w-25 mx-auto bg-primary mb-1" />
                  <hr className="w-50 mx-auto bg-primary mt-0" />
                  <p className="mb-0">
                    Property investment opportunities, real estate development projects, rental properties, and expert advice for investors looking to diversify their portfolio.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.3s">
                <div className="position-relative border border-primary pt-5 pb-4 px-4">
                  <div className="d-inline-flex align-items-center justify-content-center bg-warning rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                    style={{ width: "100px", height: "100px" }}>
                    <AttachMoneyRounded className="fs-1 text-white" />
                  </div>
                  <h5 className="mt-4">Finance</h5>
                  <hr className="w-25 mx-auto bg-primary mb-1" />
                  <hr className="w-50 mx-auto bg-primary mt-0" />
                  <p className="mb-0">
                    Comprehensive financial services, wealth management, investment strategies, retirement planning, and personalized solutions for individuals and businesses.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.5s">
                <div className="position-relative border border-primary pt-5 pb-4 px-4">
                  <div className="d-inline-flex align-items-center justify-content-center bg-warning rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                    style={{ width: "100px", height: "100px" }}>
                    <TrendingUpRounded className="fs-1 text-white" />
                  </div>
                  <h5 className="mt-4">Investor</h5>
                  <hr className="w-25 mx-auto bg-primary mb-1" />
                  <hr className="w-50 mx-auto bg-primary mt-0" />
                  <p className="mb-0">
                    Tailored investment options, portfolio analysis, risk assessment, and innovative investment opportunities for both novice and seasoned investors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-xxl py-5">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style={{ minHeight: "400px", padding: "0" }}>
                <div className="position-relative h-100">
                  <img className="img-fluid position-absolute w-100 h-100" src={active_project_img || ""} alt="" style={{ objectFit: "cover" }} />
                </div>
              </div>
              <div className="col-lg-6 wow fadeInUp bg-white" data-wow-delay="0.3s">
                <h1 className="mb-4"> Active Projects</h1>
                <p className="mb-4">Discover our exciting property development projects that showcase innovation, quality, and value. From luxurious residential complexes to commercial spaces and mixed-use developments, we are committed to creating vibrant and sustainable communities.</p>
                <p className="mb-4">Explore our diverse portfolio and witness the transformation of spaces into desirable living and working environments.</p>
                <div className="row gy-2 gx-4 mb-4">
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Riverview Residences</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Skyline Heights</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Harmony Gardens</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Heritage Square</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Tranquil Heights</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Oasis Park</p>
                  </div>
                </div>
                <Link to="/projects" className="btn btn-warning py-3 px-5 mt-2">
                  <span>Check Projects</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container-xxl pb-5">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6 wow fadeInUp bg-white" data-wow-delay="0.3s">
                <h1 className="mb-4">Finance Services</h1>
                <p className="mb-4"> Explore our range of dynamic financial service projects designed to meet diverse needs. From wealth management solutions to investment advisory services, we provide comprehensive financial strategies tailored to individual and corporate clients.</p>
                <p className="mb-4">Our team of experts delivers innovative solutions that empower our clients to achieve their financial goals, navigate market complexities, and secure their financial future.</p>
                <div className="row gy-2 gx-4 mb-4">
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Prosperity Plus</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Capital Growth Partners</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Secure Futures Fund</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Financial Wellness Program</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Risk Management Solutions</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Retirement Planning</p>
                  </div>
                </div>
                <Link to="/projects" className="btn btn-warning py-3 px-5 mt-2">
                  <span>Funding Options</span>
                </Link>
              </div>
              <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style={{ minHeight: "400px", padding: "0" }}>
                <div className="position-relative h-100">
                  <img className="img-fluid position-absolute w-100 h-100" src={financial_services_img || ""} alt="" style={{ objectFit: "cover" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-xxl pb-5">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style={{ minHeight: "400px", padding: "0" }}>
                <div className="position-relative h-100">
                  <img className="img-fluid position-absolute w-100 h-100" src={investor_img || ""} alt="" style={{ objectFit: "cover" }} />
                </div>
              </div>
              <div className="col-lg-6 wow fadeInUp bg-white" data-wow-delay="0.3s">
                <h1 className="mb-4">Investor</h1>
                <p className="mb-4"> Discover our diverse portfolio of investor projects aimed at maximizing returns and creating wealth-building opportunities. Whether you're a seasoned investor or just starting, we offer a range of investment options, including stocks, bonds, real estate, and alternative assets. </p>
                <p className="mb-4">Our dedicated team of investment professionals is committed to providing personalized advice and strategies to help you achieve your financial objectives.</p>
                <div className="row gy-2 gx-4 mb-4">
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Growth Fund Partners</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Income Generation Portfolio</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Real Estate Investment</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Tech Start-up Incubator</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Impact Investing Initiative</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Emerging Markets</p>
                  </div>
                </div>
                <Link to="/projects" className="btn btn-warning py-3 px-5 mt-2">
                  <span>Upcoming Development</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>



  );
};

export default Home;
