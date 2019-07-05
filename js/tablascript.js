//Ejecuta esta funcion luego del load del documento
$(function(){
    //var service = {};
    service = {};

    service.getF1Standings = function() {
        //Como obtener datos de getConductores.
        console.log("obteniendo datos...");
        service.getConductores()
        .then(function(result){
            console.info("datos obtenidos...");
            service.processResult(result);
        })
        .catch(function(error){
            console.error("Se ha producido un error:" + error.statusText)
        });
    }

    service.getConductores = function() {
        //Llamada AJAX -- llamada a un request de http de manera asincrona.
        return $.ajax({
            url: "http://ergast.com/api/f1/2019/driverStandings.json",
            type: "JSON",
            method: "GET"
        });
    }
    
    service.processResult = function(result) {
        //Trabajar con los datos...
        if (result != null) {
            if (result.MRData != null) {
                var drivers = result.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                service.renderData(drivers);
            } else {
                console.error("No hay datos");
            }
        } else {
            console.error("No hay datos");
            alert("No hay datos");
        }
    }

    service.renderData = function(drivers) {
        //Generar los elementos con jQuery al documento.
        var tableBody = $("tbody");
        tableBody.html("");
        drivers.forEach(function(element){
            tableBody.prepend(
                $("<tr/>").append(
                    $("<td/>").append(
                        element.position
                    )
                ).append(
                    $("<td/>").append(
                        element.Driver.givenName
                    )
                ).append(
                    $("<td/>").append(
                        element.Driver.familyName
                    )
                ).append(
                    $("<td/>").append(
                        element.Constructors[0].name
                    )
                ).append(
                    $("<td/>").append(
                        element.points
                    )
                )
            );
        });
    }

    service.getF1Standings();
    console.log("fin del programa...");
});

function ocultar() {
    $(".ocultar").fadeToggle();
}