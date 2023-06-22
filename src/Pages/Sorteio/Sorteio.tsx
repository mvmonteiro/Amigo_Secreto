import { useState } from 'react';
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes';
import { useResultadoSorteio } from '../../state/hook/useResultadoSorteio';
import './Sorteio.css';
import Cabecalho from '../../components/Cabecalho';
import { Card } from '../../components/Card/Card';
import {ReactComponent as ImagemAviao} from '../../assets/images/aviao.svg';

const Sorteio = () => {
	// hook para puxar a lista de participantes
	const participantes = useListaDeParticipantes();
	// hook use state para pegar a seleção de participante do usuário
	const [participanteDaVez, setParticipanteDaVez] = useState('');
	const [amigoSecreto, setAmigoSecreto] = useState('');
	// chamada do hook que puxa a lista com o Map do resultado do sorteio
	const resultado = useResultadoSorteio();

	// função que retorna o amigo secreto do participante
	const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();

		// só teremos a chamada quando ele existe
		if(resultado.has(participanteDaVez)){
		// obtenção do amigo secreto
			setAmigoSecreto(resultado.get(participanteDaVez)!); // busca na lista o participante da vez que está vinculado com o seu amigoSecreto
		}
	};
  
	return (
		<Cabecalho>
			<Card>
				<section className='sorteio'>
					<h2>Quem vai tirar o papelzinho?</h2>
					<form onSubmit={ sortear }>
						<select 
							required 
							name="participanteDaVez" 
							id="participanteDaVez" 
							placeholder='Selecione o seu nome'
							value={participanteDaVez}
							onChange={ (evento) => setParticipanteDaVez(evento.target.value)}
						>
							<option >Selecione seu nome</option>
							{participantes.map( (participante) => (
								<option key={participante} >{participante}</option>
							))}
						</select>
						<p>Clique em em sortear para ver quem é seu amigo secreto!</p>
						<button className="botao-sortear">Sortear!</button>
					</form>

					{amigoSecreto && <p role='alert' className="resultado" >{amigoSecreto}</p>}

					<footer>
						<ImagemAviao />
					</footer>
				</section>
			</Card>
		</Cabecalho>
	);
};

export default Sorteio;