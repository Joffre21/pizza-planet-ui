/**
 * Set the id to query the order
 */

let urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');

fetch(`http://127.0.0.1:5000/order/id/${_id}`)
    .then(response => response.json())
    .then(order => {
        let template = createRowTemplate(order);
        let beverages = [];
        let ingredients = [];
        order['detail'].forEach(element => {
            if(element['beverage_price'] != null)
                beverages.push(element)
        });
        order['detail'].forEach(element => {
            if(element['ingredient_price'] != null)
                ingredients.push(element)
        });
        $("#order").append(template);
        setBeveragesInHTML(beverages);
        setIngredientsInHTML(ingredients);
    });

/**
 * Find the template tag and populate it with the data
 * @param order
 */
function createRowTemplate(order) {
    let template = $("#order-template")[0].innerHTML;
    return Mustache.render(template, order);
}

function setBeveragesInHTML(beveragesList) {
    let message = ""
    beveragesList.map(item => {
        message = message.concat(`<p>${item['beverage']['name']} - \$${item['beverage_price']}</p>`);
    });
    document.getElementById('beverages').innerHTML = message;
}

function setIngredientsInHTML(ingredientList) {
    let message = ""
    ingredientList.map(item => {
        message = message.concat(`<p>${item['ingredient']['name']} - \$${item['ingredient_price']}</p>`);
    });
    document.getElementById('ingredients').innerHTML = message;
}
