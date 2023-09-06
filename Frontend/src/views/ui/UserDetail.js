
import React, { useEffect, useState } from "react";
// import { HiUserGroup } from 'react-icons/hi';
import { MdOutlineEditCalendar, MdDelete } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { TiArrowBack } from "react-icons/ti"
import axios from "axios";
import ImageSlider from "./ImageSlider";
import host from "./utils"
const UserDetail = () => {
    const navigate = useNavigate();
    const id = useParams();
    // const userId = useParams();

    console.log("id =>", id);
    const [empdata, empdatachange] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
 
    const handleGetUser = async () => {
        try {
            const response = await axios.post(`${host}/get_List/get_user_id`, { userId: id.id });
            empdatachange(response.data);

            // Set the image URL from the response data
            setImageUrl(response.data.picture); // Assuming 'picture' is the key for the image URL

            console.log("API call successful");
        } catch (error) {
            console.error("API call failed:", error.message);
        }
    };
    const LoadEdit = () => {
        navigate(`/forms/${id.id}`);
    };
    console.log(imageUrl,'imageUrl');
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




        <div className="mt-3" >
            {/* <div className="card"> */}
            <ImageSlider />
            {/* </div> */}

            {empdata && (
                <div className="card mt-5">
                    <div className="container mt-3">
                    {/* {imageUrl && ( */}
                                <div className="col-12 col-md-6 col-lg-3">
                                    <label className="pmd-list-subtitle">Profile Picture</label>
                                    <img src={imageUrl} alt="Profile" style={{ maxWidth: '100px' }} />
                                </div>
                            {/* )} */}
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
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">State</label>
                                <p className="pmd-list-title"><small>{empdata.state}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Active</label>
                                <p className="pmd-list-title"><small>{empdata.active}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">City</label>
                                <p className="pmd-list-title"><small>{empdata.city}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Native City</label>
                                <p className="pmd-list-title"><small>{empdata.native_city}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Address</label>
                                <p className="pmd-list-title"><small>{empdata.address}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Education</label>
                                <p className="pmd-list-title"><small>{empdata.education}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Professional</label>
                                <p className="pmd-list-title"><small>{empdata.professional}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">Physically Challenge</label>
                                <p className="pmd-list-title"><small>{empdata.physically_challenge}</small></p>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label className="pmd-list-subtitle">About Your Future Carrer</label>
                                <p className="pmd-list-title"><small>{empdata.about_your_future_carrer}</small></p>
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
                          </div>
                    </div>
                </div>
            )}

        </div>
    </>
    );
};

export default UserDetail;


