import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import { BiShow } from 'react-icons/bi';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import { useTable } from 'react-table';
import axios from 'axios';
// const tableData = [
//   {
//     avatar: user1,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Flexy React",
//     status: "pending",
//     weeks: "35",
//     budget: "95K",
//   },
//   {
//     avatar: user2,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Lading pro React",
//     status: "done",
//     weeks: "35",
//     budget: "95K",
//   },
//   {
//     avatar: user3,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Elite React",
//     status: "holt",
//     weeks: "35",
//     budget: "95K",
//   },
//   {
//     avatar: user4,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Flexy React",
//     status: "pending",
//     weeks: "35",
//     budget: "95K",
//   },
//   {
//     avatar: user5,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Ample React",
//     status: "done",
//     weeks: "35",
//     budget: "95K",
//   },
// ];

const ProjectTables = () => {
  const [tableData, setTableData] = useState([]); // State to hold the fetched data
  useEffect(() => {
    // Fetch data from the API
    axios.get("http://localhost:3002/get_List/getalluser")
      .then(response => {
        setTableData(response.data); // Update state with fetched data
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5"> Users</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the users
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>candidates_name</th>
                <th>city</th>

                <th>active</th>
                <th>father_name</th>
                {/* <th>father_occupation</th> */}
                <th>detail</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((tdata, index) => (

                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={
                          index % 5 === 0 ? user1 :
                            index % 5 === 1 ? user2 :
                              index % 5 === 2 ? user3 :
                                index % 5 === 3 ? user4 :
                                  index % 5 === 4 ? user5 : "defaultAvatar"
                        }
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.candidates_name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.city}</td>
                  {/* {console.log(tdata._id)} */}
                  <td>
                    {tdata.active === false ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : tdata.status === true ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td>{tdata.father_name}</td>
                  {/* <td>{tdata.father_occupation}</td> */}
                  <td >
                    {/* <Link to="/forms">
                   */}
                    <Link to={`/forms/:${tdata._id}`}>
                      <BiShow /> {/* Clicking the icon will navigate to the forms page */}
                    </Link></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
