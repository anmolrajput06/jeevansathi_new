import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';

const columns = [
    {
      Header: 'candidates_names',
      accessor: 'candidates_name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
        Header: 'number',
        accessor: 'number',
      },
      {
        Header: 'work',
        accessor: 'work',
      },
      {
        Header: 'gendar',
        accessor: 'gendar',
      },
      
      {
        Header: 'loking',
        accessor: 'loking',
      },
      {
        Header: 'father_name',
        accessor: 'father_name',
      },
      {
        Header: 'mother_name',
        accessor: 'mother_name',
      },
      {
        Header: 'status_type',
        accessor: 'status_type',
      },
      {
        Header: 'city',
        accessor: 'city',
      },
      {
        Header: 'active',
        accessor: 'active',
      },
      {
        Header: 'height',
        accessor: 'height',
      },
      {
        Header: 'address',
        accessor: 'address',
      },
      {
        Header: 'education',
        accessor: 'education',
      },
      {
        Header: 'family_type',
        accessor: 'family_type',
      },
     
    // Add more columns as needed
  ];

function Users() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterGender, setFilterGender] = useState(null);

  const handleFilter = (gender) => {
    if (gender === filterGender) {
      // If the same gender filter is clicked again, reset the filter
      setFilteredData(data);
      setFilterGender(null);
    } else {
      // Apply the gender filter
      const filtered = data.filter(item => item.gendar === gender);
      setFilteredData(filtered);
      setFilterGender(gender);
    }
  };

  useEffect(() => {
    // Fetch data from API
    axios.get('http://localhost:3002/get_List/getalluser')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: filterGender ? filteredData : data, // Use filteredData if filter is active
  });

  return (
    <div>
      <button onClick={() => handleFilter('male')}>
        Show Males
      </button>
      <button onClick={() => handleFilter('female')}>
        Show Females
      </button>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Users;

