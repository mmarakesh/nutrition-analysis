import { useCallback, useEffect, useState } from 'react';
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
  const MY_ID = "227f4117";
  const MY_KEY = "e80b1d2514af137854530f4704e023a2";

  

  const getAnalysis = useCallback ( async (ingr) => {
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
      showAlert();
    }
  }, [])

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

  const showAlert =()=>{
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
  }, [wordSubmit, getAnalysis])

  return (
    <div className="App">
      {stateLoader && <LoaderPage/>} 

      
      <h1>Nutrinion Analysis</h1>
      <form onSubmit={finalSearch}>
      <h3>Enter your ingredients </h3>
      <p>for example: 2 avocados, 1 glass of milk, 100 grams of butter </p>
      <input onChange={getData} className='font'
      placeholder='Your ingredient...' 
      spellCheck="true"
      lang='en'
      type='text' 
      value={mySearch}>
      </input>
      
      <button type='submit' className='searchBtn'>Search</button>

      <div>
            <button 
            className='deleteBtn'
            onClick={deleteSearch} 
            type='button'
            value={mySearch}>
              delete
            </button>
      </div>
      </form>

      <div>
      {/* {
        myNutrition && <h3 className='kcal'>Contains: {myNutrition.calories} kcal </h3>
      } */}
      {
        myNutrition && Object.values(myNutrition.totalNutrients)
        .map(({label, quantity, unit}, index) => 
        <NutritionComponent key={index}
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
