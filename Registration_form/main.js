$(function() {
  $.validator.addMethod('strongPassword',function(value,element) {
    return this.optional(element) || value.length >= 6 && /\d/.test(value);
  }, "Your password must be 6 characters long and contain atleast one number");
  $.validator.addMethod('numberVerify',function(value,element) {
    return this.optional(element) || value.length == 12 && value.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
  }, "Please specify a valid phone number");

  $("#register").validate({
    rules:{
      first_name: {
        required: true,
        nowhitespace: true
      },
      last_name:"required",
      password1: {
        required: true,
        strongPassword: true
      },
      password2: {
        required: true,
        equalTo: "#password1"
      },
      street: {
        required: true,
        minLength: 6,
        maxLength: 50,
      },
      additional: {
        required: true,
        minLength: 6,
        maxLength: 50,
      },
      zip:"required",
      code: "required",
      phone: {
        required: true,
        numberVerify: true
      },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      password1: {
        required: "Please give the password",
        strongPassword: "Your password must be 6 characters long and contain atleast one number"
      },
      password2: {
      required: "Please give the password",
      equalTo: "Please enter the same password as above"
      },
      street: "Please enter your address",
      additional: "Please enter your additional information",
      phone: {
      required: "Please enter your phone number",
      numberVerify: "Please enter a valid number"
      },
      email:{
      required: "Please enter your email",
      email: "Please enter a valid email"
    }
    }
  });
})

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
