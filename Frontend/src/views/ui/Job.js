import {
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
  } from "reactstrap";
  import React, { useEffect, useRef, useState } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router";
  import { Link, useParams, useLocation } from "react-router-dom";
  import Swal from "sweetalert2";
  import { toast, ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { TiArrowBack } from "react-icons/ti";
  import { FaTrash } from "react-icons/fa";
  import { BsPencilSquare } from "react-icons/bs";
  import host from "./utils"
  const Job = (props) => {
    let effective_lastIndex;
    const location = useLocation();
  
    const userId = useParams();
    console.log("userId", userId.id);
    //  const id = location.state._id;
    //  console.log(id,'44444444444');
  
    const expireAt = localStorage.getItem('expireAt')
    const dobDateInputRef = useRef(null);
    const dojDateInputRef = useRef(null);
    const effectiveDateInputRef = useRef(null);
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [submitDisable, setSubmitDisable] = useState(false);
    const navigate = useNavigate();
    const [effectiveDateState, setEffectiveDateState] = useState("");
    const [updateButton, setUpdateButton] = useState(true);
    // const [userId, setId] = useState("64ed8b0f9a92b5440f779cb5");
  
  
    const handleGetUser = (event) => {
  
      let data = {
        "userId": userId.id
      };
  
      axios.post(`${host}/get_List/get_user_id`, data)
        .then((res) => {
          console.log("response", res);
          if (res.data) {
            setFields(res.data)
          }
          else {
            // setShowError(true);
          }
        })
        .catch((err) => {
          console.log("Error", err);
          // setShowError(true);
        });
    };
  
    useEffect(() => {
  
      handleGetUser();
  
      console.warn('fields--------', fields,);
    }, []);
  
    function handleChange(e) {
      let fieldObj = { ...fields };
      fieldObj[e.target.name] = e.target.value;
  
  
      console.log("fieldObj", fieldObj);
      setFields(fieldObj);
    }
  
  
    function updateUserDetails(e) {
      let finalData = { ...fields };
      let id = {
        "userId": userId.id
      };
      console.log(finalData, '999999999999999999999', id);
  
      let data = JSON.stringify(
        finalData
      );
  
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3002/auth/updateUser',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
  
      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data.message == "updated successfully.") {
            Swal.fire({
              icon: "success",
              title: "Successful",
              text: "User Successfully Updated!",
            }).then(() => {
              navigate("/table");
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
  
    }
  
  
    const handleInput = (event) => {
      const { value, selectionStart, selectionEnd } = event.target;
      const sanitizedValue = value.replace(
        /[!@#$%^&*()1234567890;:'"?/{}><,.=_-]/,
        ""
      );
      event.target.value = sanitizedValue;
      event.target.setSelectionRange(selectionStart, selectionEnd);
    };
  
    return (
      <div className="">
        <Link to="/table" className="btn text-dark">
          <TiArrowBack size={30} />
        </Link>
        <div style={{ display: "flex" }}>
          <ToastContainer />
          <div className="px-4 pt-3">
            <div className="row">
              <div className="col-12 edit_information">
                <div className="Account-details">
                  <h5 className="text-left"> Personal Details</h5>
                  <hr style={{ margin: "0px" }} />
                  {props.data ? (
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
  
                          <div className="errorMsg">{errors.Employee_Code}</div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="form-group">
                        <label className="profile_details_text">candidates_name</label>
                        <input
                          onInput={handleInput}
                          type="text"
                          style={{ textTransform: "capitalize" }}
                          name="candidates_name"
                          minLength="2"
                          maxLength="50"
                          className="form-control"
                          placeholder="candidates_name"
                          value={fields.candidates_name}
                          onChange={(e) => handleChange(e)}
                        />
                        <div className="errorMsg">{errors.candidates_name}</div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="form-group">
                        <label className="profile_details_text">surname </label>
                        <input
                          type="text"
                          name="surname"
                          minLength="2"
                          maxLength="50"
                          className="form-control"
                          placeholder="surname"
                          style={{ textTransform: "capitalize" }}
                          onInput={handleInput}
                          value={fields.surname}
                          onChange={(e) => handleChange(e)}
                        />
                        <div className="errorMsg">{errors.surname}</div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="form-group">
                        <label className="profile_details_text">
                          Father's Name:
                        </label>
                        <input
                          type="text"
                          name="father_name"
                          minLength="2"
                          maxLength="50"
                          value={fields.father_name}
                          onChange={(e) => handleChange(e)}
                          onInput={handleInput}
                          className="form-control"
                          placeholder="Father's Name"
                          style={{ textTransform: "capitalize" }}
                        />
                        <div className="errorMsg">{errors.father_name}</div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="form-group">
                        <label>Contact No</label>
                        <input
                          type="number"
                          maxLength="12"
                          value={fields.number}
                          onChange={(e) => handleChange(e)}
                          name="Contact_Number"
                          className="form-control"
                          placeholder="Mobile Number"
                        ></input>
                        <div className="errorMsg">{errors.number}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="form-group">
                        <label>work</label>
                        <input
                          type="text"
                          maxLength="12"
                          value={fields.work}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          name="work"
                          placeholder="work"
                        ></input>
                        <div className="errorMsg">
                          {errors.work}
                        </div>
                      </div>
                    </div>
  
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
                      <div className="form-group">
                        <label className="profile_details_text">Email ID</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          value={fields.email}
                          onChange={(e) => handleChange(e)}
                        />
                        <div className="errorMsg">{errors.email}</div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="form-group">
                        <label className="profile_details_text">
                          mother_name
                        </label>
                        <input
                          ref={dobDateInputRef}
                          type="text"
                          name="mother_name"
                          className="form-control small_date"
                          placeholder="mother_name"
                          value={fields.mother_name}
                          onChange={(e) => handleChange(e)}
                        />
                        <div className="errorMsg">{errors.mother_name}</div>
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "red",
                          }}
                        >
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
  
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="form-group">
  
                        <div className="errorMsg">{errors.Blood_Group}</div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label className="profile_details_text">  </label>
  
                        <div className="errorMsg">{errors.Position}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="form-group">
                        <label className="profile_details_text">Gender</label>
  
                        <div className="errorMsg">{errors.gender}</div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="form-group">
                        <label className="profile_details_text">
                          Marital Status
                        </label>
  
  
                        <div className="errorMsg">{errors.Marital_Status}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </div>
              <div className="col-12 edit_information">
                <div className="Account-details">
                  {/* <h5 className="text-left">Account Details</h5>{" "} */}
                  <hr style={{ margin: "0px" }} />
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="form-group">
                        <label>father_occupation</label>
                        <input
                          name="father_occupation"
                          value={fields.father_occupation}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          placeholder="father_occupation"
                        ></input>
                        <div className="errorMsg">{errors.father_occupation}</div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="form-group">
                        <label>gotra</label>
                        <input
                          name="Bank_No"
                          value={fields.gotra}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          placeholder="gotra"
                        ></input>
                        <div className="errorMsg">{errors.gotra}</div>
                      </div>
                    </div>
  
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="form-group">
                        <label>mother_occupation</label>
                        <input
                          name="mother_occupation"
                          value={fields.mother_occupation}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          placeholder="mother_occupation"
                        ></input>
                        <div className="errorMsg">{errors.mother_occupation}</div>
                      </div>
  
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="form-group">
                        <label>State</label>
                        <input
                          name="state"
                          defaultValue={fields.state}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          placeholder="state"
                        ></input>
                        <div className="errorMsg">{errors.state}</div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      {/* <div className="form-group">
                        <label>Aadhaar No.</label>
                        <input
                          name="ADHAR"
                          type="number"
                          value={fields.ADHAR}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          placeholder="Enter Aadhar"
                        ></input>
                        <div className="errorMsg">{errors.ADHAR}</div>
                      </div> */}
                    </div>
                  </div>
                  <br />
  
                </div>
                <br />
                <div className="col-sm-12 edit_information">
  
                </div>
              </div>
              <div className="col-12 edit_information">
                <div className="Account-details">
                  {/* <h5 className="text-left">Address Details</h5>{" "} */}
                  <hr style={{ margin: "0px" }} />
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="form-group">
                        <label className="profile_details_text">
                          sister
                        </label>
                        <input
                          type="text"
                          name="sister"
                          minLength="2"
                          maxLength="50"
                          className="form-control"
                          placeholder="sister"
                          style={{ textTransform: "capitalize" }}
                          value={fields.sister}
                          onChange={(e) => handleChange(e)}
                        />
                        <div className="errorMsg">{errors.sister}</div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="form-group">
                        <label className="profile_details_text">
                          brother
                        </label>
                        <input
                          type="text"
                          name="brother"
                          minLength="2"
                          maxLength="50"
                          value={fields.brother}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          placeholder="brother"
                          style={{ textTransform: "capitalize" }}
                        />
                        <div className="errorMsg">{errors.brother}</div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="form-group">
                        <label className="profile_details_text">
                          city
                        </label>
                        <input
                          type="text"
                          name="city"
                          minLength="2"
                          maxLength="50"
                          className="form-control"
                          placeholder="city"
                          style={{ textTransform: "capitalize" }}
                          value={fields.city}
                          onChange={(e) => handleChange(e)}
                        />
                        <div className="errorMsg">{errors.city}</div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                      <div className="form-group">
                        <label className="profile_details_text">
                          native_city
                        </label>
                        <input
                          type="text"
                          name="native_city"
                          minLength="2"
                          maxLength="50"
                          value={fields.native_city}
                          onChange={(e) => handleChange(e)}
                          className="form-control"
                          placeholder="native_city"
                          style={{ textTransform: "capitalize" }}
                        />
                        <div className="errorMsg">{errors.native_city}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                      <div className="form-group">
                        <label className="profile_details_text">
                          address
                        </label>
                        <input
                          type="text"
                          name="address"
                          minLength="2"
                          maxLength="50"
                          className="form-control"
                          placeholder="address"
                          style={{ textTransform: "capitalize" }}
                          value={fields.address}
                          onChange={(e) => handleChange(e)}
                        />
                        <div className="errorMsg">{errors.address}</div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                      <div className="form-group">
                        <label className="profile_details_text">
                          height
                        </label>
                        <input
                          type="number"
                          name="height"
                          minLength="2"
                          maxLength="50"
                          className="form-control"
                          placeholder="height"
                          style={{ textTransform: "capitalize" }}
                          value={fields.height}
                          onChange={(e) => handleChange(e)}
                        />
                        <div className="errorMsg">
                          {errors.height}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="form-group">
                      <label className="profile_details_text">
                      education
                      </label>
                      <textarea
                        className="form-control"
                        name="education"
                        rows="3"
                        cols="35"
                        placeholder="Enter your Local Address"
                        style={{ textTransform: "capitalize" }}
                        value={fields.education}
                        onChange={(e) => handleChange(e)}
                      ></textarea>
                      <div className="errorMsg">{errors.education}</div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="form-group">
                      <label className="profile_details_text">
                        Permanent Address
                      </label>
                      <textarea
                        className="form-control"
                        name="Permanent_Address"
                        rows="3"
                        cols="35"
                        placeholder="Enter Your Permanent Address"
                        value={fields.Permanent_Address}
                        onChange={(e) => handleChange(e)}
                      ></textarea>
                      <div className="errorMsg">{errors.Permanent_Address}</div>
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              {/* <h5 className="text-left">Additional Details</h5>{" "} */}
              <hr style={{ margin: "0px" }} />
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                <div className="form-group">
                  <label className="profile_details_text">education</label>
                  <input
                    type="text"
                    name="training_days"
                    className="form-control"
                    placeholder="education"
                    style={{ textTransform: "capitalize" }}
                    value={fields.education}
                    onChange={(e) => handleChange(e)}
                  />
                  <div className="errorMsg">{errors.education}</div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                <div className="form-group">
                  <label className="profile_details_text">family_type</label>
                  <input
                    type="text"
                    name="family_type"
                    className="form-control"
                    placeholder="family_type"
                    style={{ textTransform: "capitalize" }}
                    value={fields.family_type}
                    onChange={(e) => handleChange(e)}
                  />
                  <div className="errorMsg">{errors.family_type}</div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                <div className="form-group">
                  <label className="profile_details_text">professional</label>
                  <input
                    type="text"
                    name="professional"
                    className="form-control"
                    placeholder="professional"
                    style={{ textTransform: "capitalize" }}
                    value={fields.professional}
                    onChange={(e) => handleChange(e)}
                  />
                  <div className="errorMsg">{errors.professional}</div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                <div className="form-group">
                  <label className="profile_details_text">physically_challenge</label>
                  <input
                    type="text"
                    name="physically_challenge"
                    className="form-control"
                    placeholder="physically_challenge"
                    style={{ textTransform: "capitalize" }}
                    value={fields.physically_challenge}
                    onChange={(e) => handleChange(e)}
                  />
                  <div className="errorMsg">{errors.physically_challenge}</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="submit">
                <div className="form-group text-center">
                  {props.data ? (
                    <input
                      disabled={submitDisable}
                      type="submit"
                      value="Update"
                      className="col-lg-6 col-md-6 col-sm-6 col-xs-6 my-3 btn btn-success"
                      onClick={(e) => updateUserDetails(e)}
                    />
                  ) : (
                    <input
                      disabled={submitDisable}
                      type="submit"
                      value="Submit"
                      className="col-lg-6 col-md-6 col-sm-6 col-xs-6 my-3 btn btn-success"
                      onClick={(e) => updateUserDetails(e)}
                    // onClick={()=>{handleGetUser()}}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Job;
  