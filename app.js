function getDayName(date)
{
    let now = new Date(date).toLocaleDateString('en-us', { weekday:"long", day:"numeric"}); 
    return now ;    
}

async function getWeather() {
    let url = 'https://api.weather.gov/gridpoints/MTR/84,105/forecast';
    try {
        fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log('data', data)
        let html = `<div class="heading">7-Day Weather <span class="subheading"> - San Francisco, California</span> </div>
        <div class="time">As of ${getDayName(new Date())}</div>
        <hr/>`;
        let htmlmain = '<div class="grid2">';
        for(i = 0;i<data.properties.periods.length; i++) {
            if(i<2) {
                htmlmain += `<div>
                <div>
                    <span class="daynight"> ${getDayName(data.properties.periods[i].startTime.split('T')[0])} |</span>  ${i%2==0?'Day':'Night' }
                    <div class="grid2">
                        <div class="tempicon">
                            <div class="temp">${data.properties.periods[i].dewpoint.value.toFixed(1)} &deg;</div>
                            <div><img src="${data.properties.periods[i].icon}" /></div>
                        </div>
                        <div>
                            <div><svg class="rain" aria-label="Chance of Rain" viewBox="0 -2 5 10"><title>Rain</title><path d="M4.7329.0217c-.1848-.059-.3855.0064-.4803.148L.2731 5.1191c-.0814.0922-.1501.1961-.196.3108-.2469.6009.1185 1.2697.8156 1.4943.6914.226 1.447-.0712 1.7-.6585L4.9662.4987l.0111-.0282c.073-.1807-.036-.379-.2444-.4488z"></path></svg>
                            ${data.properties.periods[i].probabilityOfPrecipitation.value}%
                            </div>
                            <div>
                                <svg class="rain" aria-label="Wind" viewBox="0 0 24 24"><title>Wind</title><path d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742" stroke-width="2" stroke="currentColor" stroke-linecap="round" fill="none"></path></svg>
                                ${data.properties.periods[i].windDirection} ${data.properties.periods[i].windSpeed}
                            </div>
                        </div>
                    </div>
                    ${data.properties.periods[i].detailedForecast}
                </div>
            </div>`
            }
            else {
                if(i==2)
                    htmlmain += "</div>";
                if (i%2 == 0) 
                    htmlmain += `<hr/>
        <div class="summary">
            <div>${getDayName(data.properties.periods[i].startTime)}</div>
            <div class="sumtemp">${data.properties.periods[i].dewpoint.value.toFixed(1)} &deg;<span class="smtemp">/${data.properties.periods[i+1].dewpoint.value.toFixed(1)} &deg;</span></div>
            <div><img src="${data.properties.periods[i].icon}" /></div>
            <div>${data.properties.periods[i].shortForecast}</div>
            <div><svg class="rain" aria-label="Chance of Rain" viewBox="0 -2 5 10"><title>Rain</title><path d="M4.7329.0217c-.1848-.059-.3855.0064-.4803.148L.2731 5.1191c-.0814.0922-.1501.1961-.196.3108-.2469.6009.1185 1.2697.8156 1.4943.6914.226 1.447-.0712 1.7-.6585L4.9662.4987l.0111-.0282c.073-.1807-.036-.379-.2444-.4488z" stroke-width="1" stroke="currentColor" stroke-linecap="round" fill="none"></path></svg>
            ${data.properties.periods[i].probabilityOfPrecipitation.value} %
            </div>
            <div>
                <svg class="rain" aria-label="Wind" viewBox="0 0 24 24"><title>Wind</title><path d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742" stroke-width="2" stroke="currentColor" stroke-linecap="round" fill="none"></path></svg>
                ${data.properties.periods[i].windDirection} ${data.properties.periods[i].windSpeed}
            </div>
        </div>`
            }
        }
        html += htmlmain;
        let container = document.querySelector('.container');
        container.innerHTML = html;
});
} catch (error) {
        console.log(error);
    }
}


getWeather();

