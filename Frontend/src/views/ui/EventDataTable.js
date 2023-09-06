
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CgMoreO } from "react-icons/cg";
import { TiArrowBack } from "react-icons/ti";
import {MdOutlineEditCalendar} from "react-icons/md"
import EventUpdate from "./EventUpdate";
// import TopCards from "../../components/dashboard/TopCards";
import host from "./utils";
const EventDataTable = (props) => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [empdata, empdatachange] = useState([]);
  const navigate = useNavigate();
 
  const deleteUser = async (_id) => {

    const formData = {
      id: _id
    };

    const response = await axios.post(`${host}/Event/DeleteEvent`, formData);
    console.log("response", response);
    Swal.fire({
      icon: 'success',
      title: 'Event Created',
      text: 'Your event has been successfully deleted.',
    }).then(() => {
      // After the SweetAlert is closed, redirect to another page
      navigate('/EventDataTable');
      // Replace '/another-page' with your desired route
    });

  };
  useEffect(() => {

    window
      .fetch(`${host}/Event/GetEvent`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        let from_date;
        let To_Date;
        let arr = [];
        let finalArr = [];
        for (let i = 0; i < resp.length; i++) {
          arr.push(resp[i]);
        } arr.map((e) => {
          To_Date = new Date(e.To_Date).toLocaleDateString("pt-PT");
          from_date = new Date(e.from_date).toLocaleDateString("pt-PT");
          finalArr.push({ ...e, To_Date: To_Date, from_date: from_date });
        });
        console.log('finalArr', finalArr);
        empdatachange(finalArr);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);
  const LoadEdit = (_id) => {
    const formData = {
      id: _id
    };
    console.log('vjffj',formData);
    navigate(`/eventUpdate/${formData.id}`);
};

  // "_id": "64f1849699f44324205563a2",
  // "Title": "event",
  // "descripation": "craeet event",
  // "banner_image": "url base86",
  // "To_Date": "2023-09-08T18:30:00.000Z",
  // "from_date": "2023-09-08T18:30:00.000Z",
  // "person_name": "ammol",
  // "Contact": 79685968,
  const bufferToDataURL = (buffer) => {
    const arrayBufferView = new Uint8Array(buffer.data);
    const blob = new Blob([arrayBufferView], { type: "image/jpeg" }); // Change the type based on your image format
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
  };

  var columns = [
    {
      name: "Img",
      cell: (row) => (
        <>
          {/* <img src={row.banner_image} alt="Image" /> */}
          {/* {row.banner_image && ( */}
          <img
            src={row.banner_image} // Use the function to convert buffer to data URL
            alt="Image"
            style={{ maxWidth: "100px" }} // Adjust the style as needed
          />
          {/* )} */}

        </>
      ),
    },
    {
      name: "PersonName",
      selector: (rowData) => rowData["person_name"],
    },
    {
      name: "Title",
      selector: (rowData) => rowData["Title"],
      sortable: true,
      width: "150px",                       // added line here
      headerStyle: (selector, id) => {
        return { textAlign: "center" };   // removed partial line here
      },
    },
    {
      name: "Descripation",
      selector: (rowData) => rowData["descripation"],
      sortable: true,
      width: "150px",                       // added line here
      headerStyle: (selector, id) => {
        return { textAlign: "center" };   // removed partial line here
      },
    },
    {
      name: "ToDate",
      selector: (rowData) => rowData["To_Date"],
      sortable: true,
    },
    {
      name: "FromDate",
      selector: (rowData) => rowData["from_date"],
      sortable: true,
    },

    {
      name: "Contact",
      selector: (rowData) => rowData["Contact"],
    },
    {
      name: "Action",
      width: "220px",                       // added line here
      headerStyle: (selector, id) => {
        return { textAlign: "center" };   // removed partial line here
      },
      cell: (row) => (
        <>
          <span
            className="btn btn-md"
            onClick={() => {
              deleteUser(row._id);
              window.location.reload()
            }}
          >
            <AiFillDelete />
          </span>
          <button
            className="btn"
            onClick={() => LoadEdit(row._id)}
          >
            <MdOutlineEditCalendar className="text-primary fs-3" />
          </button>

        </>
      ),

      ignoreRowClick: true,
    },
  ];
  var filteredData = empdata.filter((row) => {
    // console.log(filteredData,'filteredData');
    return (
      row.person_name ||
      row.Title ||
      row.descripation ||
      row.To_Date ||
      row.from_date ||
      row.Contact
    );
  });
  return (
    <div>
      <Link to="/EventForm" className="btn text-dark">
        <TiArrowBack size={30} />
      </Link>
      <div>
        <div className="ml-5 mr-5">
          <DataTable
            title={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex" }}>
                  <h4>Event</h4>{" "}

                </div>
                <Link
                  to="/EventForm"
                  className="btn btn-primary btn-sm ml-5 mr-5"
                >
                  Add New
                </Link>
              </div>

            }
            columns={columns}
            data={filteredData ? filteredData : []}
            pagination
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
};

export default EventDataTable;




























