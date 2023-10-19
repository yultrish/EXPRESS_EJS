const loginForm = document.querySelector('.submit');

    loginForm.addEventListener('click', async function (e) {
      e.preventDefault(); // Prevent the default form submission
      console.log('is clicked')

      // Get form input values
      const username = document.querySelector('#login-username').value;
      const email = document.querySelector('#login-email').value;
      // const password = document.querySelector('#login-password').value;

      // Create an object to hold the form data
      const formData = {
        username,
        email,
        // password,
      };

      // Make a POST request to the server
      try {
        const response = await fetch('http://localhost:6070/api/auth/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: username,
              email: email,
              // password: password
          }),
        });

        if (response.status === 200) {
          const data = await response.json();
          console.log(data)
          alert('successfuly login'); 
          window.location.href = '/home?username=yultrish';
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    });   



const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
	item.addEventListener('click', function() {
		switchers.forEach(item => item.parentElement.classList.remove('is-active'))
		this.parentElement.classList.add('is-active')
	})
})


// const loginForm = document.querySelector('.form-login');

//     loginForm.addEventListener('submit', async function (e) {
//       e.preventDefault(); // Prevent the default form submission

//       // Get form input values
//       const username = document.querySelector('#login-username').value;
//       const email = document.querySelector('#login-email').value;
//       const password = document.querySelector('#login-password').value;

//       // Create an object to hold the form data
//       const formData = {
//         username,
//         email,
//         password,
//       };

//       // Make a POST request to the server
//       try {
//         const response = await fetch('http://localhost:6070/api/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         });

//         if (response.status === 200) {
//           // Successful login
//           const data = await response.json();
//           alert(data.message); // Display a success message
//           // Redirect or perform other actions as needed
//         } else {
//           // Failed login
//           const data = await response.json();
//           alert(data.message); // Display an error message
//         }
//       } catch (error) {
//         console.error('Network error:', error);
//       }
//     });
  
