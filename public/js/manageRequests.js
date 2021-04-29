// const Walker = require("../../models/Walker");
import{Walker} 



const acceptBtns = document.querySelectorAll("#accept");
console.log(acceptBtns);

acceptBtns.forEach(button => {
    button.addEventListener('click', () => {
        console.log("click");
        Walker.find()
            .then(walker => console.log("walker", walker));
    })
})