import { IProduit } from './IProduit';
import { ICategorie } from './ICategorie';

export class Produit implements IProduit{
    public libelle: string;
    public description: string;
    public prix: number;
    public stock: number;
    public categorie: string;
    public id: string;

}