import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import { BiShow } from 'react-icons/bi';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { AiFillDelete } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

// import { useTable } from 'react-table';
import axios from 'axios';
import Modal from 'react-modal';

// Set the root element for the modal
Modal.setAppElement('#root');

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
};

const buttonStyles = {
  padding: '5px 10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const ProjectTables = () => {
  const [tableData, setTableData] = useState([]); // State to hold the fetched data
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(5); // Number of items per page
  const [offset, setOffset] = useState(0);
  const [viewAll, setViewAll] = useState(false);

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

  useEffect(() => {
    setOffset(currentPage * perPage);
  }, [currentPage, perPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleViewAllClick = () => {
    setViewAll(true);
  };

  const setToggleSwitch = (e, userData) => {
    console.log("e", e);
    console.log("data", userData);

    let data = JSON.stringify({
      "user_id": userData._id,
      "hide_status": e == true ? 1 : 0
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3002/get_List/hidestatus/update',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

  }


  const deleteUser = (user_id) => {
    let data = JSON.stringify({
      "user_id": user_id
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3002/get_List/user/delete',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        window.location.reload()
      })
      .catch((error) => {
        console.log(error);
      });




  }


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [responseItems, setResponseItems] = useState([]); // State variable to hold response data

  const openModal = (user_id) => {

    let data = JSON.stringify({
      "user": user_id
    });
    console.log(data, "64e83e83001976c90c48651c");
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3002/get_List/intreted_user',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    axios.request(config)
      .then((response) => {
        setResponseItems(response.data);
        setModalIsOpen(true);

      })
      .catch((error) => {
        console.log(error);
      });

  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const filteredData = tableData.slice(offset, offset + perPage);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5"> Users</CardTitle>


          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Candidates</th>
                <th>States</th>
                <th>City</th>
                <th>Intrested</th>
                <th>Hide/ Show</th>
                <th>Action</th>


              </tr>
            </thead>

            <tbody>

              {filteredData.map((tdata, index) =>
              (

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

                  <td>{tdata.state}</td>
                  <td>{tdata.city}</td>
                  <td><button onClick={() => { openModal(tdata._id) }} style={buttonStyles}>Intrested</button></td>

                  <td>
                    <BootstrapSwitchButton
                      checked={tdata.hide == '1' ? true : false}
                      size="xs"
                      onstyle="outline-success"
                      offstyle="outline-danger"
                      onChange={(e) => setToggleSwitch(e, tdata)}
                    />

                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Link to={`/userdetails/${tdata._id}`}>
                        <BiShow />
                      </Link>
                      {tdata.active === false ? (
                        <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                      ) : tdata.status === true ? (
                        <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                      ) : (
                        <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                      )}
                      <span className="btn btn-md" onClick={() => { deleteUser(tdata._id); }}> <AiFillDelete /></span>
                    </div>
                  </td>


                  {/* <td >

                    <Link to={`/userdetails/${tdata._id}`}>
                      <BiShow />
                    </Link>
                    
                    
                    </td>
                  <td>
                    {tdata.active === false ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : tdata.status === true ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td><span className="btn btn-md" onClick={() => { deleteUser(tdata._id); }}> <AiFillDelete /></span>  </td> */}
                </tr>

              ))}
            </tbody>
          </Table>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            pageCount={Math.ceil(tableData.length / perPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            activeClassName="active"
          />
        </CardBody>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
          <h2 style={{ textAlign: 'center' }}> Intrested  List</h2>
          {responseItems.map((item, index) => (
            <>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p key={index} style={{ margin: '0' }}>{item.candidates_name}</p>
                <Link to={`/userdetails/${item._id}`} style={{ margin: '0' }}>
                  <BiShow />
                </Link>
              </div>

            </>
          ))}
          <button onClick={closeModal} style={buttonStyles}>
            Close
          </button>
        </Modal>
      </Card>
    </div>
  );
};

export default ProjectTables;
