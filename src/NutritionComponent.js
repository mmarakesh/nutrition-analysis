function NutritionComponent({label, quantity, unit}) {
    return(
        <div>
    <h2>{label}</h2>
    <p>{quantity}</p>
    <p>{unit}</p>
        </div>
    )
}

export default NutritionComponent;