let user = (new URLSearchParams(window.location.search)).get('username');

if (!user) {
    window.location.href = '/login';
}


window.addEventListener('load', async () => {
    const result = await fetch('http://localhost:6070/api/auth/v1/getMeals');
    const response = await result.json();
    console.log(response);

    const row = document.querySelector('.content');

    let contents = '';
    response.meal.forEach(meal => {
        contents += `
            <div class="col">
                <div class="meal" id=${meal.id}>
                    <img class="meal-image" src="${meal.image}">
                    <div class="meal-info">
                        <p class="meal-name">${meal.name}</p>
                        <p class="meal-price">$${meal.price}</p>
                        <p class="meal-description">${meal.description}</p>
                    </div>
                </div>
            </div>
        `;
        row.innerHTML = contents;
    });
});