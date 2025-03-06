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


                          const form = document.getElementById('addMeasurementForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        fetch('/measurements', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                alert('Measurement added successfully!');
                form.reset();
            })
            .catch(error => console.error('Error adding measurement:', error));
    });
});
