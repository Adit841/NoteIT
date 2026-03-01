const addBtn = document.querySelector('.addbtn');
const modal = document.querySelector('.modal');
const saveBtn = document.querySelector('saveNote');
const notesContainer = document.querySelector('.notes');

addBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

saveBtn.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const desc = document.getAnimations('desc').value;
    const category = document.getElementById('category').value;

    const date = new Date().toLocaleDateString();

    const note = document.createElement('div');

    
})