let rootURL = 'http://localhost:3000/api/v1/signature_registrations';

let form = document.getElementById('signature-registration-form');

let formStatus = document.getElementById('registration-form-alert');

// Append the form status

form.onsubmit = function (e) {
  e.preventDefault();

  const data = {
    registration: {
      name: form.elements['registration[name]'].value,
      cpf: form.elements['registration[cpf]'].value,
      email: form.elements['registration[email]'].value,
      order_attributes: {
        phone_model: form.elements['registration[order_attributes][phone_model]'].value,
        imei: form.elements['registration[order_attributes][imei]'].value,
        annual_value: form.elements['registration[order_attributes][annual_value]'].value,
        installments: (form.elements['registration[order_attributes][installments]'].value || 1),
      },
    }
  }

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

    if (responseStatus === 200) {
      formStatus.className += 'form-status alert alert-success';
      formStatus.innerHTML = responseContent.message;
    } else {
      formStatus.className = 'form-status alert alert-danger';
      formStatus.innerHTML = (responseContent.message || responseContent.error);
    }

    alert(responseContent.message || responseContent.error);
  };
};