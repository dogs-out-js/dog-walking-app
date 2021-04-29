const acceptBtns = document.querySelectorAll("#accept");
console.log(acceptBtns);

acceptBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        console.log("click");
        // Walker.find()
        //     .then(walker => console.log("walker", walker));
        const action = 'accept';
        const someId = event;
        console.log("someId", someId);
        
    })
})

//find request
//change accepted to true;

//const requestId = 
Request.findByIdAndUpdate(requestId, {accepted: accepted}, {new: true})
        .then((updatedRequest) => {
            console.log(updatedRequest);
        })