let pagina = 1;
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
      
      
      
      const array = countries.sort((a, b) => {
        return b.active - a.active;
      });
      const topTen = array.slice(1, 11);
      

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
      cargarTabla(countries);
      generarGrafico(topTenActive, topTenConfirmed, topTenRecovered, topTenDeaths);
    });       

    //const datosGrafico2 = paisesOrdenados.map

  //gráfico 1
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

//grafico 2
const generarGrafico2 = ()=>{
  var chart = new CanvasJS.Chart("chartContainerModal2", {
    exportEnabled: true,
    animationEnabled: true,
    title:{
      text: `Datos ${paisesOrdenados[iterador].label}`
    },
    legend:{
      cursor: "pointer",
      itemclick: explodePie
    },
    data: [{
      type: "pie",
      showInLegend: true,
      toolTipContent: "{name}: <strong>{y}%</strong>",
      indexLabel: "{name} - {y}%",
      dataPoints: [
        /*{ y: 26, name: "School Aid", exploded: true },
        { y: 20, name: "Medical Aid" },
        { y: 5, name: "Debt/Capital" },
        { y: 3, name: "Elected Officials" },
        { y: 7, name: "University" },
        { y: 17, name: "Executive" },
        { y: 22, name: "Other Local Assistance"}*/
      ]
    }]
  });
  chart.render();
  }
  
  function explodePie (e) {
    if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
    e.chart.render();
}

//TABLA
const cargarTabla = (paises) => {
  let paisesOrdenados = ordenar(paises, "label");
  let iterador = 0, max = 0, aumentador = 20, acumulador = "";
  let tBody = document.getElementById("tBody");

  let tope = Math.floor(paisesOrdenados.length / aumentador) + 1;

  (pagina > tope) ? pagina = tope : null; //if ternario
  if (pagina == 1) {
    iterador = 0;
    max = aumentador
  } else {
    iterador = (pagina-1) * aumentador;
    max = pagina * aumentador;
    (max > paisesOrdenados.length) ? max = paisesOrdenados.length : null; //if ternario
  }

  for ( iterador; iterador < max; iterador++){
    
    acumulador += `
        <tr>
          <th scope="row">${paisesOrdenados[iterador].label}</th>
            <td>${paisesOrdenados[iterador].active}</td>
            <td>${paisesOrdenados[iterador].confirmed}</td>
            <td>${paisesOrdenados[iterador].deaths}</td>
            <td>${paisesOrdenados[iterador].recuperados}</td>
            <td><button type="reset" onclick = "generarGrafico2()" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver mas</button></td>
        </tr>  `

    
  }

  tBody.innerHTML = acumulador;
}

const ordenar = (items, campo) => {
  items.sort((a, b) => {
  const nameA = a[campo].toUpperCase(); 
  const nameB = b[campo].toUpperCase(); 
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  
  return 0;
});
  return items;
}









