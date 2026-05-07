import api from '../../../utils/api';
import styles from './PetDetails.module.css'
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// hooks
import useFlashMessage from '../../../hooks/useFlashMessage';

function PetDetails() {
    const [pet, setPet] = useState({})
    const { id } = useParams();
    const { setFlashMessage } = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || "")

    useEffect(() => {
        api.get(`/pets/${id}`).then((response) => {
            setPet(response.data.pet);
        })
    }, [id])


    async function schedule() {
        try {
            const response = await api.patch(`pets/schedule/${pet._id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setFlashMessage(response.data.message, 'success');
        }
        catch (error) {
            setFlashMessage(error.response.data.message, 'error');
        }

    }

    return (
        <>
            {pet.name && (
                <section className={styles.pet_details_container}>
                    <div className={styles.pet_details_header}>
                        <h1>Conhecendo o pet {pet.name}</h1>
                        <p>Se tiver interresse, marque uma visita para conhecê-lo</p>
                    </div>
                    <div className={styles.pet_images}>
                        {pet.images.map((image, index) => (
                            <img src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                                alt={pet.name} key={index}></img>
                        ))}
                    </div>
                    <p>
                        <span className='bold'>Peso:</span> {pet.weight}kg
                    </p>
                    <p>
                        <span className='bold'>Idade:</span> {pet.age} anos
                    </p>
                    <p>
                        {token ? (
                            <button onClick={schedule}>Solicitar uma visita</button>
                        ) : (
                            <p>Você precisa <Link to={`/register`}>cria uma conta</Link>  para solicitar a visita</p>
                        )}
                    </p>
                </section >

            )
            }

        </>
    )
}



export default PetDetails;