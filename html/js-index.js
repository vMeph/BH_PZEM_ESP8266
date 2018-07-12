var map = {"config":"","potencia":"W","amperagem":"A","voltagem":"V","temp":"\u00BAC","contador":""};
function loadConfig() {
    var someUrl = "/config";
    $.ajax({
        url: someUrl,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
            console.log(response);

            $('input[name="nodeId"]').val(response[0].nodeId);
            $('input[name="directionCurrentDetection"]').prop("checked",response[0].directionCurrentDetection);
            $('select[name="notificationInterval"] option[value="'+response[0].notificationInterval+'"]').attr("selected","selected");

            $('input[name="emoncmsApiKey"]').val(response[0].emoncmsApiKey);
            $('input[name="emoncmsUrl"]').val(response[0].emoncmsUrl);
            $('input[name="emoncmsPrefix"]').val(response[0].emoncmsPrefix);

            $('input[name="mqttIpDns"]').val(response[0].mqttIpDns);
            $('input[name="mqttUsername"]').val(response[0].mqttUsername);
            $('input[name="mqttPassword"]').val(response[0].mqttPassword);

            $('input[name="wifiSSID"]').val(response[0].wifiSSID);
            $('input[name="wifiSecret"]').val(response[0].wifiSecret);

            $("#firmwareVersion").text(response[1].firmwareVersion);

            $('select[name="IO_00"] option[value="'+response[0].IO_00+'"]').attr("selected","selected");
            $('select[name="IO_02"] option[value="'+response[0].IO_02+'"]').attr("selected","selected");
            $('select[name="IO_13"] option[value="'+response[0].IO_13+'"]').attr("selected","selected");
            $('select[name="IO_15"] option[value="'+response[0].IO_15+'"]').attr("selected","selected");
            $('select[name="IO_16"] option[value="'+response[0].IO_16+'"]').attr("selected","selected");

        },
        timeout: 2000
    })
}
function loadReadings() {
    var someUrl = "/readings";
    $.ajax({
        url: someUrl,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {

            $('#sensors').empty();
            Object.keys(response).forEach(function (key) {
                $('#sensors').append('<li  class="list-group-item"><h6>'+key+': <span id="'+key+'" class="badge badge-secondary">'+response[key]+' '+map[key.split("_")[0]]+'</span></h6></li>');
            })


        },
        timeout: 2000
    })
}


$(document).ready(function(){
    loadConfig();
    loadReadings();
    setInterval(loadReadings, 3000);
});