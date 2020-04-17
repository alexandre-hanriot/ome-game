// Récupération de toutes les instances d'une table
// En option on peut spécifier dans l'url un ou plusieurs paramètres de filtrage et tri/classement des résultats
exports.findAll = (model, defaultOrderby, req, res) => {
    // On vérifie si orderby et sortby (asc/desc) sont définis dans l'url
    // Sinon de base on tri par le paramètre defaultOrderby croissant
    const orderBy =
        typeof req.query.orderby === "undefined" || req.query.orderby === "" ? defaultOrderby : req.query.orderby;
    const sortBy = typeof req.query.sortby === "undefined" || req.query.sortby === "" ? "ASC" : req.query.sortby;

    const order = [orderBy, sortBy];

    // On récupère les conditions de filtrage en supprimant orderby et sortby des propriétés
    let conditions = {};
    if (typeof req.query.orderby !== "undefined" && typeof req.query.sortby !== "undefined") {
        const { orderby, sortby, ...filteredConditions } = req.query;
        conditions = { ...filteredConditions };
    } else if (typeof req.query.orderby !== "undefined") {
        const { orderby, ...filteredConditions } = req.query;
        conditions = { ...filteredConditions };
    } else if (typeof req.query.sortby !== "undefined") {
        const { sortby, ...filteredConditions } = req.query;
        conditions = { ...filteredConditions };
    } else conditions = { ...req.query };

    // On lance la recherche avec les paramètres conditions et order (orderby + sortby)
    model
        .findAll({ where: conditions, order: [[order]] })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).json({
                error: `Une erreur est survenue pendant la récupération des instances de ${model.getTableName()} : ${err}`,
            });
        });
};

// Recherche d'une instance de modèle par clé primaire
// returnOption permet de retourner les données au lieu d'envoyer une réponse http
exports.findOne = (model, req, res, returnOption = false) => {
    const id = req.params.id;

    const attributes =
        typeof req.body.attributes === "undefined" ? Object.keys(model.rawAttributes) : req.body.attributes.split(", ");
    console.log(attributes);
    console.log(typeof attributes);

    model
        .findOne({
            where: { id },
            attributes,
        })
        .then((data) => {
            if (data === null)
                res.status(404).json({
                    error: `${model.getTableName()} id=${id} non trouvé`,
                });
            else if (returnOption === true) return data;
            else res.send(data);
        });
};

// Création d'une instance d'un modèle
exports.create = (model, instanceData, res) => {
    // Avant toute chose on supprime les espaces avant ou après les propriétés qui sont de type string
    Object.keys(instanceData).map(
        (data) =>
            (instanceData[data] =
                typeof instanceData[data] == "string" ? instanceData[data].trim() : instanceData[data])
    );

    // Ensuite on créée l'instance
    model
        .create(instanceData)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).json({
                error: `Une erreur est survenue pendant la création de l'instance de ${model.getTableName()} : ${err}`,
            });
        });
};

// Mise à jour d'une instance de modèle
exports.update = async (model, id, req, res) => {
    // Avant toute chose on supprime les espaces avant ou après les propriétés qui sont de type string
    Object.keys(req.body).map(
        (data) => (req.body[data] = typeof req.body[data] == "string" ? req.body[data].trim() : req.body[data])
    );

    let instance = await model.findByPk(id);
    if (instance === null) res.status(404).json({ error: `${model.getTableName()} id=${id} non trouvé` });
    else {
        for (property in req.body) {
            instance[property] = req.body[property];
        }
        await instance.save(); // On sauvegarde l'instance
        res.send(instance); // On renvoie l'instance à jour en réponse
    }
};

// Suppression de plusieurs instances d'un modèle en fonction de leurs ID
exports.deleteManyByID = (model, ids, res) => {
    // Protection contre la suppression de toutes les instances d'un coup
    if (ids.length === 0) {
        res.status(500).json({
            error: `Interdiction de supprimer tous les ${model.getTableName()} en même temps. Veuillez préciser les IDs à supprimer`,
        });
    } else {
        model.destroy({ where: { id: ids } }).then((data) => {
            if (data > 0) {
                res.json({
                    success: `${data} instance(s) de ${model.getTableName()} supprimée(s) avec succès`,
                });
            } else {
                res.status(500).json({
                    error: `La suppression des instances de ${model.getTableName()} a échoué. Merci de vérifier les IDs renseignés`,
                });
            }
        });
    }
};

exports.deleteOne = (model, id, res) => {
    model.destroy({ where: { id } }).then((data) => {
        if (data === 1) {
            res.json({
                success: `${model.getTableName()} id=${id} supprimé de la bdd avec succès`,
            });
        } else {
            res.status(404).json({
                error: `${model.getTableName()} id=${id} non trouvé`,
            });
        }
    });
};
