import { useRecoilValue } from 'recoil';
import { erroState } from '../atom';

export const useMensagemDeErro = () => {
	// puxa o valor do átomo
	const mensagem = useRecoilValue(erroState);
	// retorna a string que foi definida para o átomo
	return mensagem;
};