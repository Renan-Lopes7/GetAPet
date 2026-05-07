const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require("../helpers/get-token");
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class UserController {

    static async register(req, res) {
        const { name, email, phone, password, confirmpassword } = req.body
        //validations
        if (!name) {
            res.status(422).json({ message: "O Nome é obrigatório" });
            return
        }
        if (!email) {
            res.status(422).json({ message: "O E-mail é obrigatório" });
            return
        }
        if (!phone) {
            res.status(422).json({ message: "O telefone é obrigatório" });
            return
        }
        if (!password) {
            res.status(422).json({ message: "A senha é obrigatória" });
            return
        }
        if (!confirmpassword) {
            res.status(422).json({ message: "A confirmação de senha é obrigatória" });
            return
        }
        if (password !== confirmpassword) {
            res.status(422).json({ message: "A senha é a confirmação de senha precisam ser iguais !" });
            return
        }
        //check if user exist
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            res.status(422).json({ message: "Por favor, Utilize outro e-mail !" });
            return
        }

        //create a password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        //create a user 
        const user = new User({
            name: name,
            email: email,
            phone: phone,
            password: passwordHash,
        })

        try {
            const newUser = await user.save();
            await createUserToken(newUser, req, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async login(req, res) {
        const { email, password, } = req.body;
        //validation
        if (!email) {
            res.status(422).json({ message: "O E-mail é obrigatório" });
            return
        }
        if (!password) {
            res.status(422).json({ message: "A senha é obrigatória" });
            return
        }
        //check if user exist
        const user = await User.findOne({ email: email });

        if (!user) {
            res.status(422).json({ message: "Não há usuário cadastrado com esse e-mail !" });
            return
        }
        //check if password match db password
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            res.status(422).json({ message: "Senha inválida !" });
            return
        }

        await createUserToken(user, req, res);
    }

    static async checkUser(req, res) {
        let currentUser

        if (req.headers.authorization) {

            const token = getToken(req);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            currentUser = await User.findById(decoded.id);
            currentUser.password = undefined;

        } else {
            currentUser = null
        }
        res.status(200).send(currentUser);

    }

    static async getUserByid(req, res) {
        const id = req.params.id

        const user = await User.findById(id).select('-password');

        if (!user) {
            res.status(422).json({ message: "Usuario não encontrado !" });
            return
        }
        //se encontrar
        res.status(200).json({ user });
    }

    static async editUser(req, res) {
        const id = req.params.id

        //check if user exist
        const token = getToken(req);
        const user = await getUserByToken(token);

        const { name, email, phone, password, confirmpassword } = req.body

        if (req.file) {
            user.image = req.file.filename
        }

        //validations
        if (!name) {
            res.status(422).json({ message: "O Nome é obrigatório" });
            return
        }
        if (!email) {
            res.status(422).json({ message: "O E-mail é obrigatório" });
            return
        }
        const userExist = await User.findOne({ email: email });
        if (user.email !== email && userExist) {
            res.status(422).json({ message: "Por favor utilize outro E-mail !" });
            return
        }
        if (!phone) {
            res.status(422).json({ message: "O telefone é obrigatório" });
            return
        }
        user.phone = phone;

        if (password != confirmpassword) {
            res.status(422).json({ message: "As senhas não conferem !" });
            return
        }
        else if (password === confirmpassword && password != null) {
            //creating password
            const salt = await bcrypt.genSalt(12);
            const passwordHash = bcrypt.hash(password, salt);

            user.password = passwordHash;
        }

        try {
            //returns user update data 
            await User.findOneAndUpdate({ _id: user._id },
                { $set: user },
                { new: true },
            );

            res.status(200).json({ message: "Usuário Atualizado com sucesso !" });

        } catch (erro) {
            res.status(500).json({ message: erro });
            return
        }

    }
}