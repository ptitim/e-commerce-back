import { ICategorie } from './ICategorie';

export class Categorie implements ICategorie{
    public libelle: string;
    public sousCategories: ICategorie[];
    public id: string;
    
}