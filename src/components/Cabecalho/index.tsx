import React from 'react';
import './cabecalho.css';
import {ReactComponent as ImagemParticipante} from '../../assets/images/participante.svg';

const Cabecalho: React.FC = ({ children }) => {
	return(
		<header className="container">
			<div className='cabecalho'>
				<div className="image-logo" role="img" aria-label="Logo do Sorteador"></div>
				<ImagemParticipante className='participante' />
			</div>

			{children}
		</header>
	);
};

export default Cabecalho;