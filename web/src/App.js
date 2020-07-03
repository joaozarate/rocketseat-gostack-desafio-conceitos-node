import React, { useState, useEffect } from 'react';

import api from './services/api'

import "./styles.css";

function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('projects', {
      title: `New project ${Date.now()}`,
      owner: "João Zarate"
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) {

    const response = await api.delete(`projects/${id}`);

    if (response.status === 204) {
      const filtredProjects = projects.filter(item => item.id != id);
      setProjects(filtredProjects);
    }

  }

  return (
    <div>
      <ul data-testid="project-list">
        {
          projects.map(project => (

            <li key={project.id}>
              {project.title} <button onClick={() => handleRemoveRepository(project.id)}>Remover</button>
            </li>

          ))
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
