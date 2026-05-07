import api from '../../../utils/api'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './Dashboard.module.css'

import RoundedImage from '../../layouts/Roundedimage'

//hooks 
import useFlashMessage from '../../../hooks/useFlashMessage'


function MyPets() {

    const [pets, setPets] = useState([]);
    const [token] = useState(localStorage.getItem('token') || '');
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        api.get('/pets/mypets', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setPets(response.data.pets);
            })
    }, [token]);


    async function removePet(id) {
        let data

        try {
            const response = await api.delete(`/pets/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            const updatedPets = pets.filter((pet) => pet._id !== id)
            setPets(updatedPets);
            data = response.data
            setFlashMessage(data.message, 'success');

        }
        catch (erro) {
            data = erro.response.data
            setFlashMessage(data.message, 'error');
        }

    }

    async function concludeAdoption(id) {
        let data
        try {
            const response = await api.patch(`/pets/conclude/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            setFlashMessage(response.data.message, 'success');
        } catch (error) {
            setFlashMessage(error.response.data.message, 'error')
        }
    }
    return (
        <section>
            <div className={styles.petlist_header}>
                <h1>Meus Pets</h1>
                <Link to='/pet/add'>Cadastrar Pets</Link>
            </div>
            <div>
                {pets.length > 0 &&
                    pets.map((pet, index) => (
                        <div className={styles.petlist_row} key={pet._id}>
                            <RoundedImage
                                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                                alt={pet.name}
                                key={`${pet.name} + ${index}`}
                                width='px75'
                            />
                            <span className='bold'>{pet.name}</span>
                            <div className={styles.actions}>
                                {pet.available ? (
                                    <>
                                        {pet.adopter && (
                                            <button className={styles.conclude_btn} onClick={() => {
                                                concludeAdoption(pet._id)
                                            }}   >Concluir adoção</button>)}
                                        <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                                        <button onClick={() => {
                                            removePet(pet._id);
                                        }}>Excluir</button>
                                    </>
                                ) : (
                                    <p>Pet já adotado</p>

                                )}

                            </div>

                        </div>
                    ))
                }
                {pets.length === 0 && <p> Não há pets cadastrados</p>}
            </div>
        </section>
    );
}



export default MyPets;