import { useNavigate } from 'react-router-dom';
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes';
import './Rodape.css';
import {ReactComponent as ImagemSacola} from '../../assets/images/sacolas.svg';
import { useSorteador } from '../../state/hook/useSorteador';

const Rodape = () => {
	// chamada da lista com todos participantes
	const listaDeParticipantes = useListaDeParticipantes();

	// chamada do hook que faz o sorteio
	const sortear = useSorteador();

	// chamada do hook de navegação
	const navegarPara = useNavigate();
	// função que leva para a rota de realização do sorteio assim que o usuário clicar no botão de iniciar
	const inicar = () => {
		// chamada da função -> não precisa de parâmetros uma vez que ela faz o sorteio através do átomo que guarda a lista de participantes -> retorna o Map com as duplas
		sortear();
		navegarPara('/sorteio'); 
	};

	return(
		<footer className="rodape-configuracoes">
			{/* botão só é abilitado assim que tiver pelo menos 3 pessoas na lista */}
			<button className="botao" disabled={listaDeParticipantes.length < 3} onClick={inicar}>Iniciar Brincadeira</button>
			<ImagemSacola />
		</footer>
	);
};

export default Rodape;
