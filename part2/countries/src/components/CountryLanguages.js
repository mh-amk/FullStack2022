const CountryLanguages = ({country})=>
{

    function country_languages(country)
    {
        if (country.languages===null|| country.languages===undefined)
            <ul><li>n/a</li></ul>
        else
        {
            const usersByLikes =Object.values(country.languages)
               .map(item =>
                {const container = [];
                container[0] = item;
                return container
            })
            return(
            <ul>
                {usersByLikes.map(y1=><li key={y1}>{y1}</li>)}
            </ul>
            )
        }        
    }
    
return (
    <div>
        {country_languages(country)}
    </div>
)} 
export default CountryLanguages;