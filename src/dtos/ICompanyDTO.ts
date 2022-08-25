export interface ICompanyDTO {
    id: string;
    name: string;
    email: string;
    logo: string;
    phone: string;
    district: string;
    street: string;
    number: number;
    facebook_url: string;
    instagram_url: string;
    site_url: string;
    category: {
        name: string;
        icon: string;
    };
    state: {
        name: string;
        uf: string;
    };
    city: {
        name: string;
    };
}
