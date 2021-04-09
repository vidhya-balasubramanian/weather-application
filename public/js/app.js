console.log("Client side javascript loaded!");



const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");

weatherForm.addEventListener('submit',(e) => {
  e.preventDefault();
  const location = searchElement.value;
  if (location) {
    fetch(`/weather?address=${location}`).then((response) => {
      const res = response.json();
      res.then((data) => {
        if (data.error) {
          console.log('Error ' + data.error)
        } else {
          console.log(data)
        }
      });
    });
  } else {
    alert('Please enter location')
  }
})