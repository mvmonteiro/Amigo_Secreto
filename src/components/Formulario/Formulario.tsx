import { useRef, useState } from 'react';
import { useAdicionarParticipante } from '../../state/hook/useAdicionarParticipante';
import { useMensagemDeErro } from '../../state/hook/useMensagemDeErro';
import './Formulario.css';

const Formulario = () => {
	// hook para setar o novo estado que o usuário vai digitar
	const [nome, setNome] = useState('');
	// chamada do hook customizado que adiciona participantes na lista
	const adicionarNaLista = useAdicionarParticipante();
	// hook para setar o foco no campo de input 
	const inputRef = useRef<HTMLInputElement>(null); // uma referência para o input que por padrão é nula

	// chamada do hook que retorna a mensagem de erro
	const mensagemDeErro = useMensagemDeErro();

	// função que vai adicionar o participante à lista quando houver um submit
	const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
		// tira o padrão de recarregamento da página
		evento.preventDefault();
		// pega o nome que o usuário digitou e adiciona o mesmo na lista de participantes com o hook customizado
		adicionarNaLista(nome);
		// limpa o campo do input depois de um submit
		setNome('');
		// caso houver um input, colocamos o foco nele
		inputRef.current?.focus();
	};

	return (
		<form onSubmit={ (evento) => adicionarParticipante(evento)}>
			<div className="grupo-input-btn">
				<input
					ref={inputRef}
					value={nome}
					onChange={ (evento) => setNome(evento.target.value)} 
					type="text" 
					placeholder="Insira os nomes..."
				/>

				<button disabled={!nome}>Adicionar</button> {/* o botão só deve estar desabilitado no caso onde não há um nome digitado */}
			</div>
			
			{mensagemDeErro && <p role="alert" className='alerta erro'>{mensagemDeErro}</p>} {/* mensagem de erro só aparece quando realmente a temos */}
			
			
		</form>
	);
};

export default Formulario;