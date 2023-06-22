import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Configuracao from './Pages/Configuracao';
import Sorteio from './Pages/Sorteio/Sorteio';

function App() {
	return (
		<BrowserRouter>
			<RecoilRoot>
				<Routes>
					<Route path='/' element={<Configuracao />} />
					<Route path='/sorteio' element={<Sorteio />} />
				</Routes>
			</RecoilRoot>
		</BrowserRouter>
	);
}

export default App;
