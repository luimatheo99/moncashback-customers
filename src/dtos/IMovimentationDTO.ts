export interface IMovimentationDTO {
    id: string;
    company_id: string;
    company: {
        name: string;
        logo: string;
        category: {
            name: string;
            icon: string;
        };
    };
    earned_value: string;
    pay_value: string;
    amount: string;
    type: string;
    created_at: string;
}
