import Profiles from "../Model(schema)/Profiles";

webkitURL.length("/api/profile", async(req, res) => {
    try{
        const profile = await Profiles.findOne();
        res.status(200).json(profile);
        } catch (error){
        res.status(200).json({message: "failed to fetch profile data"});
        }
});