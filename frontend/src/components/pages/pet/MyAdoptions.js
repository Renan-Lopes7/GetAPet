import api from '../../../utils/api';
import styles from './Dashboard.module.css'
import { useEffect, useState } from 'react';


import RoundedImage from '../../layouts/Roundedimage'


function Myadoptions() {
    const [pets, setPets] = useState([]);
    const [token] = useState(localStorage.getItem("token") || '');

    useEffect(() => {

        api.get('/pets/myadoptions', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setPets(response.data.pets);
        }
        )

    }, [token])


    return (
        <section>
            <div>
                <h1>Minhas Adoções</h1>
            </div>
            <div className={styles.petlist_container}>

                {pets.length > 0 && (
                    pets.map((pet, index) => (
                        <div className={styles.petlist_row} key={pet._id}>
                            <RoundedImage
                                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                                alt={pet.name}
                                key={`${pet.name} + ${index}`}
                                width='px75'
                            />
                            <span className='bold'>{pet.name}</span>
                            <div className={styles.contacts}>
                                <p>
                                    <span className='bold'>Ligue para</span> {pet.user.phone}
                                </p>
                                <p>
                                    <span className='bold'>Fale com:</span> {pet.user.name}
                                </p>
                            </div>

                            <div className={styles.actions}>
                                {pet.available ? (
                                    <p>Adoção em processo</p>
                                ) : (
                                    <p>Parabéns por concluir o ciclo de adoção</p>
                                )}

                            </div>

                        </div>
                    ))
                )}
                {pets.length === 0 && (<p>Ainda não há adoções de pets.</p>)}

            </div>
        </section>
    )



}




export default Myadoptions;