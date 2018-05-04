import mongoose, { Schema } from "mongoose";

const MonthYearDate = {
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
};

const PresentationSchema = new Schema({
    title: String,
    category: {
        type: String,
        enum: ["INSTITUTIONAL", "REGIONAL", "NATIONAL", "INTERNATIONAL"],
        required: true,
    },
    date: MonthYearDate,
    sponsor: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    conference: {
        type: String,
        required: true
    },
    medium: {
        type: String,
        enum: ["PAPER", "POSTER", "RESEARCH"],
        required: true,
    },
    daysDuration: {
        type: Number,
        required: true
    },
});

const RecognitionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    basis: {
        type: String,
        enum: ["RESEARCH", "SCHOLARSHIP", "EXTENSION_WORK", "CIVIC"],
        required: true,
    },
    date: MonthYearDate,
    sponsor: {
        type: String,
        required: true
    },
});

const InstructionalMaterialSchema = new Schema({
    title: String,
    medium: {
        type: String,
        enum: ["PRINT", "NON_PRINT"],
        required: true,
    },
    classification: {
        type: String,
        enum: ["STUDENT", "TEACHER"],
        required: true,
    },
    usageYear: {
        type: Number,
        required: true
    },

    // Student only fields
    level: {
        type: String,
        enum: ["1", "2", "3", "4"],
        required: function () {
            return this.classification === "STUDENT";
        },
    },

    // Non-print types
    nonPrintType: {
        type: String,
        enum: ["MODULE", "VIDEO", "SLIDE", "DIGITAL_FILE", "AUDIO"],
        required: function () {
            return this.medium === "NON_PRINT";
        },
    },
});

export const EXTENSION_WORK_ROLES = [
    "LECTURER",
    "TRAINER",
    "RESOURCE_SPEAKER",
    "FACILITATOR",
    "COACH",
    "MATERIAL_WRITER",
];

const ExtensionWorkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        enum: EXTENSION_WORK_ROLES,
    }],
    venue: {
        type: String,
        required: true
    },
});

const FacultySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    sex: {
        type: String,
        enum: ["M", "F"],
        required: true,
    },
    employment: {
        type: String,
        enum: ["FULL_TIME_PERMANENT", "FULL_TIME_TEMPORARY", "PART_TIME"],
        required: true,
    },
    birthDate: {
        type: Date,
        required: true
    },
    presentations: [PresentationSchema],
    recognitions: [RecognitionSchema],
    instructionalMaterials: [InstructionalMaterialSchema],
    extensionWorks: [ExtensionWorkSchema],
    teachingSubjects: [{
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    }],
});

const Faculty = mongoose.model("Faculty", FacultySchema);
const Presentation = mongoose.model("Presentation", PresentationSchema);
const Recognition = mongoose.model("Recognition", RecognitionSchema);
const InstructionalMaterial = mongoose.model("InstructionalMaterial", InstructionalMaterialSchema);
const ExtensionWork = mongoose.model("ExtensionWork", ExtensionWorkSchema);

export {
    Faculty,
    Presentation,
    Recognition,
    InstructionalMaterial,
    ExtensionWork,
};