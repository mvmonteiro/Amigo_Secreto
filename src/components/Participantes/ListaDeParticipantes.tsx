import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes';
import './ListaDeParticipantes.css';

const ListaDeParticipantes = () => {
	// lista com todos participantes
	const participantes: string[] = useListaDeParticipantes();

	return(
		<ul>
			{participantes.map( (participante) => (
				<li key={participante}>
					{participante}
				</li>
			))}
		</ul>
	);
};

export default ListaDeParticipantes;