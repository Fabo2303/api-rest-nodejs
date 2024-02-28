let lenght_usuario = 0;

window.addEventListener('load', async () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let data = await response.json();
      addRowsUsuarios(data);
    }
    catch (error) {
      console.error('Error fetching data:', error);
      const tdUsuario = document.getElementById('td-usuario');
      //eliminar los id = user role pass de tdUsuario
      tdUsuario.removeChild(document.getElementById('user'));
      tdUsuario.removeChild(document.getElementById('role'));
      tdUsuario.removeChild(document.getElementById('pass'));
      tdUsuario.removeChild(document.getElementById('add-user'));
      const tdText = document.createElement('td');
      tdText.textContent = 'No tienes permisos para ver esta información';
      tdUsuario.appendChild(tdText);
    }
  }
});

window.addEventListener('load', async () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    try {
      const response = await fetch('http://localhost:3000/api/productos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let data = await response.json();
      addRowsProductos(data);
    }
    catch (error) {
      console.error('Error fetching data:', error);
      const tdProducto = document.getElementById('td-producto');
      tdProducto.removeChild(document.getElementById('nombre'));
      tdProducto.removeChild(document.getElementById('precio'));
      tdProducto.removeChild(document.getElementById('add-producto'));
      const tdText = document.createElement('td');
      tdText.textContent = 'No tienes permisos para ver esta información';
      tdProducto.appendChild(tdText);
    }
  }
})

document.getElementById('add-user').addEventListener('click', async () => {
  console.log('click');
  try {
    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;
    const role = document.getElementById('role').value;
    const token = localStorage.getItem('jwt');
    const response = await fetch('http://localhost:3000/api/usuarios', {
      method: 'POST',
      body: JSON.stringify({ username, password, role }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    window.location.reload;
  } catch (error) {
    console.error('Error:', error);
  }
})

document.getElementById('add-producto').addEventListener('click', async () => {
  console.log('click');
  try {
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const token = localStorage.getItem('jwt');
    const response = await fetch('http://localhost:3000/api/productos', {
      method: 'POST',
      body: JSON.stringify({ nombre, precio }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    window.location.reload;
  } catch (error) {
    console.error('Error:', error);
  }
})

function addRowsProductos(data) {
  const table = document.getElementById('productos');

  data.forEach(producto => {
    const row = document.createElement('tr');
    row.id = `producto-${producto.id}`;

    const cell1 = document.createElement('td');
    cell1.textContent = producto.nombre;

    const cell2 = document.createElement('td');
    cell2.textContent = producto.precio;

    const deleteButton = document.createElement('button');
    deleteButton.id = `delete-producto-${producto.id}`;
    deleteButton.textContent = 'Eliminar';
    deleteEvent(deleteButton, 'productos');

    const cell3 = document.createElement('td');
    cell3.appendChild(deleteButton);

    const modifyButton = document.createElement('button');
    modifyButton.id = `modify-producto-${producto.id}`;
    modifyButton.textContent = 'Modificar';
    modifyProduct(modifyButton);

    const cell4 = document.createElement('td');
    cell4.appendChild(modifyButton);

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);

    table.appendChild(row);
  });
}

function addRowsUsuarios(data) {
  const table = document.getElementById('usuarios');

  data.forEach(usuario => {
    const row = document.createElement('tr');
    row.id = `usuario-${usuario.id}`;

    const cell1 = document.createElement('td');
    cell1.textContent = usuario.username;

    const cell2 = document.createElement('td');
    cell2.textContent = usuario.role;

    const deleteButton = document.createElement('button');
    deleteButton.id = `delete-usuario-${usuario.id}`;
    deleteButton.textContent = 'Eliminar';
    deleteEvent(deleteButton, 'usuarios');

    const cell3 = document.createElement('td');
    cell3.appendChild(deleteButton);

    const modifyButton = document.createElement('button');
    modifyButton.id = `modify-usuario-${usuario.id}`;
    modifyButton.textContent = 'Modificar';
    modifyUsuario(modifyButton);

    const cell4 = document.createElement('td');
    cell4.appendChild(modifyButton);

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);

    table.appendChild(row);
  });
}



function deleteEvent(button, url) {
  button.addEventListener('click', async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`http://localhost:3000/api/${url}/${button.id.split('-')[2]}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      window.location.reload;
    } catch (error) {
      console.error('Error:', error);
    }
  });
}

function modifyUsuario(button) {
  button.addEventListener('click', async () => {
    try {
      const username = document.getElementById('user').value;
      const password = document.getElementById('pass').value;
      const role = document.getElementById('role').value;
      const token = localStorage.getItem('jwt');
      console.log(username, password, role);
      const response = await fetch(`http://localhost:3000/api/usuarios/${button.id.split('-')[2]}`, {
        method: 'PATCH',
        body: JSON.stringify({ username, password, role }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      window.location.reload;
    } catch (error) {
      console.error('Error:', error);
    }
  });
}

function modifyProduct(button) {
  button.addEventListener('click', async () => {
    try {
      const nombre = document.getElementById('nombre').value;
      const precio = document.getElementById('precio').value;
      const token = localStorage.getItem('jwt');
      console.log(nombre, precio);
      const response = await fetch(`http://localhost:3000/api/productos/${button.id.split('-')[2]}`, {
        method: 'PATCH',
        body: JSON.stringify({ nombre, precio }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      window.location.reload;
    } catch (error) {
      console.error('Error:', error);
    }
  });
}