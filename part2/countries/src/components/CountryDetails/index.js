 
const CountryDetails = (props) => {
 
  return (
    <div>
      <h2>{props.country.name.common}</h2>
      <div>capital {props.country.capital[0]}</div>
      <div>area {props.country.area}</div>
      <h3>languages:</h3>
      <ul>{Object.values(props.country.languages).map(lang => <li key={lang}>{lang}</li>)}</ul>
      <div><img src={props.country.flags.png} alt='flag'/> </div>
      <h3> Weather in {props.country.capital[0]} </h3>
      <div>temperature {props.weather.main.temp} Celcius</div>
      <div><img src={`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`} alt='icon'/>  </div>
      <div>wind {props.weather.wind.speed} m/s</div>
    </div>
  )
}


export default CountryDetails