// const { default: axios } = require("axios")
let cities = [
    {
        arabicName: "عمان",
        name: "Ammān"
    },
    {
        arabicName: "عجلون",
        name: "Ajlūn"

    },
    {
        arabicName: "جرش",
        name: "Jarash"

    }
]
for(let city of cities){
    // console.log(city);
    const content =  `
    <option>${city.arabicName}</option>
    `
    document.getElementById("cities-select").innerHTML+= content
}
document.getElementById("cities-select").addEventListener("change",function(){
    // console.log(this.value);
    document.getElementById("city-name").innerHTML = this.value
    let cityName = ""
    for(let city of cities){
        if(city.arabicName == this.value){
            cityName = city.name
        }
    }
getPrayersTimingsOfCity(cityName)

})
function getPrayersTimingsOfCity(cityName){
    let params ={
        country: "JO",
        city: cityName
    }
    axios.get('http://api.aladhan.com/v1/timingsByCity',{
        params: params
    })
    .then((response) => {
        // console.log(response.data.data);
        // console.log(response.data.data.timings);
        const timings = response.data.data.timings
        fillTimeForPrayer("Fajr",timings.Fajr)
        fillTimeForPrayer("Sunrise",timings.Sunrise)
        fillTimeForPrayer("Dhuhr",timings.Dhuhr)
        fillTimeForPrayer("Asr",timings.Asr)
        fillTimeForPrayer("Maghrib",timings.Maghrib)
        fillTimeForPrayer("Isha",timings.Isha)
    
       
    
        let readableDate = response.data.data.date.readable
        let weekDay = response.data.data.date.hijri.weekday.ar
        let date = weekDay + "  " + readableDate
        document.getElementById("dayandreadable").innerHTML = date
    
       
    }).catch((error)=> {
        alert(error)
    })

}
getPrayersTimingsOfCity("Ammān")

function fillTimeForPrayer(id, time){
    document.getElementById(id).innerHTML = time
}