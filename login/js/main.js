

function setCookie(uid,value,exp_days) {
    var d = new Date();
    d.setTime(d.getTime() + (exp_days*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookies = uid + "=" + value + ";" + expires + ";path=/";
}

(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(event){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        var formData = {
            user: $("#User").val(),
            pass: $("#pass").val(),
          };

        $.ajax({
            type: "GET",
            url: "https://healthconnect-server.herokuapp.com/login",
            crossDomain: true,
            data: formData,
            dataType: "json",
            encode: true,
          }).done(function (data) {
            console.log(data.patient[0]._id);
            sessionStorage.setItem('uid',data.patient[0]._id);
            //setCookie("uid", data.patient[0]._id, 1);
            location.href = "../dashboard/patient/"
          }).fail(function (data) {
            for(var i=0; i<input.length; i++) {
                showValidate(input[i]);
                check=false;

            }
          });
      
          event.preventDefault();

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if((!$(input).attr('type') == 'text') || (!$(input).attr('name') == 'password')) {
            return true;
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }
        
    });


})(jQuery);