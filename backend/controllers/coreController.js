// Recherche d'une instance de modèle par clé primaire
exports.findAll = (model, conditions, order, res) => {
    model
        .findAll({ where: conditions, order: [[order]] })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).json({
                error: `Une erreur est survenue pendant la récupération des utilisateurs : ${err}`,
            });
        });
};

// Recherche d'une instance de modèle par clé primaire
exports.findByPk = (model, id, res, returnOption = false) => {
    model
        .findByPk(id)
        .then((data) => {
            if (returnOption === true) return data;
            else res.send(data);
        })
        .catch((err) => {
            res.status(500).json({
                error: `Erreur en récupérant ${model.getTableName()} id=${id} : ${err}`,
            });
        });
};

// Mise à jour d'une instance de modèle
exports.update = (model, id, req, res) => {
    model
        .update(req.body, {
            where: { id },
        })
        .then((num) => {
            if (num == 1) {
                res.json({
                    success: `${model.getTableName()} mis à jour avec succès`,
                });
                // res.status(200).json({
                //     message: `${model} mis à jour avec succès`,
                // });
            } else {
                res.status(500).json({
                    error: `Impossible de mettre à jour ${model.getTableName()} id=${id}. ${
                        model.getTableName
                    } inexistant(e) ou requête vide.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: `Erreur dans la mise à jour de ${model.getTableName()} id=${id} : ${err}`,
            });
        });
};
