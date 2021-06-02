function showRegisterForm(){
	$('.loginBox,.forgotPasswordBox').fadeOut('fast',function(){
		$('.registerBox').fadeIn('fast');
		$('.login-footer').fadeOut('fast',function(){
			$('.register-footer,.forgot-password-footer').fadeIn('fast');
		});
		$('.modal-title').html('Đăng ký');
	}); 
	$('.error').removeClass('alert alert-danger').html('');
}
function showForgotPasswordForm(){
  $('.loginBox,.registerBox').fadeOut('fast',function(){
    $('.forgotPasswordBox').fadeIn('fast');
    $('.forgot-password-footer').fadeOut('fast',function(){
      $('.register-footer,.login-footer').fadeIn('fast');
    });
    $('.modal-title').html('Quên mật khẩu');
  });
  $('.error').removeClass('alert alert-danger').html('');
}
function showLoginForm(){
	$('#loginModal .registerBox,.forgotPasswordBox').fadeOut('fast',function(){
		$('.loginBox').fadeIn('fast');
		$('.register-footer').fadeOut('fast',function(){
			$('.login-footer,.forgot-password-footer').fadeIn('fast');    
		});
		
		$('.modal-title').html('Đăng nhập');
	});       
	 $('.error').removeClass('alert alert-danger').html(''); 
}

function openLoginModal(){
	showLoginForm();
	setTimeout(function(){
		$('#loginModal').modal('show');    
	}, 230);
	
}
function openForgotPasswordModal(){
  showForgotPasswordForm();
  setTimeout(function(){
    $('#loginModal').modal('show');
  }, 230);
}
function openRegisterModal(){
	showRegisterForm();
	setTimeout(function(){
		$('#loginModal').modal('show');    
	}, 230);
	
}