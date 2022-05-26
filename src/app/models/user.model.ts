export interface IUserApiResponse {
    data: IUser;
    included: any;
}

export interface IUser {
    id: string;
    type: string;
    attributes: IUserAttributes;
    relationships: IUserRelationships;
}

export interface IUserAttributes {
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    app_flags: Array<any> | [];
    middle_name: string | null;
    username: string | null;
    primary_team_membership_id: number;
    primary_team_permissions: string;
    auth_token: string;
}

export interface IUserRelationships {
    households: IUserData;
    devices: IUserData;
    nps_surveys: IUserData;
    teams: IUserData;
    primary_team: IUserData;
}

export interface IUserData {
    data: Array<IData>;
}

export interface IData {
    id: string;
    type: string;
}