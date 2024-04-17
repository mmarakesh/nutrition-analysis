function NutritionComponent({label, quantity, unit}) {
    return(
        
        <div>
            <ul className="container">
            <li className="font-list">
                {label} : {quantity.toFixed(1)} {unit}
            </li>
            </ul>
        </div>

    )
}

export default NutritionComponent;