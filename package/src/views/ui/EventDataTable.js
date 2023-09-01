
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { AiFillDelete } from 'react-icons/ai';

import { CgMoreO } from "react-icons/cg";
import { TiArrowBack } from "react-icons/ti";
const EventDataTable = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [empdata, empdatachange] = useState([]);
  const navigate = useNavigate();
    const LoadDetail = (_id) => {
    navigate("/employee/EmpDetail" + _id);
  };
  const generateSalary = (_id) => {
    navigate("/employee/salary" + _id);
  };
  const LoadEdit = (_id) => {
    navigate("/employee/EmpEdit" + _id);
  };
  useEffect(() => {
  
    window
      .fetch(`http://localhost:3002/Event/GetEvent`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        let from_date;
        let To_Date;
        let arr = [];
        let finalArr = [];
        console.log('11111111111');
        for (let i = 0; i < resp.length; i++) {
          arr.push(resp[i]);
        }  arr.map((e) => {
          To_Date = new Date(e.To_Date).toLocaleDateString("pt-PT");
          from_date = new Date(e.from_date).toLocaleDateString("pt-PT");
          finalArr.push({ ...e, To_Date: To_Date, from_date: from_date });
        });
        console.log('finalArr',finalArr);
        empdatachange(finalArr);
      })
  
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // "_id": "64f1849699f44324205563a2",
  // "Title": "event",
  // "descripation": "craeet event",
  // "banner_image": "url base86",
  // "To_Date": "2023-09-08T18:30:00.000Z",
  // "from_date": "2023-09-08T18:30:00.000Z",
  // "person_name": "ammol",
  // "Contact": 79685968,
  var columns = [
    {
      name: "person_name",
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
      name: "descripation",
      selector: (rowData) => rowData["descripation"],
      sortable: true,
      width: "150px",                       // added line here
      headerStyle: (selector, id) => {
        return { textAlign: "center" };   // removed partial line here
      },
    },
    {
      name: "To_Date",
      selector: (rowData) => rowData["To_Date"],
      sortable: true,
    },
    {
      name: "from_date",
      selector:  (rowData) => rowData["from_date"],
      sortable: true,
    },

    {
      name: "Contact",
      selector:(rowData) => rowData["Contact"],
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
              LoadEdit(row._id);
            }}
          >
            <AiFillDelete />
          </span>
       
        </>
      ),

      ignoreRowClick: true,
    },
  ];
  var filteredData = empdata.filter((row) => {
    console.log(filteredData,'filteredData');
    return (
      row.person_name ||
      row.Title ||
      row.descripation||
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
                  <Link
                    to="/EventForm"
                    className="btn btn-primary btn-sm ml-5 mr-5"
                  >
                    Add New (+)
                  </Link>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control"
                  />
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

export default EventDataTable;




























