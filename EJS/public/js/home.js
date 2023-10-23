window.addEventListener('load', async ()=> {
    let user = new URLSearchParams(window.location.search).get('username');

    if (!user) {
        window.location.href = '/login';
    }

    // Function to render meals
    const renderMeals = async () => {
        try {
            const response = await fetch('http://localhost:6070/api/auth/v1/getMeals');

            if (response.ok) {
                const data = await response.json();
                const meals = data.meal;

                const productList = document.querySelector('.row');

                meals.forEach(meal => {
                    const productItem = document.createElement('div');
                    productItem.classList.add('col-4');
                    productItem.innerHTML = `
                    <div class="meal-list">
                        <img src="${meal.image}" alt="${meal.name}" />
                        <div class="text">
                        <div class="name-price">
                        <h4>${meal.name}</h4>
                        <h4 class="price">$${meal.price}</h4>
                        </div>
                        <p>${meal.description}</p>
                        <button class="add-to-order" id="${meal.id}">Order</button>

                        
                        </div>
                        </div>
                        
                    `;

                    productList.appendChild(productItem);
                });

                // Add event listeners to the "Add to Cart" buttons
                const orderBtn = document.querySelectorAll('.add-to-order');

                orderBtn.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        const mealId = e.target.id;
                        addToOrder(mealId);
                    });
                });
            } else {
                console.error('Network error:', response.status);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    // Function to add a meal to the cart
    const addToOrder = async (mealId) => {
        const searchParams = new URLSearchParams(window.location.search);
        const username = searchParams.get('username');

        try {
            const response = await fetch('http://localhost:6070/api/auth/Order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ meal_id: mealId, username: username })
            });

            if(response.status===409){
                const data = await response.json();
                console.log(data);
                
                alert(`${data.message}`)
            }

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                displayOrder();
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    // Function to show the user's order list
    const displayOrder = async () => {
        let orderList = document.querySelector('.order-container');
        const searchParams = new URLSearchParams(window.location.search);
        const username = searchParams.get('username');

        try {
            const result = await fetch(`http://localhost:6070/api/auth/allOrders/${username}`);

            if (result.status === 200) {
                const results = await result.json();
                const { orders } = results;

                 orderList.innerHTML = '';

                orders.forEach(order => {
                    orderList.innerHTML += `
                        <div class="order-list">
                            <h3>${order.name}</h3>
                            <h3>1</h3>
                            <h3 class="ItemPrices">$${order.price}</h3>
                            <span class="material-symbols-outlined delete" id="${order.id}">delete</span>
                        </div>
                    `;
                });

                // orderList.innerHTML = outputHTML;
                deleteOrder();
                calculateTotalPrice();
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    // Function to delete an order
    const deleteOrder = () => {
        const deleteBtn = document.querySelectorAll('.delete');

        deleteBtn.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                let id = e.target.id;
                let confirmed = confirm(`Are you sure you want to delete order ${id}`);

                if (confirmed === true) {
                    try {
                        const result = await fetch(`http://localhost:6070/api/auth/deleteOrder/${id}`, {
                            method: 'DELETE'
                        });

                        if (result.status === 200) {
                            const user = e.target.parentElement;
                            user.classList.add('remove-fading');
                            user.addEventListener('transitionend', () => {
                                user.remove();
                            });
                            displayOrder()
                            calculateTotalPrice();
                            displayOrder();
                        }
                    } catch (error) {
                        console.error('An error occurred:', error);
                    }
                }
            });
        });
    };


    // Function to cancel all orders
    const cancelAllOrders = async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const username = searchParams.get('username');

        try {
            const response = await fetch(`http://localhost:6070/api/auth/deleteAllOrders`, {
                method: 'DELETE'
            });

            if (response.status === 200) {
                alert('All orders have been canceled.');
                const items = document.querySelectorAll('.order-list');
                items.forEach(item => {
                    item.classList.add('remove-fading');
                });
                displayOrder();
                location.reload()
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    // Add a click event listener to the "Cancel All Orders" button
    const cancelButton = document.querySelector('.cancel');
    cancelButton.addEventListener('click', () => {
        const confirmed = confirm('Are you sure you want to cancel all orders?');
        if (confirmed) {
            cancelAllOrders();
        }

        
    });


    // Function to calculate the total price
    const calculateTotalPrice = () => {
        const total = document.querySelector('.total');
        const itemPrices = document.querySelectorAll('.ItemPrices');

        const prices = Array.from(itemPrices).map(price => {
            const numericPart = price.textContent.replace('$', '');
            return parseFloat(numericPart);
        });

        const totalPrice = prices.reduce((total, price) => total + price, 0).toFixed(2);
        total.innerHTML = `Total: $${totalPrice}`;
    };

    // Initialize the page
    renderMeals();
    displayOrder();

})


// document.querySelector('.addProduct').addEventListener('click', async () => {
//     const mealData = {
//         date: document.querySelector('#date').value,
//         mealName: document.querySelector('#mealName').value,
//         description: document.querySelector('#description').value,
//         price: document.querySelector('#price').value,
//         // vegetarian: document.querySelector('#vegetarian').value, // Uncomment if needed
//     };

//     // Read the selected image file and convert it to a base64-encoded string
//     const imageFile = document.querySelector('#image').files[0];
//     if (imageFile) {
//         const reader = new FileReader();
//         reader.onload = function () {
//             mealData.image = reader.result; // Set the image field as a base64-encoded string
//             sendDataToServer(mealData);
//         };
//         reader.readAsDataURL(imageFile);
//     } else {
//         mealData.image = ''; // No image selected, set it as an empty string
//         sendDataToServer(mealData);
//     }
// });

// async function sendDataToServer(mealData) {
//     try {
//         const response = await fetch('http://localhost:6070/api/auth/v1/createMeal', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json', // Set the content type to JSON
//             },
//             body: JSON.stringify(mealData), // Send mealData as JSON
//         });

//         if (response.ok) {
//             const data = await response.json();
//             console.log('Meal posted successfully:', data);
//         } else {
//             throw new Error('Failed to post meal.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }