//funcion que genera el gráfico extraido de canvas Js
window.onload = function () {
  const url = "http://localhost:3000/api/total";
  fetch(url)
    .then((response) => response.json())
    .then((allCountries) => {
      //console.log(allCountries);
      const countries = allCountries.map((dato) => {        
        return {
          label: dato.country,
          active: dato.active,
          confirmed: dato.confirmed,
          recuperados: dato.recovered,
          deaths: dato.deaths,
        };
        
      });
      //console.log(countries)
      generarTabla(countries);
      const array = countries.sort((a, b) => {
        return b.active - a.active;
      });
      const topTen = array.slice(1, 11);
      //console.log(topTen);

      let topTenActive = topTen.map((dato) =>{
        return {label: dato.label, y: dato.active}
      })
      

      let topTenConfirmed = topTen.map((dato)=>{
        return{
          label: dato.label,y: dato.confirmed};
      })


      let topTenRecovered = topTen.map((dato) =>{
       
        return{label: dato.label, y:dato.recuperados}
        
        
      })
       
      
      let topTenDeaths = topTen.map ((dato) =>{

        return{label:dato.label, y:dato.deaths}
      });
      generarGrafico(topTenActive, topTenConfirmed, topTenRecovered, topTenDeaths);
    });

       
  

  //gráfico
  const generarGrafico = (topTenActive, topTenConfirmed, topTenRecovered, topTenDeaths  ) => {
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Datos Mundiales del COVID-19",
      },
      axisY: {
        title: "Numero de personas",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC",
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: "pointer",
        itemclick: toggleDataSeries,
      },
      data: [
        {
          type: "column",
          name: "Casos activos",
          legendText: "Casos activos",
          showInLegend: true,
          dataPoints: topTenActive,
        },
        {
          type: "column",
          name: "Casos confirmados",
          legendText: "Casos confirmados",
          showInLegend: true,
          dataPoints: topTenConfirmed,
        },
        {
          type: "column",
          name: "Fallecidos",
          legendText: "Fallecidos",
          showInLegend: true,
          dataPoints: topTenDeaths,
        },
        {
          type: "column",
          name: "Recuperados",
          legendText: "Recuperados",
          axisYType: "secondary",
          showInLegend: true,
          dataPoints: topTenRecovered,        
        },
      ],
    });
    chart.render();

    function toggleDataSeries(e) {
      if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
  };
};


//TABLA
const generarTabla = (array => {

 let arrayOrdenado= array.sort((a,b) =>{
    if(a<b){
      return -1
    }if(a>b){
      return 1
    }
      return 0;
console.log(arrayOrdenado);

  })






});  


