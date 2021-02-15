
var forms = document.querySelectorAll('.validate');
for(var i = 0;i< forms.length;i++){
  forms[i].setAttribute('novalidate',true);
}

//for validation
var hasError = function(field) {
  if (field.type === 'submit') return;
  var validity = field.validity;
  if (document.getElementById('password1').value ==
    document.getElementById('password2').value) {
    document.getElementById('message').style.color = 'green';
    document.getElementById('message').innerHTML = '';
  } else {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'Not matching';
  }
  if(validity.valid) return;
  if (validity.valueMissing) return 'Please fill out this field.';
  if (validity.typeMismatch) {
    if (field.type ==='email')
      return "Please enter a valid email address.";
  }
  console.log(validity);
  if (validity.tooShort) return 
    'Please lengthen this text ';

  if (validity.tooLong) return 'Please shorten this text to no more than ' 
    + field.getAttribute('maxLength') + ' characters. You are currently using ' 
    + field.value.length + ' characters.';

  if (validity.badInput) return 'Please enter a number.';
  if (validity.patternMismatch) return 'Please match the requested format.';

  return 'The value you entered for this field is invalid.';
};

var showError = function(field,error) {
  field.classList.add('error');
  var id =field.id || field.name;
  if(!id) return;
  var message = field.form.querySelector('.error-message#error-for-' + id );
    if (!message) {
        message = document.createElement('div');
        message.className = 'error-message';
        message.id = 'error-for-' + id;
        field.parentNode.insertBefore( message, field.nextSibling );
    }
    field.setAttribute('aria-describedby', 'error-for-' + id);

    message.innerHTML = error;

    message.style.display = 'block';
    message.style.visibility = 'visible';

};

var removeError = function(field) {
  field.classList.remove('error');
  field.removeAttribute('aria-describedby');
  var id = field.id || field.name;
    if (!id) return;
    var message = field.form.querySelector('.error-message#error-for-' + id + '');
    if (!message) return;

    message.innerHTML = '';
    message.style.display = 'none';
    message.style.visibility = 'hidden';
};

document.addEventListener('blur',function(event) {
  if(!event.target.form.classList.contains('validate'))
    return;

    var error = hasError(event.target);
    if (error) {
        showError(event.target, error);
    }
    removeError(event.target);

},true);

document.addEventListener('submit',function(event) {
  if(!event.target.classList.contains('validate')) return;
  var fields = event.target.elements;
  var error,hasErrors;
  for(var i=0;i<fields.length;i++) {
    error = hasError(fields[i]);
    if (error) {
      showError(fields[i],error);
      if(!hasErrors) {
        hasErrors = fields[i];
      }
    }
  }
  if (hasErrors) {
    event.preventDefault();
    hasErrors.focus();
  }
},false);

const countriesList = document.getElementById("countries");
const statesList = document.getElementById("states");

let countries;
countriesList.addEventListener("change",newCountrySelection);
function newCountrySelection(event)
{
	displayStateInfo(event.target.value);

}
fetch("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json")
.then(res => res.json())
.then(data => initialize(data))
.catch(err => console.log("Error:",err));

function initialize(countriesData) {
	countries = countriesData;
	let options = "";
	countries.forEach(country => options 
		+= `<option value="${country.iso3}">${country.name}
		</option>`);
	countriesList.innerHTML=options;
	// console.log(options);
	displayStateInfo("AFG");
}

function displayStateInfo(countryByiso3) {
  const countryData = countries.find(country =>
   country.iso3 === countryByiso3);
  res = countryData.states;
  let state_options="";
  for(let i = 0;i<res.length;i++) {
  		state_options += `<option value=
  		"${res[i].id}">${res[i].name}</option>`;
  	}
  	console.log(state_options);
  statesList.innerHTML=state_options;
}
