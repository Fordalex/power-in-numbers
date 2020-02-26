function checkForm(form)
        {
          if(form.username.value == "") {
            $('#pwd_incorrect_message').text("Username cannot be blank!");
            form.username.focus();
            return false;
          }
          re = /^\w+$/;
          if(!re.test(form.username.value)) {
            $('#pwd_incorrect_message').text("Username must contain only letters, numbers and underscores!");
            form.username.focus();
            return false;
          }
      
          if(form.pwd1.value != "" && form.pwd1.value == form.pwd2.value) {
            if(form.pwd1.value.length < 6) {
              $('#pwd_incorrect_message').text("Password must contain at least six characters!");
              form.pwd1.focus();
              return false;
            }
            if(form.pwd1.value == form.username.value) {
              $('#pwd_incorrect_message').text("Password must be different from Username!");
              form.pwd1.focus();
              return false;
            }
            re = /[0-9]/;
            if(!re.test(form.pwd1.value)) {
              $('#pwd_incorrect_message').text("Password must contain at least one number (0-9)!");
              form.pwd1.focus();
              return false;
            }
            re = /[a-z]/;
            if(!re.test(form.pwd1.value)) {
              $('#pwd_incorrect_message').text("Password must contain at least one lowercase letter (a-z)!");
              form.pwd1.focus();
              return false;
            }
            re = /[A-Z]/;
            if(!re.test(form.pwd1.value)) {
              $('#pwd_incorrect_message').text("Password must contain at least one uppercase letter (A-Z)!");
              form.pwd1.focus();
              return false;
            }
          } else {
            $('#pwd_incorrect_message').text("Please check that you've entered and confirmed your password!");
            form.pwd1.focus();
            return false;
          }
      
          return true;
        }
      