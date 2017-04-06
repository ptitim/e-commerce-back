import { request } from 'http';
import { Categorie } from '../Entity/Categorie';
import { Router, Request, Response } from 'express';
import { IDaoCategorie } from '../dao/IDaoCategorie';
import { DaoCategorie } from '../dao/DaoCategorie';
import { ICategorie } from '../Entity/ICategorie';

export class RouterCategorie {
    router: Router;
    private static dao: IDaoCategorie = new DaoCategorie();

    constructor(){
        this.router = Router();
        this.routeInit();
    }

    private getAllCategories(request : Request, response : Response){
        RouterCategorie.dao.getAllCategories().then((categories) => response.json(categories));
    }

    private getCategorieByID(request : Request, response: Response){
        RouterCategorie.dao.getCategorieByID(request.params.index).then((cat) => cat);
    }

    private getCategorieByLibelle(request : Request, response: Response){
        RouterCategorie.dao.getCategorieByLibelle(request.params.libelle).then((cat) => cat);
    }

    private getSousCategorieFromOneCategorie(request : Request, response: Response){
        RouterCategorie.dao.getSousCategorieFromOneCategorie(request.params.libelle).then((cat) => cat);
    }

    private addCategorie(request : Request, response: Response ){
        let categorie = new Categorie();
        categorie.libelle = request.body.libelle;
        RouterCategorie.dao.addCategorie(categorie).then((rep) => response.sendStatus(200));
    }

    private removeCategorie(request : Request, response: Response ){
        let cat = new Categorie();
        cat.id = request.body.index;
        RouterCategorie.dao.removeCategorie(cat).then((rep) => response.sendStatus(200));
    }

    private updateCategorie(request : Request, response: Response ){
        let cat = new Categorie();
        cat.id = request.body.index;
        cat.libelle = request.body.libelle;
        RouterCategorie.dao.updateCategorie(cat).then((rep) => response.sendStatus(200));
    }

    routeInit(){
        this.router.get('/', this.getAllCategories);
        this.router.get('/:index', this.getCategorieByID);
        this.router.get('/libelle/:libelle', this.getCategorieByLibelle);
        this.router.get('/categorie/:libelle' ,this.getSousCategorieFromOneCategorie);
    }
}