const clientSectionSelect = document.querySelector('.client-section_select');
const email = document.querySelector('.client-section_email');
const firstname = document.querySelector('.client-section_name')
const sumbitOrdeButton = document.querySelector('.client-section_sumbit-order-button');
const clientSection = document.querySelector('.client-section');
const deliveryPLaceSelect = document.querySelector('.delivery-place-section_select');

let clientAdress;

clientSectionSelect.addEventListener('change', () => {
    if (document.querySelector('.point-section')) {
        document.querySelector('.point-section').style.display = 'none';
    }
    if (clientSectionSelect.value === 'Курьерская доставка') {
        clientSection.insertAdjacentHTML('beforeend',
            `
                <div class="delivery-place-section">
                    <p class="delivery-place-section_p">Укажите адрес доставки</p>
                    <input type="text" name="delivery-adress" class="delivery-place-section_adress">
                </div>
            `
        );
        const deliveryPlaceAdress = document.querySelector('.delivery-place-section_adress');
        clientAdress = deliveryPlaceAdress;
    } 

    if (clientSectionSelect.value === 'Точка выдачи') {
        if (document.querySelector('.delivery-place-section')) {
            document.querySelector('.delivery-place-section').style.display = 'none';
        }
        fetch('/api/points')
            .then(
                (response) => {
                    return response.json();
                }
            )
            .then(
                (result) => {
                    clientSection.insertAdjacentHTML('afterend', 
                        `
                            <div class="point-section">
                                <p class="point-section-p">Выберите пункт выдачи</p>
                                <select class="point-section_select"></select>
                            </div>
                        `
                    );
            
                    const pointSectionSelect = document.querySelector('.point-section_select');
                    let options = [];
            
                    for (let i = 0; i < result.length; i++) {
                        options[i] = document.createElement('option');
                        options[i].value = result[i].id;
                        options[i].text = result[i].adress;
                        pointSectionSelect.appendChild(options[i]);
                    }
                    clientAdress = pointSectionSelect;
                }
            )
    } 
});

sumbitOrdeButton.addEventListener('click', () => {
    fetch('/api/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstname: firstname.value,
            email: email.value,
            clientSectionSelect: clientSectionSelect.value,
            adress: clientAdress.value,
        })
    });
});

