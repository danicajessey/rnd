import React, { useState } from 'react';
import './Table.css';

const Table = () => {
  const [data, setData] = useState([
    { 
      id: 1, 
      name: 'Jess', 
      age: 20 
    },
    { 
      id: 2, 
      name: 'John', 
      age: 32 
    },
    { 
      id: 3, 
      name: 'Verli', 
      age: 29 
    },
    { 
      id: 4, 
      name: 'Samy', 
      age: 5 
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', age: '' });

  const addUser = user => {
    user.id = data.length + 1;
    setData([...data, user]);
  };

  const deleteUser = id => {
    setData(data.filter(user => user.id !== id));
  };

  const editUser = user => {
    setIsEditing(true);
    setCurrentUser({ id: user.id, name: user.name, age: user.age });
  };

  const updateUser = (id, updatedUser) => {
    setIsEditing(false);
    setData(data.map(user => (user.id === id ? updatedUser : user)));
  };

  return (
    <div className="container">
      <h1>CRUD Operations</h1>
      {isEditing ? (
        <EditUserForm currentUser={currentUser} setIsEditing={setIsEditing} updateUser={updateUser} />
      ): 
      (
        <AddUserForm addUser={addUser} />
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <button className="btn edit" onClick={() => editUser(user)}>Edit</button>
                <button className="btn delete" onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AddUserForm = ({ addUser }) => {
  const initialFormState = { id: null, name: '', age: '' };
  const [user, setUser] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!user.name.match(/^[A-Za-z\s]+$/)) {
      formErrors.name = 'Name must contain only letters';
    }
    if (!user.age.match(/^\d+$/)) {
      formErrors.age = 'Age must be a number';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (validateForm()) {
      addUser(user);
      setUser(initialFormState);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='input'>
        <label className='input_label'>Name</label>
        <input type="text" name="name" value={user.name} onChange={handleInputChange} />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div className='input'>
        <label className='input_label'>Age</label>
        <input type="text" name="age" value={user.age} onChange={handleInputChange} />
        {errors.age && <p className="error">{errors.age}</p>}
      </div>
      <button className="btn create">Create</button>
    </form>
  );
};

const EditUserForm = ({ currentUser, setIsEditing, updateUser }) => {
  const [user, setUser] = useState(currentUser);
  const [errors, setErrors] = useState({});

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!user.name.match(/^[A-Za-z\s]+$/)) {
      formErrors.name = 'Name must contain only letters';
    }
    if (!user.age.match(/^\d+$/)) {
      formErrors.age = 'Age must be a number';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (validateForm()) {
      updateUser(user.id, user);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='input'>
        <label className='input_label'>Name</label>
        <input type="text" name="name" value={user.name} onChange={handleInputChange} />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div className='input'>
        <label className='input_label'>Age</label>
        <input type="text" name="age" value={user.age} onChange={handleInputChange} />
        {errors.age && <p className="error">{errors.age}</p>}
      </div>
      <button className="btn edit">Update</button>
      <button className="btn cancel" onClick={() => setIsEditing(false)}>Cancel</button>
    </form>
  );
};

export default Table;
