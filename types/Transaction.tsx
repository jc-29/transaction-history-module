export type Transaction = {
    amount: number;
    date: string;
    description: string | null;
    type: 1 | 2;
    location: string;    
    category: string;
}