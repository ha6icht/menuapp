import { makeAutoObservable } from 'mobx';

class MenuStore {
    checkReturn = true
    //checkDateReturn = false
    //cWReturn = ''
    //yearReturn = ''
    //checkWeekReturn = ''
    /*menuData = {
        0:{
            cW: [],
            day: 'Montag',
            date: '',
            lunch:{
                name: 'Mittagessen',
                menu:'',
                ingredients:{
                    name: [],
                    quantity: [],
                    unit: [],
                    kcal: [],
                    fat: [],
                    carb: [],
                    protein: []
                }
            },
            dinner:{
                name: 'Abendessen',
                menu:'',
                ingredients:{
                    name: [],
                    quantity: [],
                    unit: [],
                    kcal: [],
                    fat: [],
                    carb: [],
                    protein: []
                }
            }
    
        },
    }*/
    constructor(menuData){
        makeAutoObservable(this)
    }
}


export default new MenuStore();