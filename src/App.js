import { Combobox } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import './App.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Alert from './Component/Alert';
import Prediction from './Component/Prediction';
import MinistryConfirm from './Component/MinistryConfirm';
import Ministry from './Component/Ministry';
let Api_Url =
  'https://indigestion-prediction-backend.herokuapp.com/api/restaurants/';

function App() {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showPredict, setShowPredict] = useState(false);
  const [alertProps, setAlertProps] = useState({});
  const [mConfirm, setMConfirm] = useState(false)
  const [ministry, setMinistry] = useState(false)
  const [nameCity, setNameCity] = useState();

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  
  useEffect(() => {
    const addTabOption = (data) => {
      data.forEach((element) => {
        element.text = `${toTitleCase(element.DBA_Name)} at ${toTitleCase(
          element.Address 
        )}`;
      });
    };
    fetch(`${Api_Url}`)
      .then((res) => res.json())
      .then((d) => {
        addTabOption(d);
        setData(d);
        let selections = d.map((elem) => elem.text);
        selections.sort();
        setOptions(selections);
      })
      .catch((e) => {
        Swal.fire('Trouble connecting to server');
      });
  }, []);

  const handleSelected = (e) => {
    setSelected(e);
    setShowAlert(false);
    setShowPredict(false);
        setMConfirm(false);
        setMinistry(false);
  };

  const showAssessment = () => {
    setShowAlert(false);
    setMConfirm(false);
    setMinistry(false);

    try {
      const restaurant = data.find((elem) => elem.text === selected);
      let rest = {
        restaurantName: restaurant.DBA_Name,
        restaurantAddress: restaurant.Address,
        License: restaurant.License
      };
      setAlertProps(rest);
      setShowPredict(true);
    } catch {
      return;
    }
  };

  const handleShowAlert = () => {
    setShowPredict(false);
        setMConfirm(false);
        setMinistry(false);

    try {
      const restaurant = data.find((elem) => elem.text === selected);
      let rest = {
        restaurantName: restaurant.DBA_Name,
        restaurantAddress: restaurant.Address,
        License: restaurant.License
      };
      let cityName = restaurant.City;
      setNameCity(cityName);
      setAlertProps(rest);
      setShowAlert(true);
    } catch {
      return;
    }
  };

  const grantAccess =  () => {
    setMConfirm(false)
    setMinistry(true)
  }


  const denyAccess =() => {
    Swal.fire('Access denied');
    setMConfirm(false)

  }

  return (
    <div>
      <div className="top px-3 py-3 rounded">
        <div className="title">
          <h2>Welcome to Indigert</h2>
          <div onClick={() => setMConfirm(true)} className="titleBtn">
            Access Health Ministry Section
          </div>
        </div>
        <hr />
        To report a problem or see our predicted rating, please select a
        restaurant:
        <div className="selector   my-3">
          <Combobox
            data={options}
            onChange={(e) => handleSelected(e)}
            caseSensitive={false}
            minLength={3}
            filter="contains"
          />
        </div>
        {selected !== '' && (
          <p className="btns mt-2">
            <Button
              className="mr-5 font-weight-bold btn"
              variant="danger"
              onClick={() => handleShowAlert()}
            >
              Report a potential problem
            </Button>
            <Button
              className="ml-5 font-weight-bold btn"
              variant="secondary"
              onClick={() => showAssessment()}
            >
              See our assessment
            </Button>
          </p>
        )}
      </div>
      <div className="App">
        <div className="container">
          {ministry &&  <div className= 'pt-5'><Ministry /></div>}
          {mConfirm && <MinistryConfirm confirm={() => grantAccess()} deny={ () => denyAccess()}/>}
          {showPredict && <Prediction restaurant={alertProps} />}
          {showAlert && <Alert restaurant={alertProps} allRestaurant={data} nameCity={nameCity}/>}
        </div>
      </div>
    </div>
  );
}

export default App;
