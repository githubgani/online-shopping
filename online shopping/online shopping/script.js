let phones = JSON.parse(localStorage.getItem('phones')) || [];

const phoneNameInput = document.getElementById('phone-name');
const phonePriceInput = document.getElementById('phone-price');
const addPhoneBtn = document.getElementById('add-phone-btn');
const shoppingTableBody = document.getElementById('shopping-table-body');

addPhoneBtn.addEventListener('click', function() {
    const phoneName = phoneNameInput.value;
    const phonePrice = Number(phonePriceInput.value);

    if (phoneName === '') {
        alert('Please enter a phone name');
        return;
    }
    if (isNaN(phonePrice) || phonePrice <= 0) {
        alert('Please enter a valid price');
        return;
    }

    const phone = { phoneName, phonePrice };
    phones.push(phone);
    localStorage.setItem('phones', JSON.stringify(phones));
    renderPhones();
    clearInputs();
});

function renderPhones() {
    shoppingTableBody.innerHTML = '';
    phones.forEach((phone, index) => {
        const newRow = shoppingTableBody.insertRow();
        
        const phoneNameCell = newRow.insertCell();
        const phonePriceCell = newRow.insertCell();
        const buyCell = newRow.insertCell();

        phoneNameCell.textContent = phone.phoneName;
        phonePriceCell.textContent = phone.phonePrice.toFixed(2);

        const buyButton = document.createElement('button');
        buyButton.textContent = 'Buy';
        buyButton.classList.add('buy-btn');
        buyButton.addEventListener('click', function() {
            alert(`You have bought ${phone.phoneName} for $${phone.phonePrice.toFixed(2)}`);
            phones.splice(index, 1);
            localStorage.setItem('phones', JSON.stringify(phones));
            renderPhones();
        });

        buyCell.appendChild(buyButton);
    });
}

function clearInputs() {
    phoneNameInput.value = '';
    phonePriceInput.value = '';
}

// Initially render any existing phones (if any)
renderPhones();
