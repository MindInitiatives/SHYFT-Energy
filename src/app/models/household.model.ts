export interface IHouseholdApiResponse {
    data: IHousehold;
    included: any;
}

export interface IHousehold {
    id: string;
    type: string;
    attributes: IHouseholdAttributes;
    relationships: IHouseholdRelationships;
}

export interface IHouseholdAttributes {
    address_1: string;
    address_2: string;
    city: string | null;
    state: string;
    postal_code: string;
    country: string;
    number_of_residents: number | null;
    has_24_hr_power: boolean;
    monthly_budget: number;
    monthly_grid_budget: number | null;
    monthly_gen_budget: number | null;
    usage_data: IUsageData;
    household_type: string | null;
    tenant_type: string | null;
    automated_switching: boolean;
    nickname: string;
    user_is_admin: boolean;
    user_is_writer: boolean;
    monthly_grid_expense: number | null;
    monthly_gen_expense: number | null;
    address: IAdressData;
    has_gen: boolean | null;
    automatic_mode_available: boolean;
    automatic_mode: boolean;
    energy_system_id: string;
    active_features: Array<any> | [];
    user_nickname: string;
    has_power_switching_schedule: boolean | null
}

export interface IUsageData {
    gen_cost_today: number;
    grid_cost_today: number;
    gen_usage_today: number;
    grid_usage_today: number;
    gen_cost_this_month: number;
    grid_cost_this_month: number;
    gen_hours_today: number;
    grid_hours_today: number;
}

export interface IAdressData {
    id: number,
    street_number: string,
    route: string;
    locality: string | null,
    administrative_area_level_2: string;
    administrative_area_level_1: string | null,
    administrative_area_level_1_code: string;
    country: string;
    country_code: string;
    postal_code: string | null,
    latitude: number;
    longitude: string;
    formatted_address: string | null,
    found_via: string;
    created_at: string;
    updated_at: string;
}

export interface IHouseholdRelationships {
    devices: IHouseholdData;
    users: IHouseholdData;
    generator: IHouseholdData;
    grid_connection: IHouseholdData;
    inverter: IHouseholdData;
    solar_system: IHouseholdData;
}

export interface IHouseholdData {
    data: Array<IData>;
}

export interface IData {
    id: string;
    type: string;
}