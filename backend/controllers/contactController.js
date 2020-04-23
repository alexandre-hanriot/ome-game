const nodemailer = require("nodemailer");

exports.contactRequest = (req, res) => {
    const { firstname, lastname, email, message } = req.body;

    // On paramètre le service d'envoi
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "omegameatlantis@gmail.com",
            pass: "oclockatlantis",
        },
    });

    // On paramètre le mail
    const mailOptions = {
        from: "omegameatlantis@gmail.com", // sender address
        to: "omegameatlantis@gmail.com", // list of receivers
        subject: "Coucou", // Subject line
        html: `<p>Vous avez reçu un message de l'utilisateur ${firstname} ${lastname}</p><br>Son message est le suivant :<br><br>${message}.<br><br>Pour lui répondre ; ${email}`, // plain text body
    };

    // On envoie
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            return res.status(500).json({
                error: `Une erreur est survenue : ${err}`,
            });
        return res.status(200).json({
            message: `Email envoyé. Infos : ${info}`,
        });
    });
};
