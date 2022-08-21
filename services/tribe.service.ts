import Organization from "../models/organization";
import Tribe from "../models/tribe";

export const getTribeById = async (id_tribe: string) => {

    const tribe = await Tribe.findOne({
        where:
        {
            id_tribe
        },
        include: {
            model: Organization
        }
    });

    return tribe;

}