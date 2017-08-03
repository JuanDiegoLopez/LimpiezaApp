window.onload = AddHtml();

function getDeviceSessionId() {
    var token = JSON.parse(localStorage.getItem("session")).token;
    var time = Date.now();
    var deviceSessionId = md5(token + time);

    return deviceSessionId;
}

function AddHtml() {
    var id_user = JSON.parse(localStorage.getItem("session")).id;
    var deviceSessionId = getDeviceSessionId();

    $('#content').html(`
        <p style="background:url(https://maf.pagosonline.net/ws/fp?id=`+ deviceSessionId + id_user + `)"></p>
        <img src="https://maf.pagosonline.net/ws/fp/clear.png?id=`+ deviceSessionId + id_user + `">
        <script src="https://maf.pagosonline.net/ws/fp/check.js?id=`+ deviceSessionId + id_user + `"></script>
        <object type="application/x-shockwave-flash" data="https://maf.pagosonline.net/ws/fp/fp.swf?id=`+ deviceSessionId + id_user + `" width="1" height="1" id="thm_fp">
            <param name="movie" value="https://maf.pagosonline.net/ws/fp/fp.swf?id=`+ deviceSessionId + id_user + `" />
        </object>`);
}


function getIp() {
    var ip;
    $.ajax({
        url: 'http://jsonip.com/',
        dataType: 'JSON',
        type: 'get',
        async: false,
        success: function (res) { ip = res.ip; }
    });

    return ip;
}

function Pay() {
    var ApiKey = "4Vj8eK4rloUd272L48hsrarnUA";
    var merchantId = "508029";
    var referenceCode = "prueba0001";
    var tx_value = 10000;
    var currency = "COP";
    var signature = md5(ApiKey + '~' + merchantId + '~' + referenceCode + '~' + tx_value + '~' + currency);
    var deviceSessionId = getDeviceSessionId();

    var name = $("#name").val();
    var dni = $("#dni").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var creditCardNumber = $("#creditCardNumber").val();
    var securityCode = $("#securityCode").val();
    var creditCardName = $("#creditCardName").val();
    var month = $('#month').val();
    var year = $('#year').val();
    var expirationDate = year + "/" + month;
    var address = $("#address").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var ip = getIp();
    var cookie = md5(document.cookie);
    var userAgent = navigator.userAgent;

    var datos =
        {
            language: "es",
            command: "SUBMIT_TRANSACTION",
            merchant: {
                apiKey: ApiKey,
                apiLogin: "pRRXKOl8ikMmt9u"
            },
            transaction: {
                order: {
                    accountId: "512321",
                    referenceCode: referenceCode,
                    description: "payment test",
                    language: "es",
                    signature: signature,
                    additionalValues: {
                        TX_VALUE: {
                            value: tx_value,
                            currency: currency
                        }
                    },
                    buyer: {
                        fullName: name,
                        emailAddress: email,
                        contactPhone: phone,
                        dniNumber: dni,
                        shippingAddress: {
                            street1: address,
                            city: city,
                            state: state,
                            country: "CO",
                        }
                    }
                },
                payer: {
                    fullName: name,
                    emailAddress: email,
                    dniNumber: dni,
                    billingAddress: {
                        street1: address,
                        city: city,
                        state: state,
                        country: "CO",
                    }
                },
                creditCard: {
                    number: creditCardNumber,
                    securityCode: securityCode,
                    expirationDate: expirationDate,
                    name: creditCardName
                },
                extraParameters: {
                    INSTALLMENTS_NUMBER: 1
                },
                type: "AUTHORIZATION_AND_CAPTURE",
                paymentMethod: "VISA",
                paymentCountry: "CO",
                deviceSessionId: deviceSessionId,
                ipAddress: ip,
                cookie: cookie,
                userAgent: userAgent
            },
            test: true
        }
        
    datos = JSON.stringify(datos);
    
    $.ajax({
        data: datos,
        url: 'https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi',
        dataType: 'json',
        type: 'post',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        success: function (res) {
            console.log(res);
        }
    });

}