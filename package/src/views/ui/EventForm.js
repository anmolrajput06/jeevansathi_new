// import React, { useState } from 'react';

// const EventForm = () => {
//   const [eventData, setEventData] = useState({
//     title: '',
//     description: '',
//     bannerImage: null,
//     toDate: '',
//     fromDate: '',
//     contactPerson: '',
//     contactNumber: '',
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setEventData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleImageUpload = (event) => {
//     const imageFile = event.target.files[0];
//     setEventData((prevData) => ({
//       ...prevData,
//       bannerImage: imageFile,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('Event Data:', eventData);
//     // Perform further actions (e.g., send data to a server)
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="title"
//         placeholder="Title"
//         value={eventData.title}
//         onChange={handleInputChange}
//       />
//       {/* Other input fields */}
//       <input type="file" name="bannerImage" onChange={handleImageUpload} />
//       {/* Date pickers */}
//       <button type="submit">Create Event</button>
//     </form>
//   );
// };

// export default EventForm;
const EventForm = ({ title, description, bannerImage, fromDate, toDate, contactName, contactNumber }) => {
  return (
    <div className="event-page">
      <img src={bannerImage} alt="Event Banner" />
      <h1>{title}</h1>
      <p>{description}</p>
      <p>From: {fromDate} - To: {toDate}</p>
      <p>Contact: {contactName} - {contactNumber}</p>
    </div>
  );
};

export default EventForm;