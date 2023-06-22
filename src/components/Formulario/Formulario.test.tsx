import { act, fireEvent, render, screen } from '@testing-library/react';
import Formulario from './Formulario';
import { RecoilRoot } from 'recoil';

// Jest
describe('O comportamento do componente Formulario.tsx', () => {
	test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
		// primeiro devemos renderizar o componente
		render(
			<RecoilRoot>	
				<Formulario />
			</RecoilRoot>);
	
		// encontrar no DOM o input que vamos checar
		const input = screen.getByPlaceholderText('Insira os nomes...');
	
		// encontrar o botão
		const botao = screen.getByRole('button'); // identifica pela funcionalidade -> no caso a de um botão
	
		// garantir que o input realmente esteja no documento
		expect(input).toBeInTheDocument();
	
		// garantir que o botão esteja desabilitado
		expect(botao).toBeDisabled();
	
	});
	
	test('adicionar um participante caso exista um nome preenchido', () => {
		// primeiro devemos renderizar o componente -> utilizamos um hook do recoil precisamos deixar dentro do RecoilRoot
		render(
			<RecoilRoot>	
				<Formulario />
			</RecoilRoot>);
	
		// encontrar no DOM o input que vamos checar
		const input = screen.getByPlaceholderText('Insira os nomes...');
	
		// encontrar o botão
		const botao = screen.getByRole('button'); // identifica pela funcionalidade -> no caso a de um botão
	
		// inserir um valor no input
		fireEvent.change(input, {
			target: {
				value: 'Ana Catarina'
			}
		});  // um helper que monitora o evento de change do input
	
		// clicar no botão de submeter
		fireEvent.click(botao); // monitora o click no botão
	
		// garantir que o input esteja com o foco ativo -> o campo do nome deve ficar limpo e o cursor deve voltar para o input
		expect(input).toHaveFocus(); // esperamos que o cursor fique "piscando" dentro do input depois do submit
	
		// garantir que o input não tenha um valor -> seja uma string vazia
		expect(input).toHaveValue(''); // esperamos que o input tenha um valor vazio
	
	});
	
	test('nomes duplicados não podem ser adicionados na lista', () => {
		// primeiro devemos renderizar o componente -> utilizamos um hook do recoil precisamos deixar dentro do RecoilRoot
		render(
			<RecoilRoot>	
				<Formulario />
			</RecoilRoot>);
	
		// encontrar no DOM o input que vamos checar
		const input = screen.getByPlaceholderText('Insira os nomes...');
	
		// encontrar o botão
		const botao = screen.getByRole('button'); // identifica pela funcionalidade -> no caso a de um botão
	
		// inserir um valor no input
		fireEvent.change(input, {
			target: {
				value: 'Ana Catarina'
			}
		});  // um helper que monitora o evento de change do input
	
		// clicar no botão de submeter
		fireEvent.click(botao); // monitora o click no botão
	
		// inserir um valor no input
		fireEvent.change(input, {
			target: {
				value: 'Ana Catarina'
			}
		});  // um helper que monitora o evento de change do input
	
		// clicar no botão de submeter
		fireEvent.click(botao); // monitora o click no botão
	
		// caso tenha duplicidade de nomes deve aparecer um alerta
		const mensagemDeErro = screen.getByRole('alert');
	
		// espera-se que o alerta mostre a seguinte mensagem
		expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!');
	});
	
	test('a mensagem de erro deve desaparecer de acordo com o timer definido', () => {
		// simula o comportamento de um timer
		jest.useFakeTimers();
	
		// primeiro devemos renderizar o componente -> utilizamos um hook do recoil precisamos deixar dentro do RecoilRoot
		render(
			<RecoilRoot>	
				<Formulario />
			</RecoilRoot>);
	
		// encontrar no DOM o input que vamos checar
		const input = screen.getByPlaceholderText('Insira os nomes...');
	
		// encontrar o botão
		const botao = screen.getByRole('button'); // identifica pela funcionalidade -> no caso a de um botão
	
		// inserir um valor no input
		fireEvent.change(input, {
			target: {
				value: 'Ana Catarina'
			}
		});  // um helper que monitora o evento de change do input
	
		// clicar no botão de submeter
		fireEvent.click(botao); // monitora o click no botão
	
		// inserir um valor no input
		fireEvent.change(input, {
			target: {
				value: 'Ana Catarina'
			}
		});  // um helper que monitora o evento de change do input
	
		// clicar no botão de submeter
		fireEvent.click(botao); // monitora o click no botão
	
		// caso tenha duplicidade de nomes deve aparecer um alerta
		let mensagemDeErro = screen.queryByRole('alert');
	
		// espera-se que o alerta mostre a seguinte mensagem
		expect(mensagemDeErro).toBeInTheDocument();
		
		// esperar n segundos
		act(() => {
			jest.runAllTimers();
		});
		mensagemDeErro = screen.queryByRole('alert');
		expect(mensagemDeErro).toBeNull();
	});
});

