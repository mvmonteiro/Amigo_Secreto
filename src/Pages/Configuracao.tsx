import Cabecalho from '../components/Cabecalho';
import { Card } from '../components/Card/Card';
import Formulario from '../components/Formulario/Formulario';
import ListaDeParticipantes from '../components/Participantes/ListaDeParticipantes';
import Rodape from '../components/Rodape/Rodape';
import './Configuracao.css';

const Configuracao = () => {
	return (

		<Cabecalho>
			<Card>
				<section>
					<h2>Vamos começar!</h2>
					<Formulario />
					<ListaDeParticipantes />
					<Rodape />
				</section>
			</Card>
		</Cabecalho>

	);
};

export default Configuracao;