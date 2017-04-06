import { IDaoProduit } from './IDaoProduit';
import { IProduit } from '../Entity/IProduit';
import { ICategorie } from '../Entity/ICategorie';
import { modelProduit } from '../utils/mongoose-config';
import { DaoCategorie } from './DaoCategorie';
import { IDaoCategorie } from './IDaoCategorie';


export class DaoProduit implements IDaoProduit {
    private daoCat:IDaoCategorie = new DaoCategorie();

    public getAllProduits(): Promise<IProduit[]> {
        return modelProduit.find().then((produits) => produits);
    }

    public getProduitById(index: string): Promise<IProduit> {
        return modelProduit.findById({ _id: index }).then((produit) => produit);
    }

    public getProduitsByCategorie(categorie: string): Promise<IProduit[]> {
        return modelProduit.find({ categorie: categorie }).then((produits) => produits);
    }

    public addProduit(produit: IProduit): Promise<boolean> {
        return new modelProduit(produit).save().then((produit) => produit._id ? true : false);
    }

    public removeProduit(produit: IProduit): Promise<boolean> {
        return modelProduit.findByIdAndRemove({ _id: produit.id }).then(() => true);
    }

    public updateProduit(produit: IProduit): Promise<boolean> {
        return modelProduit.findOneAndUpdate({ _id: produit.id }, produit).then(() => true);
    }
} 