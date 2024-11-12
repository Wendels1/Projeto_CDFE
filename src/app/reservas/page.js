import { Table, Button } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'

export default function Tabela({ relacoes, clientes, destinos, onEdit, onDelete }) {
  return (
    <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Destino</th>
          <th>Data Reserva</th>
          <th>Número de Pessoas</th>
          <th>Status</th>
          <th>Comentários</th>
          <th>Forma de Pagamento</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {relacoes.map((relacao) => (
          <tr key={relacao.id}>
            <td>{clientes.find((cli) => cli.id === relacao.clienteId)?.nome}</td>
            <td>{destinos.find((dest) => dest.id === relacao.destinoId)?.nomeDestino}</td>
            <td>{relacao.dataReserva}</td>
            <td>{relacao.numeroPessoas}</td>
            <td>{relacao.statusReserva}</td>
            <td>{relacao.comentarios}</td>
            <td>{relacao.formaPagamento}</td>
            <td>
              <Button variant="warning" onClick={() => onEdit(relacao)}>
                <FaEdit />
              </Button>{' '}
              <Button variant="danger" onClick={() => onDelete(relacao.id)}>
                <FaTrash />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
