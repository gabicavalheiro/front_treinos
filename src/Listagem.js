import { inAxios, webServiceURL } from "./config_axios";
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './Listagem.css'

function Listagem() {

  // declara uma variável (vetor) e a função que irá manipular
  // essa variável (o conteúdo inicial é o que está dentro () )
  const [treinos, setTreinos] = useState([])
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState("");
  const [professor, setProfessor] = useState(0);
  const [tempo, setTempo] = useState("");
  const [nomeCli, setNomeCli] = useState("");
  const [emailCli, setEmailCli] = useState("");
  const [tipo, setTipo] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (id, nome, foto, professor, tempo, tipo) => {
    setId(id)
    setNome(nome)
    setFoto(webServiceURL + foto)
    setProfessor(professor)
    setTempo(tempo)
    setTipo(tipo)
    setShow(true);
  }

  const getTreinos = async () => {
    try {
      // indica-se o método (get) para obter os dados do server
      const lista = await inAxios.get("treinos")
      // modifica o valor da variável de estado (sempre pelo método)
      setTreinos(lista.data)
    } catch (erro) {
      console.log(`Erro no acesso ao Servidor ${erro}`)
    }
  }

  // executa uma função quando o componente é renderizado
  useEffect(() => {
    getTreinos()
  }, [])

  // verifica se os dados foram preenchidos e os envia para o Web Service
  const confirmarVoto = async () => {

    if (nomeCli == "" || emailCli == "") {
      alert("Por favor, informe os dados para confirmar seu voto.")
      return
    }

    try {
      // indica-se o método (post) para enviar os dados para o server
      const voto = await inAxios.post("votos", { treino_id: id, nome: nomeCli, email: emailCli })
      // exibe a mensagem retornada pelo Web Service
      alert(voto.data.msg)
    } catch (erro) {
      console.log(`Erro no acesso ao Servidor ${erro}`)
    }

    // limpa os campos do formulário
    setNomeCli("")
    setEmailCli("")

    // fecha a janela modal
    setShow(false)
  }

  return (

    <div className="container py-3 me-4">
      
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        {treinos.map((treinos) => (
          <div className="card text-white bg-secondary mb-1 me-3 ms-4 mt-3 " >
            <div className="card-header">
              <img src={`${webServiceURL}${treinos.foto}`} alt="Treino" className="w-70 img-fluid" />
              <h4 className="mt-1">{treinos.nome} </h4>
              <h5 className="mb-5">{treinos.tempo} - {treinos.professor} </h5>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary fw-bold py-1 px-3 float-end"
                onClick={() => handleShow(treinos.id, treinos.nome, treinos.foto, treinos.professor, treinos.tempo, treinos.tipo)}>
                Votar
              </button>
            </div>
          </div>
        ))}
        
      </div>

      <Modal show={show} onHide={handleClose} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Concurso Melhores Treinos do mês</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-6">
                <img src={foto} alt={nome} className="img-fluid" />
              </div>
              <div className="col-6">
                <h2>{nome}</h2>
                <h5>Professor: {professor}</h5>
                <h5>Tempo: {tempo}</h5>
                <h5>Tipo: {tipo}</h5>
                <h4 className="text-dark mt-5">Informe seus dados:</h4>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="floatingName" placeholder="Nome"
                    value={nomeCli} onChange={(e) => setNomeCli(e.target.value)} />
                  <label for="floatingName">Nome completo</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="email" class="form-control" id="floatingEmail" placeholder="E-mail"
                    value={emailCli} onChange={(e) => setEmailCli(e.target.value)} />
                  <label for="floatingEmail">E-mail para contato</label>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmarVoto}>
            Confirmar Voto
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Listagem