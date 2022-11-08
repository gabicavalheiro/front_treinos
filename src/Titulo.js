import './Titulo.css'

function Titulo() {
  return (
    <div className="container-fluid bg-primary text-white">
      <div className="row align-items-center">
        <div className="col-sm-4 col-md-3 text-center">
          <img src="logo.png" alt="Logo " className="logo" width={180} height={180} />
        </div>
        <div className="col-sm-8 col-md-6 text-center ">
          <h1> Concurso Melhor Treino </h1>          
        </div>
        <div className="col-sm-12 col-md-3 text-center">
          <h3>Edição Novembro</h3>
        </div>
      </div>
    </div>
  )
}

export default Titulo