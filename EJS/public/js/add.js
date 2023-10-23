
const uploadButton = document.querySelector("input[type=file]");

uploadButton.addEventListener("change", async (event) => {
    try {
         alert("attempting to upload to image file")
    let fileImage =  event.target.files[0];
    if(!fileImage){
        return alert("no file selected")
    }

    const formData = new FormData();
    formData.append("file", fileImage);
    let server =  await fetch('http://localhost:7070/store-image', {
        method : 'POST',
        headers: {
           Accept: "application/octet-stream",
        },
        body:  formData
    
    })//fetch api ends here

        if(server.status == 200){
        const response = await server.json()
            console.log(response)

            //submit product details
            const name = document.querySelector('input#MealtName').value;
            const description = document.querySelector('input#description').value;
            const Vegetarian = document.querySelector('input#vegetarian').value;
            const price = document.querySelector('input#price').value;

            let result =  await fetch('http://localhost:6070/api/auth/v1/createMeals', {
                method : 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body:  JSON.stringify({
                    name: name,
                    description : description,
                    Vegetarian: Vegetarian,
                    price: price,
                    filename: response.filename
                })
            
            })
            const res = result.json();
            console.log(res)

        }

    } catch(err) {
        console.log(err)
     } 
});

const addBtn = document.querySelector('.addProduct')
addBtn.addEventListener('click', async () => {
    window.location.href = window.location.href;

})


 
    