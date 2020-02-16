//decalara el request para poder hacer consultas de tipi ajax y importar también la llibria de jquery.
import * as request from "request-promise-native";
import * as $ from "jquery";
// la connexion a la api de bitcoin
(async () => {
  //declara urls que no hace falta.
  const host = 'https://api.coinbase.com';
  const path = '/v2/currencies';
  const path2 = '/v2/exchange-rates?currency=BTC';
  var options1 = {
      uri: host + path,
  };

  var options2 = {
    uri: host + path2,
};
  //guardar la resqueta en format json para estructura body.
  var result1 = await request.get(options1);
  var result2 = await request.get(options2);
  var bitcoin = JSON.parse(result1);
  var bit = JSON.parse(result2);
  for (var i = 0; i < bitcoin.data.length; i++) {
    //generar los opciones del input select
    $('#monedas1').append(`<option selected value="${bitcoin.data[i].id}">
    ${bitcoin.data[i].name }
    </option>`);
    // mostrar por defecto euro como pide la practica
    if(bitcoin.data[i].name =="Euro" ){
      console.log(bitcoin.data[i].id);
      console.log(bit.data.rates[bitcoin.data[i].id]);
      $('#digual').text('1 bitcoin = ');
      $('#dvalor').text(bit.data.rates[bitcoin.data[i].id]);
      $('#dnom').text(bitcoin.data[i].id);
      $('.#monedas1 option:eq(Euro)').prop('selected', true)
    }
    // click sobre el button get para tener el resultado  entre dos monedas y nos muestra l’equivalencia.
    var submit = document.getElementById('submit');
    submit.addEventListener('click', function () {
      $('#igual').remove();
      $('#dvalor').remove();
      $('#dnom').remove();
      $('#igual').text('1 bitcoin = ');
      $('#valor').text(bit.data.rates[$('#monedas1').find("option:selected").attr('value')]);
      $('#nom').text($('#monedas1').find("option:selected").text());
      
    });
    $('#perdefecte').text('Euro');
    // resultado del valor de la moneda
    $(document).on('change', '#monedas1', function() {
      $('#perdefecte').remove();
      $('#num').val('0');
      $('#conv').text('0');
      $('#namemoneda').text($('#monedas1').find("option:selected").text());
    });
    //conversión de la moneda
    $("#num").on("input", function() {
      var numero=$('#num').val();
      var valor= bit.data.rates[$('#monedas1').find("option:selected").attr('value')];
      let res = <any>numero/<any>valor;
      $('#conv').text(res);
    });

  }
  
})()

