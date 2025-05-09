// Use CapitalCase for filenames (e.g., UserModel.js instead of users.model.js)

import { documentsModel } from "./modules/documents/Documents.model.js";
import { hospitalAdminModel } from "./modules/hospital/onboarding/HospitalAdmin.model.js";
import { hospitalModel } from "./modules/hospital/onboarding/hospital-onboarding.model.js";
import { userModel } from "./modules/users/Users.model.js";
import { adminModel } from "./modules/admin/Admin.model.js";
import { doctorsModel } from "./modules/doctors/Doctors.model.js";
import { doctorSlotsModel } from "./modules/doctors/slots/DoctorSlots.model.js";

export default {
    // Use CAPITAL_SNAKE_CASE for constants (e.g., USER_MODEL instead of UserModel)
    USER_MODEL: userModel,
    HOSPITAL_MODEL: hospitalModel,
    HOSPITAL_ADMIN: hospitalAdminModel,
    DOCUMENTS_MODEL: documentsModel,
    ADMIN_MODEL: adminModel,
    DOCTOR_PROFILE_MODEL: doctorsModel,
    DOCTOR_SLOTS: doctorSlotsModel
};
