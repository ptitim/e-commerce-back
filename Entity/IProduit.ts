import { ICategorie } from './ICategorie';

export interface IProduit {
    id: string;
    libelle: string;
    description: string;
    prix: number;
    stock: number;
    categorie: string;
}