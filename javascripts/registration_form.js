let rootURL = 'http://localhost:3000/api/v1/signature_registrations';

let form = document.getElementById('signature-registration-form');

let formStatus = document.getElementById('registration-form-alert');

// Append the form status

form.onsubmit = function (e) {
  e.preventDefault();

  const data = {
    registration: {
      name: form.getElementByName('name')
    }
  };

  //  for (let i = 0, ii = form.length; i < ii; ++i) {
  //   let input = form[i];
  //   if (input.name) {
  //     data[input.name] = input.value;
  //   }
  // }


  console.log('----------------');
  console.log(data);

  // Construct an HTTP request
  let xhr = new XMLHttpRequest();
  xhr.open('POST', rootURL);
  xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  // Send the collected data as JSON
  xhr.send(JSON.stringify(data));

  // Callback function
  xhr.onloadend = function (response) {
    let responseBody = response.target;
    let responseStatus = responseBody.status;
    let responseContent = JSON.parse(responseBody.response);

    if (responseStatus === 0) {
      // Failed XmlHttpRequest should be considered an undefined error.
      formStatus.className += ' alert-danger';
      formStatus.innerHTML = form.dataset.formError;

    } else if (responseStatus === 400) {
      // Bad Request
      formStatus.className += ' alert-danger';
      formStatus.innerHTML = responseContent.error;

    } else if (responseStatus === 200) {
      // Success
      formStatus.className += ' alert-success';
      formStatus.innerHTML = form.dataset.formSuccess;

    }
  };
};