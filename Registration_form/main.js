var forms = document.querySelectorAll('.form-detail');
for(var i = 0;i< forms.length;i++){
  forms[i].setAttribute('novalidate',true);
}

document.addEventListener('blur',function(event) {
  if(!event.target.form.classList.contains(''))
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
