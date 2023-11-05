import { useEffect, useState } from 'react';
import './App.css';
import LoaderPage from './Loader/LoaderPage';
import NutritionComponent from './NutritionComponent';
import Swal from 'sweetalert2';

function App() {

  const [mySearch, setMySearch] = useState(""); // what user enters into the input field
  const [wordSubmit, setWordSubmit] = useState(''); //initial state - no analysis, changed state - got analysis
  const [myNutrition, setMyNutrition] = useState(); // data form API 
  const [stateLoader, setStateLoader] = useState(false); // Loader state

  
  const APP_URL = 'https://api.edamam.com/api/nutrition-details'
  const MY_ID = "50520499";
  const MY_KEY = "5de2e45a1138192adf18fc3d1b0c4b2c";

  

  const getAnalysis = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(`${APP_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      console.log(data)
      setMyNutrition(data)
    } else {
      setStateLoader(false);
      alert();
    }
  }

  const getData = (e) => {
  setMySearch(e.target.value);
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmit(mySearch);
  }

  const deleteSearch = () => {
    setMySearch("");
    setMyNutrition();
  }

  const alert =()=>{
    Swal.fire(
      'Ingredients are entered incorrectly',
      'Try writing for example: 2 avocados, 1 glass of milk, 100 grams of butter...'
    )
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
      <p>Enter your ingredients </p>
      <p>for example: 2 avocados, 1 glass of milk, 100 grams of butter </p>
      <input onChange={getData} 
      placeholder='Your ingredient...' 
      spellCheck="true"
      lang='en'
      type='text' 
      value={mySearch}>
      </input>
      
      <button type='submit'>Search</button>

      <div className='App'>
            <button 
            onClick={deleteSearch} 
            type='button'
            value={mySearch}>
              delete
            </button>
      </div>
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
