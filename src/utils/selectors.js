import slugify from 'react-slugify';


// récupérer le slug qui correspond à un id d'une offre
export const slugifyId = (id) => slugify(id, {
  lower: true,
});

export const getOfferBySlug = (offers, slug) => {
  const offerIdFound = offers.find((offer) => {
    // on calcule le slug de la recette
    const slugForOfferId = slugifyId(offer.id, {
      lower: true,
    });

    // return true si c'est le bon élément, false sinon (find s'arrête au premier
    // élément qui correspond)
    return slug === slugForOfferId;
  });
  return offerIdFound;
};
