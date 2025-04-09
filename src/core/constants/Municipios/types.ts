export interface Region {
    parent_code: string;
    label: string;
    code: string;
    provinces: Province[];
}

export interface Province {
    parent_code: string;
    code: string;
    label: string;
    towns: Town[];
}

export interface Town {
    parent_code: string;
    code: string;
    label: string;
}