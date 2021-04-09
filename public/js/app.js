const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const pElement1 = document.getElementById("ui_msg_1");
const pElement2 = document.getElementById("ui_msg_2");


weatherForm.addEventListener('submit',(e) => {
  e.preventDefault();
  pElement1.innerHTML= 'Loading...';      
  pElement2.innerHTML= '';      
  const location = searchElement.value;
  if (location) {
    fetch(`/weather?address=${location}`).then((response) => {
      const res = response.json();
      pElement2.innerHTML="";
      res.then((data) => {
        if (data.error) {
          pElement1.innerHTML= '';
          pElement2.innerHTML= data.error;
        } else {
          pElement1.innerHTML= data.location;
          pElement2.innerHTML= data.forecast;
        }
      });
    });
  } else {
    pElement1.innerHTML= '';
    pElement2.innerHTML="Please enter location";
  }
})