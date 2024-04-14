export interface UserModel {
    data : {
        address: String,
        created_at: String,
        created_by: String,
        deleted_at: String | null
        designation: String,
        email: String,
        email_verified_at: String,
        firstname: String,
        fullname: String,
        id: Number,
        is_active: Number,
        lastname: String,
        middlename: String,
        position: String,
        updated_at: String,
        username: String,
    } | null
}

export const UserDefaults = {
    data : {
        address: '',
        created_at: '',
        created_by: '',
        deleted_at:  null,
        designation: '',
        email: '',
        email_verified_at: '',
        firstname: '',
        fullname: '',
        id: 1,
        is_active: 1,
        lastname: '',
        middlename: '',
        position: '',
        updated_at: '',
        username: '',
    }
}
