import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';


export const TableMovies = ({ data }) => {

  
  const columns = [
    {
      dataField: 'title',
      text: 'título'
    },
    {
      dataField: 'year',
      text: 'Año'
    },
    {
      dataField: 'rating',
      text: 'Clasificación'
    },
    {
      dataField: 'metascore',
      text: 'Puntaje'
    },
    {
      dataField: 'director',
      text: 'Director'
    },
  ];


  const rowStyle = (row, rowIndex) => {

    return rowIndex % 2 === 0 ? { backgroundColor: '#d0d0d0' } : { backgroundColor: 'white' };
  };


  return (
    <BootstrapTable keyField='title' data={data} columns={columns} rowStyle={rowStyle} />
  )
}
