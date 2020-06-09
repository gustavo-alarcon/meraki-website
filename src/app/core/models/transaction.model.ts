import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface Transaction {
    id?: string;
    type: string;
    date: Date;
    amount: number;
    descBCP: string;
    description: string;
    createdAt: Date;
}