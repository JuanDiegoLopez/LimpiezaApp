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

    console.log(deviceSessionId);

    $('#content').html(`
        <p style="background:url(https://maf.pagosonline.net/ws/fp?id=`+ deviceSessionId + id_user + `)"></p>
        <img src="https://maf.pagosonline.net/ws/fp/clear.png?id=`+ deviceSessionId + id_user + `">
        <script src="https://maf.pagosonline.net/ws/fp/check.js?id=`+ deviceSessionId + id_user + `"></script>
        <object type="application/x-shockwave-flash" data="https://maf.pagosonline.net/ws/fp/fp.swf?id=`+ deviceSessionId + id_user + `" width="1" height="1" id="thm_fp">
            <param name="movie" value="https://maf.pagosonline.net/ws/fp/fp.swf?id=`+ deviceSessionId + id_user + `" />
        </object>`);
}


function Pay() {
    var ApiKey = "4Vj8eK4rloUd272L48hsrarnUA";
    var merchantId = "508029";
    var referenceCode = "payment_test_00000001";
    var tx_value = 10000;
    var currency = "COP";
    var signature = md5(ApiKey + '~' + merchantId + '~' + referenceCode + '~' + tx_value + '~' + currency);
    var deviceSessionId = getDeviceSessionId();

    var name = $("#name").val();
    var email = $("#email").val();
    var creditCardNumber = $("#creditCardNumber").val();
    var securityCode = $("#securityCode").val();
    var creditCardName = $("#creditCardName").val();
    var month = $('month').val();
    var year = $('year').val();
    var expirationDate = year+"/"+month;
    var address = $("#address").val();
    var city = $("#city").val();
    var state = $("#state").val();


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
                    referenceCode: "payment_test_00000001",
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
                    "emailAddress": email,
                    "dniNumber": dni,
                    "billingAddress": {
                        "street1": address,
                        "city": city,
                        "state": state,
                        "country": "CO",
                    }
                },
                "creditCard": {
                    "number": creditCardNumber,
                    "securityCode": securityCode,
                    "expirationDate": expirationDate,
                    "name": creditCardName
                },
                "extraParameters": {
                    "INSTALLMENTS_NUMBER": 1
                },
                "type": "AUTHORIZATION_AND_CAPTURE",
                "paymentMethod": "VISA",
                "paymentCountry": "CO",
                "deviceSessionId": deviceSessionId,
                "ipAddress": "127.0.0.1",
                "cookie": "pt1t38347bs6jc9ruv2ecpv7o2",
                "userAgent": "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
            },
            "test": true
        }
}