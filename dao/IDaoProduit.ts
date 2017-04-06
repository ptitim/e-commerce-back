import { IProduit } from '../Entity/IProduit';
import { ICategorie } from '../Entity/ICategorie';

export interface IDaoProduit{

    getAllProduits():Promise<IProduit[]>;

    getProduitById(index:string):Promise<IProduit>;

    getProduitsByCategorie(categorie:string ):Promise<IProduit[]>;

    addProduit(produit:IProduit):Promise<boolean>;

    removeProduit(produit:IProduit):Promise<boolean>;

    updateProduit(produit:IProduit):Promise<boolean>;

}