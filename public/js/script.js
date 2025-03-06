document.addEventListener('DOMContentLoaded', () => {

    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            const userIdSelect = document.getElementById('userId');
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                userIdSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
