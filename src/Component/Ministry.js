import {useEffect, useState} from 'react'
import './Minstry.css';

const fake = [
  {
    DBA_Name: 'pizza',
    Address: 'who cares',
    NumberOfAlerts: 5,
    Prediction: 1,
    License: 123
  },
  {
    DBA_Name: 'sushi',
    Address: 'fake street',
    NumberOfAlerts: 2,
    Prediction: 2,
    License: 321
  } 
];

export default function Ministry() {
    const [list, setList] = useState([])
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
              <tr key={elem.License}>
                <td>{elem.License}</td>
                <td>{elem.nameFormatted}</td>
                <td>{elem.addressFormatted}</td>
                <td>{elem.NumberOfAlerts}</td>
              </tr>
            );
          });
    
          setList(fetched);
      } ).catch(e => window.alert('There was an unexpected error.'))

    }, [])

     return (
       <table className='rounded'>
         <thead>
           <tr key="12">
             <th>License</th>
             <th>Name</th>
             <th>Address</th>
             <th>Alerts in the last 3 days</th>
           </tr>
         </thead>
         <tbody>{list}</tbody>
       </table>
     );
}
