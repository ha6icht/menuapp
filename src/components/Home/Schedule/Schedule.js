import React from 'react';
import {Link} from "react-router-dom";
//import menuStore from '../../../stores/MenuStore';
import './Schedule.css';

class Schedule extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count: 1,
            error: null,
            isLoaded: false,
            traffic: false,
            item: [],

        };
        //this.setMenu = this.setMenu.bind(this);
    }
    /*componentDidMount(){
        fetch('http://localhost:8080/www/local.grizzley.menu/menu-app-api/isKey.php', {

        }).then(result => {
                if(result) fetch('http://localhost:8080/www/local.grizzley.menu/', {

                }).then(result => {

                });
            )}
    }*/
    countAdd(){
        this.setState(prevState => {
            return {count: prevState.count++}
        });
    }
    handleLink(day, meal){
        localStorage.setItem('day', day);
        /*if(meal === 'lunch'){
            localStorage.setItem('meal', meal);
        } else {*/
            localStorage.setItem('meal', meal);
        //}
        //console.log('Schedule.js/handleLink() localStorage.getItem(\'day\'):',
        //localStorage.getItem('day'));
        //console.log('Schedule.js/handleLink() localStorage.getItem(\'meal\'):',
        //localStorage.getItem('meal'));
    }
    setMenu(date, meal){
        if(date === localStorage.getItem('currentDateMonday')){
            if(meal === 'lunch'){
                return <div>{localStorage.getItem('mondayMenuLunch')}</div>
            } else if (meal === 'dinner'){
                return <div>{localStorage.getItem('mondayMenuDinner')}</div>
            }
        } else if(date === localStorage.getItem('currentDateTuesday')){
            if(meal === 'lunch'){
                return <div>{localStorage.getItem('tuesdayMenuLunch')}</div>
            } else if (meal === 'dinner'){
                return <div>{localStorage.getItem('tuesdayMenuDinner')}</div>
            }
        } else if(date === localStorage.getItem('currentDateWednesday')){
            if(meal === 'lunch'){
                return <div>{localStorage.getItem('wednesdayMenuLunch')}</div>
            } else if (meal === 'dinner'){
                return <div>{localStorage.getItem('wednesdayMenuDinner')}</div>
            }
        } else if(date === localStorage.getItem('currentDateThursday')){
            if(meal === 'lunch'){
                return <div>{localStorage.getItem('thursdayMenuLunch')}</div>
            } else if (meal === 'dinner'){
                return <div>{localStorage.getItem('thursdayMenuDinner')}</div>
            }
        } else if(date === localStorage.getItem('currentDateFriday')){
            if(meal === 'lunch'){
                return <div>{localStorage.getItem('fridayMenuLunch')}</div>
            } else if (meal === 'dinner'){
                return <div>{localStorage.getItem('fridayMenuDinner')}</div>
            }
        } else if(date === localStorage.getItem('currentDateSaturday')){
            if(meal === 'lunch'){
                return <div>{localStorage.getItem('saturdayMenuLunch')}</div>
            } else if (meal === 'dinner'){
                return <div>{localStorage.getItem('saturdayMenuDinner')}</div>
            }
        } else if(date === localStorage.getItem('currentDateSunday')){
            if(meal === 'lunch'){
                return <div>{localStorage.getItem('sundayMenuLunch')}</div>
            } else if (meal === 'dinner'){
                return <div>{localStorage.getItem('sundayMenuDinner')}</div>
            }
        }
        console.log('######START######');
        for(let i=0;i<localStorage.length;i++){
            console.log(i+': '+localStorage.key(i));
        }
        console.log('######END######');
    }
    /**
     * 
     * Method renders JSX
     */
    render(){
        return(
            <article className="day-schedule">
                <span className="meal-day meal-heading"><strong>{this.props.day}&nbsp;</strong></span>
                <span className="meal-date meal-heading">{this.props.dateOfDay}</span>
                <div className="meal"><p>Mittagessen&nbsp;</p><Link className="add-menu" to="/menu" title="hinzufügen/ändern" onClick={() => this.handleLink(this.props.day, 'Mittagessen')}>+</Link></div>
                <hr />
                {this.setMenu(this.props.dateOfDay, 'lunch')}
                <div className="meal"><p>Abendessen&nbsp;</p><Link className="add-menu" to="/menu" title="hinzufügen/ändern" onClick={() => this.handleLink(this.props.day, 'Abendessen')}>+</Link></div>
                <hr />
                {this.setMenu(this.props.dateOfDay, 'dinner')}
            </article> 
        );
    }
}

export default Schedule;