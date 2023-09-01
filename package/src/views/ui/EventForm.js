import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import "./eventForm.css"
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
const EventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [to_Date, setTo_Date] = useState("");
  const [from_date, setFrom_date] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [person_name, setPerson_name] = useState("");
  const [Contact, setContact] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createEvent(formData);
      console.log('Event created:', response);
      // You can handle success or redirect to a different page here.
    } catch (error) {
      console.error('Error creating event:', error);
      // Handle the error as needed (e.g., show an error message).
    }
  }
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0]; // Assuming you're uploading a single file
    setBannerImage(selectedFile); // Store the selected file in the state variable
  };
  const formData = {
    Title: title,
    descripation: description,
    To_Date: to_Date,
    from_date: from_date,
    banner_image: bannerImage,
    person_name:person_name,
    Contact:Contact
    // Add other properties if needed
  };

  const createEvent = async (formData) => {
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
        navigate('/alerts');
        // Replace '/another-page' with your desired route
      });
      throw error;
    }
  };

  return (
    <div className="page-container">
      <form className="page-form" onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="Title">Person Name:</label>
          {/* <input type="text" id="Title" name="Title" /> */}
          <input
            type="text"
            placeholder="Enter Person Name"
            value={person_name}
            onChange={(event) => setPerson_name(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Title">Title:</label>
          {/* <input type="text" id="Title" name="Title" /> */}
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="Title">Contact:</label>
          <input
            type="number"
            placeholder="Enter Contact"
            value={Contact}
            onChange={(event) => setContact(event.target.value)}
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>

        </div>

        <div className="date-group">
          <div className="form-group">
            <label htmlFor="from_date">From Date:</label>
            <input
              type="date"
              id="from_date"
              name="from_date"
              value={from_date}
              onChange={(event) => setFrom_date(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="to_date">To Date:</label>
            <input
              type="date"
              id="to_date"
              name="To_Date"
              value={to_Date}
              onChange={(event) => setTo_Date(event.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="banner_image">Banner Image:</label>
          {/* <input
            type="file"
            id="banner_image"
            name="banner_image"
            onChange={handleFileInputChange}
          /> */}
          


      <input type="file" id="banner_image" name="banner_image" />
        </div>

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;
