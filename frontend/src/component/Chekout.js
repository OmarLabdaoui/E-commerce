import React from 'react'

function Chekout() {
  return (
    <div className='container ' style={{backgroundColor:"lightgray"}}>
    <div className="row my-5">
    <div className="col-md-3"></div>
    <div className="col-md-6">
    <form className="form" >
    <div className="container">
    <div className="row">
    <div className="col">
    <input type="text" className="form-control" placeholder="Nom" required/>
   
    </div>
    <div className="col">
    <input type="text" className="form-control" placeholder="Prenom"/>
   
    </div>

    </div>
    <div className="row my-3">
    <div className="col">
    <textarea className="form-control" placeholder="Adresse"/>
    </div>
    </div>
    <div className="row my-3">
    <div className="col">
    <input type="text" className="form-control" placeholder="Numero telephone"/>
    </div>
    </div>
    <div className="row my-3">
    <div className="col">
    <input type="text" className="form-control" placeholder="xxxxxxx@gmail.com"/>
    </div>
    </div>
    <div className="row my-3">
    <div className="col">
    <button  className="btn btn-success btn-block ">Commander</button>
    </div>
    </div>
    </div>
    </form>
    </div>
    <div className="col-md-3"></div>
    </div>
    </div>
  )
}

export default Chekout