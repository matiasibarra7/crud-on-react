import React, {useState} from 'react';
import uniqid from "uniqid"

function NameList() {
  const [name, setName] = useState('');
  const [listName, setListName] = useState([])
  const [editing, setEditing] = useState(false)
  const [IDEditing, setIDEditing] = useState('')
  const [error, setError] = useState(null)

  const createName = (e) => {
    e.preventDefault()
    if (name.trim().length) {
      const nameToInsert = {
        id: uniqid(),
        name: name
      }
      setListName([...listName, nameToInsert])
      document.getElementsByClassName("writingName")[0].value =""
      setName("")
      setError(null)
    } else {
      setError("Debes ingresar algún nombre")
    }
  }

  const deleteName = (id) => {
    const newList = listName.filter(el => el.id !== id)
    setListName(newList)
  }

  const editName = (el) => {
    setEditing(true)
    setName(el.name)
    setIDEditing(el.id)
  }

  const updateName = (e) => {
    e.preventDefault()
    if (name.trim().length) {
      const newListName = listName.map(el => el.id === IDEditing? {id: el.id, name: name} : el)
      setListName(newListName)
      document.getElementsByClassName("writingName")[0].value =""
      setName("")
      setEditing(false)
      setError(null)
    } else {
      setError("Debes ingresar algún valor para el nombre")
    }
  }

  return (
    <>
      <h2>Aplicación basica de CRUD en REACT</h2>
      <div className="row align-items-start">
        <div className="col">
          <h3>
            Listado de Nombres
          </h3>
            <ul className="list-group">
              {
                listName.map((el, i) => 
                  <li key={`${i + el.id}`} className="list-group-item">
                    {el.name}
                    <button className="btn btn-danger float-right" onClick={() => deleteName(el.id)}>Borrar</button>
                    <button className="btn btn-info float-right" onClick={() => editName(el)}>Editar</button>
                  </li> 
                )
              }
            </ul>
        </div>
        <div className="col">
          <h3>
            Formulario para añadir nombre
          </h3>
          <form onSubmit={editing?  updateName : createName}>
            <div className="mb-3">
              <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Introduce un Nombre" className="writingName form-control mb-3" value={name}/>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" type="submit">
                {editing? "Editar Nombre" : "Registrar Nombre"}
              </button>
            </div>
          </form>  
          {
            error? 
              <div className="text-danger">{error}</div>
              : <></>
          }
        </div>
      </div>
    </>

  );
}

export default NameList;
