import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },

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

    technicalSkills: {
        programmingLanguages: { type: Number, min: 1, max: 5 },
        systemsKnowledge: { type: Number, min: 1, max: 5 },
        softwareTools: { type: Number, min: 1, max: 5 },
        industryKnowledge: { type: Number, min: 1, max: 5 }
    },

    softSkills: [
        {
            skills: String,
            level: {type: Number, min:1, max: 5}
        }
    ],

    trainingDashboard: {
        totalTrainings: { type: Number, default: 0 },
        totalHours: { type: Number, default: 0 },
        monthly: {
            jan: { total: Number, completed: Number },
            feb: { total: Number, completed: Number },
            mar: { total: Number, completed: Number },
            apr: { total: Number, completed: Number },
            may: { total: Number, completed: Number },
            jun: { total: Number, completed: Number },
            jul: { total: Number, completed: Number },
            aug: { total: Number, completed: Number },
            sep: { total: Number, completed: Number },
            oct: { total: Number, completed: Number },
            nov: { total: Number, completed: Number },
            dec: { total: Number, completed: Number }
        }
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