import React, { useState, useCallback, useEffect } from 'react';
import { X, Pencil } from 'lucide-react';
import "primeicons/primeicons.css";
import Swal from 'sweetalert2';
import { register, obtUsers } from '../access-control/utils/useMethods';
import { useNavigate } from 'react-router-dom';
import { sendRegister } from '../access-control/utils/use_connection';
import { Link } from 'react-router-dom';
import Homepage from './../Catalogue-client/homepage';
const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({ nombre: '', telefono: '', correo: '', contrasena: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const getUsers = async () => {
    const users = await obtUsers();
    if (users) {
      setEmployees(users);
    }
  }

  const SendRegister = async () => {
    const data = {
      name: "prueba",
      lastName: 'prueba',
      secondLastName: 'dos',
      email: "mklmlk",
      password: "123456",
      type: 'EMPLOYEE_ROLE'
    }
    await register({ data, navigate })

  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = () => {
    if (editingEmployee) {
      setEmployees(employees.map(emp => emp.id === editingEmployee.id ? { ...newEmployee, id: emp.id } : emp));
      Swal.fire({
        title: 'Empleado Actualizado',
        text: 'Los datos del empleado fueron actualizados correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } else {
      setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }]);
      Swal.fire({
        title: 'Empleado Registrado',
        text: 'El nuevo empleado fue registrado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    }
    setNewEmployee({ nombre: '', telefono: '', correo: '', contrasena: '' });
    setShowModal(false);
    setEditingEmployee(null);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setNewEmployee({ ...employee, contrasena: '' });
    setShowModal(true);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getUsers();
    SendRegister();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Barra de navegación */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '30px', height: '30px', backgroundColor: '#333', borderRadius: '50%' }}></div>
          <ul style={{ display: 'flex', listStyle: 'none', margin: '0 0 0 20px', padding: '0' }}>
            <li style={{ margin: '0 15px', cursor: 'pointer' }}>
            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <i className="pi pi-home" style={{ marginRight: '8px' }}></i> Inicio
        </Link>
            </li>
            <li style={{ margin: '0 15px', cursor: 'pointer' }}>
        <Link to="/catalogue" style={{ textDecoration: 'none', color: 'inherit' }}>
          <i className="pi pi-shopping-bag" style={{ marginRight: '8px' }}></i> Productos
        </Link>
      </li>
            <li style={{ margin: '0 15px', cursor: 'pointer' }}>
        <Link to="/employee/orders" style={{ textDecoration: 'none', color: 'inherit' }}>
          <i className="pi pi-box" style={{ marginRight: '8px' }}></i> Pedidos
        </Link>
      </li>
      <li style={{ margin: '0 15px', cursor: 'pointer' }}>
        <Link to="/employee/saleList" style={{ textDecoration: 'none', color: 'inherit' }}>
          <i className="pi pi-chart-line" style={{ marginRight: '8px' }}></i> Ventas
        </Link>
      </li>

          </ul>
        </div>
      </nav>

      {/* Contenido principal */}
      <div style={{ padding: '20px' }}>
        {/* Barra de búsqueda y botón */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              width: '70%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
          <button
            onClick={() => {
              setEditingEmployee(null);
              setNewEmployee({ nombre: '', telefono: '', correo: '', contrasena: '' });
              setShowModal(true);
              sendRegister();
            }}
            style={{
              backgroundColor: '#00000',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '10px 20px',
              cursor: 'pointer',
            }}
          >
            Añadir empleado
          </button>
        </div>

        {/* Tabla */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#007BFF', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Id</th>
              <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Nombre</th>
              <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Teléfono</th>
              <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Correo Electrónico</th>
              <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Edición</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{employee.id}</td>
                <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{employee.nombre}</td>
                <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{employee.telefono}</td>
                <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{employee.correo}</td>
                <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>
                  <button
                    onClick={() => handleEditEmployee(employee)}
                    style={{ marginRight: '5px', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteEmployee(employee.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <X size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* añadir o editar empleado */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            width: '300px',
          }}>
            <h2>{editingEmployee ? 'Editar Empleado' : 'Añadir Empleado'}</h2>
            <input
              type="text"
              name="nombre"
              value={newEmployee.nombre}
              onChange={handleInputChange}
              placeholder="Nombre"
              style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
            />
            <input
              type="text"
              name="telefono"
              value={newEmployee.telefono}
              onChange={handleInputChange}
              placeholder="Teléfono"
              style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
            />
            <input
              type="email"
              name="correo"
              value={newEmployee.correo}
              onChange={handleInputChange}
              placeholder="Correo Electrónico"
              style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
            />
            <input
              type="password"
              name="contrasena"
              value={newEmployee.contrasena}
              onChange={handleInputChange}
              placeholder="Contraseña"
              style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleAddEmployee}
                style={{
                  backgroundColor: '#007BFF',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                }}
              >
                {editingEmployee ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;