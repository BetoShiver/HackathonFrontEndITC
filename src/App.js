import { Combobox } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import './App.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Sample from './lib/sample.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
let Api_Url = 'https://indigestion-prediction-backend.herokuapp.com/api/restaurants/'

function App() {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState('');
  const [alert, setAlert] = useState(false)
  //const [sample, setSample] = useState([])
  let Sample = ['select one', 'green', 'red', 'blue'];

   function toTitleCase(str) {
     return str.replace(/\w\S*/g, function (txt) {
       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
     });
   }

  const tabOption = (data) => {
    
    let reducedObject = data.map((element) => {
      return({
        text: `${toTitleCase(element.DBA_Name)} at ${toTitleCase(
          element.Address
        )}`,
        license: data.license
      });
    });
   
    return reducedObject
  };
  
  useEffect(() => {
    fetch(`${Api_Url}`)
      .then(res => res.json())
      .then(d => {
        let options = tabOption(d)
        setData(options)
        let selections = options.map(elem => elem.text)
        selections.sort()
        setOptions(selections);
      })
      .catch(e => {
        Swal.fire('Trouble connecting to server')
      }  )
  }, []);

 

  return (
    <div className="App">
      <div className="top px-3 my-2 py-3 rounded">
        <h2>Welcome to Indigestion Alert</h2>
        <hr />
        To report a problem or see our predicted rating, please select a
        restaurant:
        <div className="selector   my-3">
          <Combobox
            data={options}
            onChange={(e) => setSelected(e)}
            caseSensitive={false}
            minLength={3}
            filter="contains"
          />
        </div>{' '}
        {selected !== '' && (
          <p className="btns mt-2">
            <Button className="mr-5 font-weight-bold btn" variant="danger">
              Report a problem
            </Button>
            <Button className="ml-5 font-weight-bold btn" variant="info" onClick={setAlert(true)}>
              {' '}
              See our assessment
            </Button>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
