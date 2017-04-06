import { ICategorie } from '../Entity/ICategorie';
import { modelCategorie } from '../utils/mongoose-config';
import { IDaoCategorie } from './IDaoCategorie';

export class DaoCategorie implements IDaoCategorie {

    public getAllCategories():Promise<ICategorie[]>{
        return modelCategorie.find().then((categories) =>  categories);
    }

    public getCategorieByID(index:string):Promise<ICategorie>{
        return modelCategorie.findById({_id: index}).then((categorie) => categorie );
    }

    public getCategorieByLibelle(libelle: string):Promise<ICategorie>{
        return modelCategorie.findOne({libelle : libelle}).then((categorie) => categorie );
    }

    public getSousCategorieFromOneCategorie(categorie:string):Promise<ICategorie[]>{
        return modelCategorie.findOne({categorie : categorie}).then((categorie) => categorie.sousCategories);
    }

    public addCategorie(categorie: ICategorie):Promise<boolean>{
        return new modelCategorie(categorie).save().then((categorie) => categorie._id ? true : false);
    }

    public removeCategorie(categorie: ICategorie):Promise<boolean>{
        return modelCategorie.findByIdAndRemove({_id: categorie.id}).then(() => true );
    }

    public updateCategorie(categorie: ICategorie):Promise<boolean>{
        return modelCategorie.findOneAndUpdate({_id : categorie.id} , categorie).then(() => true );
    }
}