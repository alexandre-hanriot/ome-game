// Recherche d'une instance de modèle par clé primaire
exports.findAll = (model, conditions, order, res) => {
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
exports.findOne = (model, id, res, returnOption = false) => {
    model.findByPk(id).then((data) => {
        if (data === null)
            res.status(404).json({
                error: `${model.getTableName()} id=${id} non trouvé`,
            });
        else if (returnOption === true) return data;
        else res.send(data);
    });
};

// Mise à jour d'une instance de modèle
exports.update = (model, id, req, res) => {
    model
        .update(req.body, {
            where: { id },
            returning: true,
            plain: true,
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).json({
                error: `Erreur dans la mise à jour de ${model.getTableName()} id=${id} : ${err}`,
            });
        });
};

// Suppression de plusieurs instances d'un modèle en fonction de leurs ID
exports.deleteManyByID = (model, ids, res) => {
    console.log(ids.length);
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
