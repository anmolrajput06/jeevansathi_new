import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from "react-toastify";
// import { format } from "date-fns";

import "./eventForm.css"
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
const EventForm = (props) => {

  console.log('propspropspropsprops', props);
  if (props.data) {
    var propsObject = props.data;

  }
  console.log("pppppppp", propsObject);

  const [Title, setTitle] = useState(props.data?.Title || "");
  const [description, setDescription] = useState(props.data?.descripation || "");
  const [To_Date, setTo_Date] = useState(props.data?.To_Date || "");
  const [from_date, setFrom_date] = useState(props.data?.from_date || "");
  const [person_name, setPerson_name] = useState(props.data?.person_name || "");
  const [Contact, setContact] = useState(props.data?.Contact || "");
  const [bannerImage, setBannerImage] = useState(null);
  const [fields, setFields] = useState({});
  const [submitDisable, setSubmitDisable] = useState(false);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (propsObject && propsObject !== {} && propsObject !== undefined) {
      propsObject && setFields(propsObject);
    }

  }, [propsObject]);


  console.log(fields, 'fieldsfieldsfieldsfields', fields.Title);
  // function handleChange(e) {
  //   let fieldObj = { ...fields };
  //   fieldObj[e.target.name] = e.target.value;
  //   setFields(fieldObj);
  // }
  // console.log('fieldObjfieldObjfieldObjfieldObj',fieldObj,'fieldObj');
  const notify = (message) => {
    toast(
      message == "alredy exist ADHAR."
        ? "Aadhar already exiest"
        : message == "alredy exist PAN_NO."
          ? "Pan Number already exiest"
          : message == "alredy exist emails."
            ? "Email already exiest"
            : null,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };
  // console.log("bannerImage =>",bannerImage);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createEvent(e);
      console.log('Event created:', response);
      // You can handle success or redirect to a different page here.
    } catch (error) {
      console.error('Error creating event:', error);
      // Handle the error as needed (e.g., show an error message).
    }
  }
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0]; // Assuming you're uploading a single file
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Base64 encoded image data
        const base64Image = e.target.result;
        setBannerImage(base64Image);
      };

      reader.readAsDataURL(file);
    }
  };
  const formData = {
    Title: Title,
    descripation: description,
    To_Date: To_Date,
    from_date: from_date,
    banner_image: bannerImage,
    person_name: person_name,
    Contact: Contact,
    banerImg: bannerImage
    // Add other properties if needed
  };
  console.log(formData, 'formData', fields);
  const createEvent = async (e) => {
    e.preventDefault();
    console.log('fields', fields)
    try {
      const response = await axios.post('http://localhost:3002/Event/CreateEvent', formData);
      Swal.fire({
        icon: 'success',
        title: 'Event Created',
        text: 'Your event has been successfully created.',
      }).then(() => {
        // After the SweetAlert is closed, redirect to another page
        navigate('/EventDataTable');
        // Replace '/another-page' with your desired route
      });
      return response.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while creating the event. Please try again later.',
      }).then(() => {
        // After the SweetAlert is closed, redirect to another page
        navigate('/EventDataTable');
        // Replace '/another-page' with your desired route
      });
      throw error;
    }
  };
  function updateEvent(e) {
    e.preventDefault();

    let finalData = { ...fields };
    console.log("finalData", finalData);
    const validationErrors = (fields, true);
    const formData = {
      eventId: props.data._id,
      Title: Title,
      descripation: description,
      To_Date: To_Date,
      from_date: from_date,
      banner_image: bannerImage,
      person_name: person_name,
      Contact: Contact,
      banerImg: bannerImage
      // Add other properties if needed
    };



    console.log(formData,'formData');
    setErrors(validationErrors.errObj);
    if (validationErrors) {
      setSubmitDisable(true);
      axios
        .post(`http://localhost:3002/Event/eventUpdate` , formData)
        .then((response) => {
          console.log("success", response);
          if (response.data.message == "Event updated successfully") {
            Swal.fire({
              icon: "success",
              title: "Successful",
              text: "Event Successfully Updated!",
            }).then(() => {
              navigate("/EventDataTable");
            });
          } else {
            setSubmitDisable(false)
            notify(response.data.message);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }
const handleChange = (e, fieldName) => {
  const { value } = e.target;
  setFields({
    ...fields,
    [fieldName]: value,
  });
};

  return (
    <div className="page-container">
      <form className="page-form" onSubmit={(e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        props.data ? updateEvent(e) : handleSubmit(e);
      }}>
        <div className="form-group">
          <label htmlFor="Title">Person Name:</label>
          {/* <input type="text" id="Title" name="Title" /> */}
          <input
            type="text"
            placeholder="Enter person name"
            value={fields.person_name}
            onChange={(event) => setPerson_name(event.target.value)}
            // onChange={(event) => handleChange(event, 'person_name')}

          // onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Title">Contact No:</label>
          <input
            type="text"
            placeholder="Enter contact no:"
            value={fields.Contact}
            onChange={(event) => setContact(event.target.value)}
            // onChange={(event) => handleChange(event, 'Contact')}
          // onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Title">Title:</label>
          {/* <input type="text" id="Title" name="Title" /> */}
          <input
            type="text"
            placeholder="Enter title"
            value={fields.Title}
            onChange={(event) => setTitle(event.target.value)}
            // onChange={(event) => handleChange(Title, 'Title')}
          // onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={fields.descripation}
            onChange={(event) => setDescription(event.target.value)}
            // onChange={(event) => handleChange(description, 'descripation')}
          // onChange={(e) => handleChange(e)}
          ></textarea>

        </div>

        <div className="date-group">
          <div className="form-group">
            <label htmlFor="from_date">From Date:</label>
            <input
              type="date"
              id="from_date"
              name="from_date"
              value={fields.from_date}
              onChange={(event) => setFrom_date(event.target.value)}
              // onChange={(event) => handleChange(from_date, 'from_date')}
            // onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="to_date">To Date:</label>
            <input
              type="date"
              id="to_date"
              name="To_Date"
              value={fields.To_Date}
              onChange={(event) => setTo_Date(event.target.value)}
              // onChange={(event) => handleChange(To_Date, 'To_Date')}
            // onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="banner_image">Banner Image:</label>
          <input
            type="file"
            id="banner_image"
            name="banner_image"
            onChange={handleFileInputChange}
          />



        </div>
        <button type="submit">
          {props.data ? "Update Event" : "Create Event"}
        </button>

      </form>
    </div>
  );
};

export default EventForm;
