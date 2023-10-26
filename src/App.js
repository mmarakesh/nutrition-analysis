import { useEffect, useState } from 'react';
import './App.css';
import NutritionComponent from './NutritionComponent';

function App() {
  const MY_ID = "996b8d70";
  const MY_KEY = "13511e53a8922ecf13133c4451c2be24";

  const [mySearch, setMySearch] = useState('');
  const [myNutrition, setMyNutrition] = useState([]);

  useEffect(() => {
    getAnalysis();
  }, [])

  const getAnalysis = async () => {
    const response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=${MY_ID}&app_key=${MY_KEY}&nutrition-type=logging&ingr=avocado`)
    const data = await response.json();
    console.log(data)
    setMyNutrition(data);
  }

  const getData = (e) => {
  console.log(e.target.value);
  setMySearch(e.target.value);
  }
  return (
    <div className="App">
      <h1>Nutrinion Analysis</h1>
      <form>
      <input onChange={getData} value={mySearch}></input>
      </form>

      <button>Click here</button>
      
    {myNutrition.map((item, index) => (
    <NutritionComponent key = {index}
                        calories = {item.calories}
                        nutrients = {item.totalNutrients}/>
    ))}
    
    </div>
  );
}

export default App;
