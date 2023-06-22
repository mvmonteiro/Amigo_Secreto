import {  screen, render, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes';
import Sorteio from './Sorteio';
import { useResultadoSorteio } from '../../state/hook/useResultadoSorteio';

jest.mock('../../state/hook/useListaDeParticipantes', () => {
	return {
		useListaDeParticipantes: jest.fn()
	};
});
jest.mock('../../state/hook/useResultadoSorteio', () => {
	return {
		useResultadoSorteio: jest.fn()
	};
});

describe('na página de sorteio', () => {
	// lista fake com a quantidade mínima de participantes
	const participantes = ['Ana', 'Catarina', 'Jorel'];

	const resultado = new Map([
		['Ana', 'Jorel'],
		['Catarina', 'Ana'],
		['Jorel', 'Catarina']
	]);

	beforeEach( () => {
		(useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
		(useResultadoSorteio as jest.Mock).mockReturnValue(resultado);
	});


	test('todos os participantes podem exibir o seu amigo secreto', () => {
		render(
			<RecoilRoot>
				<Sorteio />
			</RecoilRoot>
		);

		// pega o seletor de opções
		const opcoes = screen.queryAllByRole('option');

		// esperamos que na lista tenha pelo menos 3 participantes
		expect(opcoes).toHaveLength(participantes.length + 1);
	});

	test('o amigo secreto é exibido quando solicitado', () => {
		render(
			<RecoilRoot>
				<Sorteio />
			</RecoilRoot>
		);
		// pegando o select
		const select = screen.getByPlaceholderText('Selecione o seu nome');
		// monitora o evento de seleção de um participante no select
		fireEvent.change(select, {
			target: {
				value: participantes[0]
			}
		});
		// pega o botao de iniciar o sorteio
		const botao = screen.getByRole('button');
		// monitroa o click no botao
		fireEvent.click(botao);
		// pega o amigo secreto que foi sorteado
		const amigoSecreto = screen.getByRole('alert');
		// esperamos que esse amigo apareça na tela -> já testamos na função pura que esse amigo secreto não vai ser ele mesmo
		expect(amigoSecreto).toBeInTheDocument();
	});
});