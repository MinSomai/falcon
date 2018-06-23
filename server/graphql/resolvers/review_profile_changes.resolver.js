import { Faculty } from "../../models/faculty.model";
import { ProfileChangeRequest } from "../../models/faculty_profile_changes.model";
import { CLERK, FACULTY } from "../../models/user.model";
import { limitAccess, NO_FACULTY } from "../../utils/user_decorator";
import { getUserFromContext } from "../../utils/user_from_context";
import { DoesNotExistError } from "../errors/does_not_exist.error";
import { ValidationError } from "../errors/validation.error";

// Clean changeRequest and remove _id, submitted, and other change request fields
const getSubdocumentFromChangeRequest = changeRequest => {
    const subdocument = {...changeRequest.toObject()};
    delete subdocument._id;
    delete subdocument.submitted;
    delete subdocument.faculty;
    delete subdocument.subdocumentType;

    return subdocument;
};

const facultySubdocumentsPerType = faculty => ({
    Degree: faculty.degrees,
    Recognition: faculty.recognitions,
    Presentation: faculty.presentations,
    InstructionalMaterial: faculty.instructionalMaterials,
    ExtensionWork: faculty.extensionWork,
});

const reviewProfileChangeRequest = async (object, {_id}) => {
    const changeRequest = await ProfileChangeRequest.findById(_id);
    if (!changeRequest) {
        throw new DoesNotExistError(`Change request of id ${_id} does not exist.`);
    }

    const faculty = await Faculty.findById(changeRequest.faculty);

    return {
        async approve() {
            const subdocument = getSubdocumentFromChangeRequest(changeRequest);
            const collection = facultySubdocumentsPerType(faculty)[changeRequest.subdocumentType];

            if (collection === undefined) {
                throw new ValidationError(`Attempted to approve change request with id ${changeRequest._id} of unknown subdocumentType ${changeRequest.subdocumentType}`);
            }

            const newSubdocument = collection.create(subdocument);
            collection.push(newSubdocument);

            await faculty.save();
            await changeRequest.remove();
            return newSubdocument;
        },

        async reject() {
            await changeRequest.remove();
            return true;
        },
    };
};

const profileChangeRequests = (object, {facultyId}) =>
    facultyId ?
        ProfileChangeRequest.find({faculty: facultyId}) :
        ProfileChangeRequest.find();

const myChangeRequests = async (object, args, context) => {
    const user = await getUserFromContext(context);
    const faculty = await Faculty.findOne({user: user._id}).exec();
    return ProfileChangeRequest.find({faculty: faculty._id});
};

export const mutationResolvers = {
    reviewProfileChangeRequest: limitAccess(reviewProfileChangeRequest, {
        allowed: NO_FACULTY, action: "Review change requests",
    }),
};

export const queryResolvers = {
    profileChangeRequests: limitAccess(profileChangeRequests, {
        allowed: CLERK, action: "View change requests by faculty",
    }),
    myChangeRequests: limitAccess(myChangeRequests, {
        allowed: FACULTY, action: "View current faculty change requests",
    }),
};