const acceptBtns = document.querySelectorAll("#accept");
console.log(acceptBtns);

acceptBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        console.log("click");
        // Walker.find()
        //     .then(walker => console.log("walker", walker));
        const action = 'accept';
        const someId = event.target.parentNode;
        console.log("someId", someId);
    })
})