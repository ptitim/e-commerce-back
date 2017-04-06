import { Schema, Document, model } from 'mongoose';
import * as mongoose from 'mongoose';
import { ICategorie } from '../Entity/ICategorie';
import { IProduit } from '../Entity/IProduit';
import { Categorie } from '../Entity/Categorie';

(<any>mongoose).Promise = Promise;

const connexion = mongoose.createConnection('mongodb://localhost:27018/pitichien');


let produitSchema = new Schema({
    id: String,
    libelle: String,
    description: String,
    prix: Number,
    stock: Number,
    categorie: {type: Schema.Types.ObjectId, ref: "Categorie"}
}).post('save', function(){
    this.id = this._id;
})

interface ProduitModel extends IProduit, Document { }
export const modelProduit = connexion.model<ProduitModel>('Produit', produitSchema);


let categorieSchema = new Schema({
    id: String,
    libelle: String,
    sousCategories: [{type: Schema.Types.ObjectId, ref: "Categorie"}]

});

interface CategorieModel extends ICategorie, Document { }
export const modelCategorie = connexion.model<CategorieModel>('Categorie', categorieSchema);