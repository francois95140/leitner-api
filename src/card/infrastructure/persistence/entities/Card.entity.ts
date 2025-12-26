import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Category } from '../../../domain/Category';

@Entity('cards')
export class CardEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    question: string;

    @Column()
    answer: string;

    @Column()
    tag: string;

    @Column({
        type: 'text', // sqlite uses text for enums usually or simple varchar
        default: Category.FIRST,
    })
    category: string;

    @Column({ type: 'timestamp', nullable: true })
    nextQuizzDate: Date;
}
