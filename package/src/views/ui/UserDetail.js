
import React, { useEffect, useState } from "react";
// import { HiUserGroup } from 'react-icons/hi';
import { MdOutlineEditCalendar, MdDelete } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
// import emo from '../../../src/components/Sidebar/download.jpeg';
import Swal from "sweetalert2";
// import host from "./../utils"
import { TiArrowBack } from "react-icons/ti"
import axios from "axios";
import ImageSlider from "./ImageSlider";
const UserDetail = () => {
    const navigate = useNavigate();
    const id = useParams();
    // const userId = useParams();

    console.log("id =>", id);
    const [empdata, empdatachange] = useState([]);

    // const leaveNavigate = () => {
    //   navigate("/employee/userleavedetails" + id);
    // };
    //   useEffect(() => {
    //     axios.post(`http://localhost:3002/get_List/get_user_id` + id)
    //       .then((res) => {
    //         return res.json();
    //       })
    //       .then((resp) => {
    //         empdatachange(resp);
    //         console.log(resp);
    //       })
    //       .catch((err) => {
    //         console.log(err.message);
    //       });
    //   }, []);
    // const leaveNavigate = () => {
    //   navigate("/employee/userleavedetails" + id);
    // };

    // const response = await axios.post('http://localhost:3002/get_List/get_user_id', { userId: id });
    // empdatachange(response.data);
    const handleGetUser = async () => {
        try {
            // Make the API call using 'id' from the URL
            const response = await axios.post('http://localhost:3002/get_List/get_user_id', { userId: id.id });

            // Update the state with API response data
            console.log("response.data", response.data);
            empdatachange(response.data);

            console.log("API call successful");
        } catch (error) {
            console.error("API call failed:", error.message);
        }
    };

    const LoadEdit = () => {
        navigate(`/forms/${id.id}`);
    };
    const Removefunction = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`/emp/update_status`, { id: id, status: 0 })
                    .then((res) => {
                        Swal.fire(
                            "Deleted!",
                            "Your file has been deleted.",
                            "success"
                        ).then(() => {
                            navigate("/table");
                        });
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            }
        });
    };
    console.log('empdata', empdata);



    // Use useEffect to call the API when the component mounts
    useEffect(() => {
        console.log("test ===================================================");
        handleGetUser()
    }, [])


    return (<>
         
        <div className="mt-5 " >
            {/* <ImageSlider/> */}

            <div className="card">

                {/* {empdata && ( */}
                <div className="cover-content">
                    <div
                        className="card-title float-end"
                        style={{
                            marginTop: '-2.5rem',
                            color: 'rgba(23,31,35,.64)'
                        }}
                    >
                        <div className="flex"
                        >
                            <div className="flex">
                                <Link
                                    to="/table" className="btn text-primary">
                                    <TiArrowBack size={30} />
                                </Link>
                            </div>

                            <div className="flex">
                                <button
                                    className="btn"
                                    onClick={() => LoadEdit()}
                                >
                                    <MdOutlineEditCalendar className="text-primary fs-3" />
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => Removefunction()}
                                >
                                    <MdDelete className="text-danger fs-3" />
                                </button>
                            </div>
                        </div>
                        {/* <img alt="Profile-Pic" src={img} style={{ width: '9rem' }} className="profile-pic rounded-circle pmd-z-depth-light-2-1 mr-md-4 mr-4" width="180" /> */}
                    </div>
                        <div className="d-flex d-flex-row align-items-center">
                                <ImageSlider/>
                        </div>
                </div>
                {/* )} */}
            </div>

            {empdata &&(
                <div className="card">
                    <div className="container mt-3">
                        <div className="row view-basic-card">
                            <h3 className="card-title media-body mb-4" style={{ color: '#3075BA' }}>Basic Information</h3>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">First Name</label>
                                <p className="pmd-list-title"><small>{empdata.candidates_name}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Last Name</label><br />
                                <small>{empdata.surname
                                }</small>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Work</label>
                                <p className="pmd-list-title">{empdata.work}</p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Height</label>
                                <p className="pmd-list-title"><small>{empdata.height}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Personal Email</label>
                                <p className="pmd-list-title"><small href="" title="">{empdata.email}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Loking</label>
                                <p className="pmd-list-title"><small>{empdata.loking}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Gender</label>
                                <p className="pmd-list-title"><small>{empdata.gendar}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Marital Status</label>
                                <p className="pmd-list-title"><small>{empdata.status_type}</small></p>
                            </div>
                        </div>
                        <hr />

                        <hr />
                        <div className="row view-basic-card">
                            <h3 className="card-title media-body mb-4" style={{ color: '#3075BA' }}>Family Details</h3>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Father Name</label>
                                <p className="pmd-list-title"><small>{empdata.father_name}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Mother Name</label><br />
                                <small>{empdata.mother_name}</small>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Father Occupation</label>
                                <p className="pmd-list-title">{empdata.father_occupation}</p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Mother Occupation</label>
                                <p className="pmd-list-title"><small>{empdata.mother_occupation}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Gotra</label>
                                <p className="pmd-list-title"><small>{empdata.gotra}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Sister</label>
                                <p className="pmd-list-title"><small>{empdata.sister}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Brother</label>
                                <p className="pmd-list-title"><small>{empdata.brother}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Family Type</label>
                                <p className="pmd-list-title"><small>{empdata.family_type}</small></p>
                            </div>
                            {/* <div className="col-12 col-md-6 col-lg-3">
    <label className="pmd-list-subtitle">Date of Joinig</label>
    <p className="pmd-list-title"><small>{new Date(empdata.date_of_joining).toLocaleDateString(
          "pt-PT"
        )}</small></p>
  </div> */}
                        </div>
                        <hr />
                        {/* <div className="row view-basic-card">
                <h3 className="card-title media-body mb-4" style={{ color: '#3075BA' }}>Bank Details</h3>
                <div className="col-12 col-md-6 col-lg-3">
                    <label className="pmd-list-subtitle">Aadhar Number</label>
                    <p className="pmd-list-title"><small>{empdata.ADHAR}</small></p>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <label className="pmd-list-subtitle">Pan Number</label><br />
                    <small>{empdata.PAN_No}</small>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <label className="pmd-list-subtitle">Bank A/C No.</label>
                    <p className="pmd-list-title">{empdata.Bank_No}</p>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <label className="pmd-list-subtitle">Bank IFSC Code</label>
                    <p className="pmd-list-title"><small>{empdata.Bank_IFSC}</small></p>
                </div>

            </div> */}
                        <hr />
                        <div className="row view-basic-card">
                            <h3 className="card-title media-body mb-4" style={{ color: '#3075BA' }}>Auther Details</h3>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Contact Number</label>
                                <p className="pmd-list-title"><small>{empdata.number}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Current City</label><br />
                                <small>{empdata.city}</small>
                            </div>

                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Current Address</label>
                                <p className="pmd-list-title"><small>{empdata.address}</small></p>
                            </div>
                            {/* <div className="col-12 col-md-6 col-lg-3">
                    <label className="pmd-list-subtitle">Current State</label>
                    <p className="pmd-list-title"><small>{empdata.current_state}</small></p>
                </div> */}
                            {/* <div className="col-12 col-md-6 col-lg-3">
                    <label className="pmd-list-subtitle">Current Address</label>
                    <p className="pmd-list-title"><small>{empdata.Current_Address}</small></p>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <label className="pmd-list-subtitle">Permanent City</label>
                    <p className="pmd-list-title"><small>{empdata.permanent_city}</small></p>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <label className="pmd-list-subtitle">Permanent State</label>
                    <p className="pmd-list-title"><small>{empdata.permanent_state}</small></p>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <label className="pmd-list-subtitle">Permanent Address</label>
                    <p className="pmd-list-title"><small>{empdata.Permanent_Address}</small></p>
                </div> */}
                        </div>
                        <hr />
                    </div>
                </div>
            )}

        </div>
    </>
    );
};

export default UserDetail;


