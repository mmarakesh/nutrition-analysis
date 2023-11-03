import { useEffect, useState } from 'react';
import './App.css';
import LoaderPage from './Loader/LoaderPage';
import NutritionComponent from './NutritionComponent';

function App() {

  const [mySearch, setMySearch] = useState();
  const [wordSubmit, setWordSubmit] = useState('');
  const [stateLoader, setStateLoader] = useState(false)
  const [myNutrition, setMyNutrition] = useState()
  
  const MY_ID = "50520499";
  const MY_KEY = "5de2e45a1138192adf18fc3d1b0c4b2c";

  

  const getAnalysis = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=${MY_ID}&app_key=${MY_KEY}`, 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data)
    } else {
      setStateLoader(false);
      alert('ingredients entered incorrectly');
    }
  }

  const getData = (e) => {
  setMySearch(e.target.value);
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmit(mySearch);
  }

  useEffect(() => {
    if (wordSubmit !== '') {
      let ingr = wordSubmit.split(/[,,;,\n,\r]/);
      getAnalysis(ingr);
    }
  }, [wordSubmit])

  return (
    <div className="App">
      {stateLoader && <LoaderPage/>} 

      <h1>Nutrinion Analysis</h1>
      <form onSubmit={finalSearch}>
      <input onChange={getData} value={mySearch}></input>
      <button>Click here</button>
      </form>

      <div>
      {
        myNutrition && <p> {myNutrition.calories} kcal </p>
      }
      {
        myNutrition && Object.values(myNutrition.totalNutrients)
        .map(({label, quantity, unit}) => 
        <NutritionComponent
        label = {label}
        quantity = {quantity}
        unit = {unit}
        />
        )
      }

      
    </div>
    </div>
  );
}

export default App;
