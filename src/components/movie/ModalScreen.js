import React from 'react';

import Modal from 'react-modal';

import Swal from 'sweetalert2';
import { fetchNoToken } from '../../helpers/fetch';
import { useForm } from '../../hooks/useForm';
import { TableMovies } from './TableMovies';

Modal.setAppElement('body');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'

    }
};

export const ModalScreen = ({ data, setData, isOpen, setIsOpen }) => {

    const [formLoginValues, handleInputChange, reset] = useForm({
        RUT: '',
    });


    const { RUT } = formLoginValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMovies()
    }


    const sendMovies = async () => {
        let arr = [...data];
        arr.sort((a, b) => { return a.metascore - b.metascore })
        const arrTitle = arr.map(m => m.title)

        const body = {
            RUT,
            Peliculas: arrTitle
        }

        try {
            const resp = await fetchNoToken(process.env.REACT_APP_API_POST_URL, body, 'POST');
            const res = await resp.json();

            if (res.message) {
                return Swal.fire('success', res.message, 'success');
            }
        } catch (error) {
            return Swal.fire('Error', error, 'error');
        }

    }

    const closeModal = () => {
        setData([]);
        setIsOpen(false);
        reset();
    }



    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
                closeTimeoutMS={200}
                className="modal"
                overlayClassName="modal-fondo"
            >
                <h1> Movies List </h1>
                <hr />

                <TableMovies data={data} />


                <form onSubmit={handleSubmit}>
                    {data.length !== 0 &&
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Rut usuario - Ejemplo:  12345678-9"
                            name="RUT"
                            value={RUT}
                            onChange={handleInputChange}
                        />}

                    {data.length !== 0 && <input type="submit" className="btn btn-success form-control" onClick={sendMovies} value="Send Movies" />}
                </form>

            </Modal>
        </>
    )
}
