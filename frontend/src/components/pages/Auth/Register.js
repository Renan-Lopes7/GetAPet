import { use, useContext, useState } from "react";


import Input from "../../form/input";
import styles from "../../form/Form.module.css"
import { Link } from "react-router-dom";

//context
import { Context } from "../../../context/UserContext";

function Register() {
    const [user, setUser] = useState({});
    const { register } = useContext(Context);


    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault()
        //enviar usu para o banco
        register(user);

    }
    return (
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                <Input text="Nome" type="text" name="name" placeholder="Digite o seu nome" handleOnChange={handleChange} >
                </Input>

                <Input text="telefone" type="text" name="phone" placeholder="Digite o seu Telefone" handleOnChange={handleChange} >
                </Input>

                <Input text="E-mail" type="email" name="email" placeholder="Digite o seu e-mail" handleOnChange={handleChange} >
                </Input>

                <Input text="Senha" type="password" name="password" placeholder="Digite o sua senha" handleOnChange={handleChange} >
                </Input>

                <Input text="Confirmação de senha" type="password" name="confirmpassword" placeholder="Confirme a sua senha" handleOnChange={handleChange} >
                </Input>

                <input type="submit" value="Cadastrar"></input>
            </form>
            <p>Já tem uma conta ? <Link to="/login">Clique aqui.</Link> </p>
        </section>
    );

}

export default Register;