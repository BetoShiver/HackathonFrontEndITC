import { useEffect, useState } from 'react'
import './Minstry.css';
import Pagination from "./Pagination";

export default function Ministry() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listPerPage] = useState(5);

  const indexOfLastList = currentPage * listPerPage;
  const indexOfFirstList = indexOfLastList - listPerPage;
  const currentList = list.slice(indexOfFirstList, indexOfLastList);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const addTabOptions = (element) => {
    element.nameFormatted = toTitleCase(element.DBA_Name);
    element.addressFormatted = toTitleCase(element.Address);
  };

  useEffect(() => {
    fetch('https://indigestion-prediction-backend.herokuapp.com/api/restaurantsAlerts').then(r => r.json()).then(d => {
      let fetched = d.map((elem) => {
        d.sort((a, b) => (a.NumberOfAlerts < b.NumberOfAlerts ? 1 : -1));
        addTabOptions(elem);
        return (
          <tr key={elem.id}>
            <td>{elem.License}</td>
            <td>{elem.nameFormatted}</td>
            <td>{elem.addressFormatted}</td>
            <td>{elem.NumberOfAlerts}</td>
          </tr>
        );
      });

      setList(fetched);
    }).catch(e => window.alert('There was an unexpected error.'))

  }, [])

  return (
    <>
      <table className='rounded mx-auto mb-2'>
        <thead>
          <tr key="12">
            <th>License</th>
            <th>Name</th>
            <th>Address</th>
            <th>Alerts in the last 3 days</th>
          </tr>
        </thead>
        <tbody>{currentList}</tbody>
      </table>
      <Pagination listPerPage = {listPerPage} totalList = {list.length} paginate = {paginate}/>
    </>

  );
}
