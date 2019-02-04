var demo1Call = 0;
var demo2Call = 0;
var demo3Call = 0;
var $key = '6Ldz7oYUAAAAACDvUt-S_bT3cjIOgOxl2ar2fvd-';
var hash = false; 


function loadcaptcha() {

	$('#demo-form1').validator().on('submit', function (e) {
    
    	if (e.isDefaultPrevented()) {
        	// handle the invalid form...
            console.log("validation failed");
        } else {
        	// everything looks good!
            demo1Call = 1;
            $(document).find('#recaptcha1').remove();
            console.log($(document).find('#recaptcha1'))
            $('#demo-form1').append("<div id='recaptcha1' ></div>");
			
			e.preventDefault();
            console.log("validation success");
            if (typeof widgetId1 != 'undefined')
            	grecaptcha.reset(widgetId1);
            
            if (demo1Call == 1)
            {
            	widgetId1 = grecaptcha.render('recaptcha1', {
                	'sitekey': $key,
                    'callback': login,
                    'size': "invisible"
                });
            }

            grecaptcha.reset(widgetId1);
			
			grecaptcha.execute(widgetId1);
            console.log('show');
        }
    });


	$('#frmRecSenha').validator().on('submit', function (e) {
    
    	if (e.isDefaultPrevented()) {
        	// handle the invalid form...
            console.log("validation failed");
        } else {
        	// everything looks good!
            demo2Call = 1;
            $(document).find('#recaptchaRecSenha').remove();
            console.log($(document).find('#recaptchaRecSenha'))
            $('#frmRecSenha').append("<div id='recaptchaRecSenha' ></div>");
			
			e.preventDefault();
            console.log("validation success");
            if (typeof widgetId2 != 'undefined')
            	grecaptcha.reset(widgetId2);
            
            if (demo2Call == 1)
            {
            	widgetId2 = grecaptcha.render('recaptchaRecSenha', {
                	'sitekey': $key,
                    'callback': recSenha,
                    'size': "invisible"
                });
            }

            grecaptcha.reset(widgetId2);
			
			grecaptcha.execute(widgetId2);
            console.log('show');
        }
    });

	$('#frmContato').validator().on('submit', function (e) {
    
    	if (e.isDefaultPrevented()) {
        	// handle the invalid form...
            console.log("validation failed");
        } else {
        	// everything looks good!
            demo3Call = 1;
            $(document).find('#recaptchaContato').remove();
            console.log($(document).find('#recaptchaContato'))
            $('#frmContato').append("<div id='recaptchaContato'></div>");
			
			e.preventDefault();
            console.log("validation success");
            if (typeof widgetId3 != 'undefined')
            	grecaptcha.reset(widgetId3);
            
            if (demo3Call == 1)
            {
            	widgetId3 = grecaptcha.render('recaptchaContato', {
                	'sitekey': $key,
                    'callback': contato,
                    'size': "invisible"
                });
            }

            grecaptcha.reset(widgetId3);
			
			grecaptcha.execute(widgetId3);
            console.log('show');
        }
    });

}

function login(token) {

    var usuario      = $("#usuario").val();
    var senha            = $("#senha").val();

    var payload = {
        usuario: usuario,
        senha: senha,
        token: token
    }
  
    
    $.ajax({
        method : "POST",
        url : "./auth",
        data : payload,
        timeout: 8000,
    })
    .done(function(res) {

        if (res.error == true) {
            
            if (res.msg) {
                var msg = res.msg;
            } else {
                var msg = 'Usuario ou senha invalidos';
            }

        
            $('#alertt').show();
            $('#alertt').addClass('alert-danger');
            $('#message-alert').html('<strong>Ops!</strong> ' + msg);           
        
        } else {

            if (res.token) {
                console.log('usuario ok, redirecionar para painel.');
                $('#alertt').removeClass("alert-danger");
                $('#alertt').show();
                $('#alertt').addClass('alert alert-success');
                $('#message-alert').html('Aguarde, redirecionando...');
                document.cookie = 'token=' + res.token;
                document.location = './Painel';
            } else {
   
                if (res.msg) {
                    var msg = res.msg;
                } else {
                    var msg = 'Usuario ou senha invalidos';
                }

            
                $('#alertt').show();
                $('#alertt').addClass('alert-danger');
                $('#message-alert').html('<strong>Ops!</strong> ' + msg);           

            }
        }

    })
    .fail(function() {

        $('#alertt').show();
        $('#alertt').addClass('alert-warning');
        $('#message-alert').html('<strong>Ops!</strong> Sistema indisponivel, tente novamente em breve.');    
        console.log('error ao buscar dados, demorou mais de 8s.....');

    });
  

}


function main() {
    setTimeout(function() {
        $.get('js/tpls/login.html', function(template) {

            var rendered = Mustache.render(template);
            $('#app').html(rendered);
			loadcaptcha();
        });
    }, 1);
}


function loadmain() {
    if (checkHash()  == undefined) {
        main();
   }else{
        checkHash();
   }
}

function checkHash() {
    if(window.location.hash != hash) { 
        hash = window.location.hash; 
        processHash(hash); 
    } t=setTimeout("checkHash()",400); 
}

function processHash(hash) {
    switch (hash) {
        case "":
            alert('index');
            break;
        case "#Logue-se":
            main();
            break;
        case "#RecPass":
            loadEsqueceuSenha();
            break;
        case "#Contato":
            loadFaleConosco();
            break;
        default:
            notfound();
    }
}

