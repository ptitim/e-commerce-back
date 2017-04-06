import { ICategorie } from '../Entity/ICategorie';


export interface IDaoCategorie{

    getAllCategories():Promise<ICategorie[]>;

    getCategorieByID(index:string):Promise<ICategorie>;

    getCategorieByLibelle(libelle:string):Promise<ICategorie>;

    getSousCategorieFromOneCategorie(categorie:string):Promise<ICategorie[]>;

    addCategorie(categorie: ICategorie):Promise<boolean>;

    removeCategorie(categorie: ICategorie):Promise<boolean>;

    updateCategorie(categorie: ICategorie):Promise<boolean>;

}