import { Badge, Button, Card, CardBody, CardTitle, Row, Col } from "reactstrap";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CgMoreO } from "react-icons/cg";
import { TiArrowBack } from "react-icons/ti";
import { MdOutlineEditCalendar } from "react-icons/md"
import EventUpdate from "./EventUpdate";
import { BiShow } from 'react-icons/bi';
import host from "./utils";
// import TopCards from "../../components/dashboard/TopCards";
const Contact = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [empdata, empdatachange] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    window
      .fetch(`${host}/contact//GetContact`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {

        empdatachange(resp);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);



  var columns = [

    {
      name: "PersonName",
      selector: (rowData) => rowData["Full_Name"],
      sortable: true,

    },
    {
      name: "Loking",
      selector: (rowData) => rowData["Loking"],
      sortable: true,

    },
    {
      name: "Contact",
      selector: (rowData) => rowData["Mobile_Number"],
    },
    {
      name: "CreatedBy",
      selector: (rowData) => rowData.user_data[0].candidates_name,
      width: "220px",                       // added line here
      headerStyle: (selector, id) => {
        return { textAlign: "center" };   // removed partial line here
      },
      cell: (row) => (
        <>
          <Link
            to={`/userdetails/${row.user_data[0]._id}`}
            style={{
              textDecoration: 'none',        // Remove underlines (optional)
              cursor: 'pointer',
              color: 'inherit',         // Show pointer cursor on hover (optional)
            }}
          >
            <span>{row.user_data[0].candidates_name}</span> <BiShow />
          </Link>
        </>
      ),

    },


  ];
  var filteredData = empdata.filter((row) => {
    // console.log(filteredData,'filteredData');
    // console.log(row.user_data[0].candidates_name,'-----------------------------------');
    return (
      row.Full_Name ||
      row.Mobile_Number ||
      row.Loking ||
      row.user_data[0].candidates_name
    );
  });
  return (
    <div>
      <Link to="/starter" className="btn text-dark">
        <TiArrowBack size={30} />
      </Link>
      <div>
        <div className="ml-5 mr-5">
          <DataTable sortactive={true}

            title={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex" }}>
                  <h4>Contact</h4>{" "}

                </div>

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

export default Contact;
