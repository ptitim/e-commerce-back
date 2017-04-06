export interface ICategorie {
    id: string;
    libelle: string;
    sousCategories: ICategorie[];
}