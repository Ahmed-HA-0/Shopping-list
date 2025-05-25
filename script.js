const form = document.getElementById('item-form');
const itemInput = document.querySelector('.form-input');
const searchText = document.querySelector('.form-input-filter');
const lists = document.querySelector('.items');
const clearBtnItems = document.querySelector('.btn-clear');
const btnForm = document.querySelector('.btn');
let isEdit = false;

function onDisplayFromStorage() {
  const itemfromStorage = fetchItemFromStorage();

  itemfromStorage.forEach((item) => {
    addItemToDom(item);
    checkUI();
  });
}

function onAddItemInput(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  if (newItem === '') {
    alert('Please fill in the filed');
    return;
  }

  if (isEdit) {
    const editModeClass = document.querySelector('.edit-mode');
    removeItemFromStorage(editModeClass.textContent);
    editModeClass.classList.remove('edit-mode');
    editModeClass.remove();
    isEdit = false;
  } else if (isItemAlreadyExists(newItem)) {
    alert('Item already exists!');
    return;
  }

  addItemToDom(newItem);
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = '';
}

function addItemToDom(item) {
  const li = document.createElement('li');
  li.textContent = item;

  const button = createDeleteButton('remove-item btn-link text-red');
  li.appendChild(button);

  // Using the <ul> tag to add the <li>
  lists.appendChild(li);
}

function onSearchTextInput() {
  const listItems = document.querySelectorAll('.items li');
  const filterText = searchText.value.toLowerCase();

  listItems.forEach((list) => {
    const listText = list.textContent.toLowerCase();

    if (listText.includes(filterText)) {
      list.style.display = 'flex';
    } else {
      list.style.display = 'none';
    }
  });
}

function onClickItem(e) {
  const element = e.target;

  if (element.parentElement.classList.contains('remove-item')) {
    removeItem(element.parentElement.parentElement);
  } else if (e.target.tagName === 'LI') {
    setItemToEdit(element);
  }
}

function setItemToEdit(item) {
  isEdit = true;
  const lists = document.querySelectorAll('#item-list li');
  lists.forEach((item) => item.classList.remove('edit-mode'));
  item.classList.add('edit-mode');
  btnForm.style.backgroundColor = 'green';
  btnForm.innerHTML = '<i class = "fa-solid fa-pen"></i> Update Item ';
  itemInput.value = item.textContent;
}

function isItemAlreadyExists(item) {
  const itemfromStorage = fetchItemFromStorage();
  return itemfromStorage.includes(item) ? true : false;
}

function removeItem(item) {
  if (confirm('Are you sure you want to delete the item?')) {
    item.remove();
  }

  removeItemFromStorage(item.textContent);

  checkUI();
}
function onDeleteItems() {
  const lists = document.querySelector('.items');

  while (lists.firstChild) {
    lists.removeChild(lists.firstChild);
  }

  localStorage.removeItem('item');

  checkUI();
}

function addItemToStorage(item) {
  const itemfromStorage = fetchItemFromStorage();
  itemfromStorage.push(item);
  localStorage.setItem('item', JSON.stringify(itemfromStorage));
}

function removeItemFromStorage(item) {
  let itemfromStorage = fetchItemFromStorage();

  itemfromStorage = itemfromStorage.filter((i) => i !== item);

  localStorage.setItem('item', JSON.stringify(itemfromStorage));
}

function fetchItemFromStorage() {
  let itemfromStorage;

  if (localStorage.getItem('item') === null) {
    itemfromStorage = [];
  } else {
    itemfromStorage = JSON.parse(localStorage.getItem('item'));
  }

  return itemfromStorage;
}

function createDeleteButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function checkUI() {
  const listItems = document.querySelectorAll('.items li');

  if (listItems.length === 0) {
    searchText.style.display = 'none';
    clearBtnItems.style.display = 'none';
  } else {
    searchText.style.display = 'block';
    clearBtnItems.style.display = 'block';
  }

  btnForm.style.backgroundColor = 'black';
  btnForm.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';

  isEdit = false;
}

function init() {
  // Event Listeners
  form.addEventListener('submit', onAddItemInput);
  searchText.addEventListener('input', onSearchTextInput);
  lists.addEventListener('click', onClickItem);
  clearBtnItems.addEventListener('click', onDeleteItems);
  document.addEventListener('DOMContentLoaded', onDisplayFromStorage);

  checkUI();
}
init();
