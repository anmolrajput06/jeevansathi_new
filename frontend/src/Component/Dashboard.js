import "../Css/Dashbord.css";
import React, { useEffect, useState } from "react";
import { HiUserGroup } from "react-icons/hi";
import {
  BsEmojiFrownFill,
  BsFillEmojiHeartEyesFill,
  BsFillEmojiLaughingFill,
} from "react-icons/bs";
import { GiScales } from "react-icons/gi";
import axios from "axios";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
const Dashboard = () => {

  return (
    <div id="root">
      <div className="container pt-5">
        <h1 style={{ display: "flex", justifyContent: "center", paddingBottom: "10px", marginBottom: "20px" }} className="text-center">WELCOME TO ADMIN PAGE</h1>
        <div className="row align-items-stretch">
          <Link
            className="c-dashboardInfo col-lg-3 col-md-6 text-black text-decoration-none"
            to="/Users"
          >
            <div
              className="wrap"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div>
                <h4 className="">Total user</h4>
              </div>
              <div style={{ display: 'flex', justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <h1>
                  <HiUserGroup />
                </h1>
              <h1>User</h1>
              </div>
            </div>
          </Link>
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <Link
              className="c-dashboardInfo col-lg-3 col-md-6 text-black text-decoration-none"
              to="/holiydays"
            >
              <div
                className="wrap"
                style={{ display: "flex", flexDirection: "column" }}
              >

                <h4 className="">Festival </h4>

                <>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <h1>
                 
                        <BsEmojiFrownFill />
                    
                    </h1>
                  </div>
                  <div>
                   
                      <h6>  This Month</h6>
                    
                  </div>
                </>
              </div>
            </Link>
          </div>
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <Link
              className="c-dashboardInfo col-lg-3 col-md-6 text-black text-decoration-none"
              to="/TotalPresent"
            >
              <div
                className="wrap"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4 className="">Today                 </h4>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h1>
                    <GiScales />
                  </h1>
                </div>

               <h1>hiii</h1>

              </div>
            </Link>
          </div>
          <div className="c-dashboardInfo col-lg-3 col-md-6">
            <Link
              className="c-dashboardInfo col-lg-3 col-md-6 text-black text-decoration-none"
              to="/YesterdayApsent"
            >
              <div
                className="wrap"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4 className="">Yesterday </h4>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h1>
                    <GiScales />
                  </h1>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>

                </div>
               <h2>hkhgfjkhrdf</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
