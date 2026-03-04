import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    professionalCertificates: [
        {
            title: String,
            organisation: String,
            year: String
        }
    ],

    technicalQualifications: [
        {
            category: String,
            tq: [String]
        }
    ],

    technicalSkills: [
        {
            skills: String,
            level: {type: Number, min:1, max: 5}
        }
    ],

    softSkills: [
        {
            skills: String,
            level: {type: Number, min:1, max: 5}
        }
    ],

    trainingDashboard: 
        {
            trainingNumbers: {type: Number, default: 0},
            hours: {type: Number, default: 0},
            janToatal: {type: Number, default: 0},
            janCompleted: {type: Number, default: 0},
        },

    trainingStatus: 
                {
                    cancelled: {type: Number, default: 0},
                    completed: {type: Number, default: 0},
                    inProgress: {type: Number, default: 0},
                    NotStarted: {type: Number, default: 0}
                },

    trainingtype: 
        {
            online: {type: Number, default: 0},
            inHouse: {type: Number, default: 0},
            External: {type: Number, default: 0}
        }

},

{timestamps: true}
);

export default mongoose.model("Profile", profileSchema);