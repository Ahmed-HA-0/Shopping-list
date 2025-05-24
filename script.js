const form = document.getElementById('item-form');
const addItemBtn = document.querySelector('.btn');
const inputFilter = document.querySelector('.form-input');
const lists = document.querySelector('.items');
const clrAllBtn = document.querySelector('.btn-clear');

const addItem = (e) => {
  e.preventDefault();
  const newItem = inputFilter.value;
  if (newItem === '') {
    alert('Please fill in the input');
    return;
  }

  const li = document.createElement('li');
  li.textContent = newItem;
  const btnClear = buttonX('remove-item btn-link text-red');
  li.appendChild(btnClear);

  lists.appendChild(li);
  inputFilter.value = '';
};

const buttonX = (classes) => {
  const btnClear = document.createElement('button');
  btnClear.className = classes;
  const i = createIcon('fa-solid fa-xmark');
  btnClear.appendChild(i);
  return btnClear;
};

const createIcon = (classes) => {
  const i = document.createElement('i');
  i.className = classes;
  return i;
  // nothing
};

// Event Listeners
form.addEventListener('submit', addItem);
