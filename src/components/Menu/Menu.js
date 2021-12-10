import React from "react";
import {Link} from "react-router-dom";
import { action } from 'mobx';
import { observer } from 'mobx-react';
import menuStore from '../../stores/MenuStore';
import './Menu.css';

class Menu extends React.Component{
  /*constructor(props){
    super(props);
    this.getDate = this.getDate.bind(this);
  }*/
  getDate = action(() =>{
    menuStore.checkReturn = false;
    //console.log('Menu.js menuStore.checkReturn: ',menuStore.checkReturn);
    //console.log('Menu.js menuStore.menuData[0].date: ',menuStore.menuData[0].date);
  })
  setDatePerDay(){
    const day = localStorage.getItem('day');
    if(day === 'Montag'){
      localStorage.setItem('currentDateMonday',
        localStorage.getItem('dateMonday'));
      return localStorage.getItem('dateMonday');
    } else if(day === 'Dienstag') {
      localStorage.setItem('currentDateTuesday',
        localStorage.getItem('dateTuesday'));
      return localStorage.getItem('dateTuesday');
    } else if(day === 'Mittwoch') {
      localStorage.setItem('currentDateWednesday',
        localStorage.getItem('dateWednesday'));
      return localStorage.getItem('dateWednesday');
    } else if(day === 'Donnerstag') {
      localStorage.setItem('currentDateThursday',
        localStorage.getItem('dateThursday'));
      return localStorage.getItem('dateThursday');
    } else if(day === 'Freitag') {
      localStorage.setItem('currentDateFriday',
        localStorage.getItem('dateFriday'));
      return localStorage.getItem('dateFriday');
    } else if(day === 'Samstag') {
      localStorage.setItem('currentDateSaturday',
        localStorage.getItem('dateSaturday'));
      return localStorage.getItem('dateSaturday');
    } else if(day === 'Sonntag') {
      localStorage.setItem('currentDateSunday',
        localStorage.getItem('dateSunday'));
      return localStorage.getItem('dateSunday');
    } else {
      console.log('Menu.js/setDatePerDay(): Error day')
    }

  }
  handleMenuInput (e){
    //console.log('Menu.js/handleMenuInput() Inside');
    //console.log(localStorage.getItem('meal'));
    if(localStorage.getItem('meal') === 'Mittagessen'){
      if(localStorage.getItem('day') === 'Montag'){
        localStorage.setItem('mondayMenuLunch', e.target.value)
        //console.log('Menu.js/handleMenuInput() Inside if_meal_day');
      } else if(localStorage.getItem('day') === 'Dienstag'){
        localStorage.setItem('tuesdayMenuLunch', e.target.value)
      } else if(localStorage.getItem('day') === 'Mittwoch'){
        localStorage.setItem('wednesdayMenuLunch', e.target.value)
      } else if(localStorage.getItem('day') === 'Donnerstag'){
        localStorage.setItem('thursdayMenuLunch', e.target.value)
      } else if(localStorage.getItem('day') === 'Freitag'){
        localStorage.setItem('fridayMenuLunch', e.target.value)
      } else if(localStorage.getItem('day') === 'Samstag'){
        localStorage.setItem('saturdayMenuLunch', e.target.value)
      } else if(localStorage.getItem('day') === 'Sonntag'){
        localStorage.setItem('sundayMenuLunch', e.target.value)
      }
    } else if(localStorage.getItem('meal') === 'Abendessen'){
      if(localStorage.getItem('day') === 'Montag'){
        localStorage.setItem('mondayMenuDinner', e.target.value)
      } else if(localStorage.getItem('day') === 'Dienstag'){
        localStorage.setItem('tuesdayMenuDinner', e.target.value)
      } else if(localStorage.getItem('day') === 'Mittwoch'){
        localStorage.setItem('wednesdayMenuDinner', e.target.value)
      } else if(localStorage.getItem('day') === 'Donnerstag'){
        localStorage.setItem('thursdayMenuDinner', e.target.value)
      } else if(localStorage.getItem('day') === 'Freitag'){
        localStorage.setItem('fridayMenuDinner', e.target.value)
      } else if(localStorage.getItem('day') === 'Samstag'){
        localStorage.setItem('saturdayMenuDinner', e.target.value)
      } else if(localStorage.getItem('day') === 'Sonntag'){
        localStorage.setItem('sundayMenuDinner', e.target.value)
      }
    } else {
      console.log('Menu.js/handleMenuInput(): Error meal')
    }
    //console.log(menuStore.menuData[0].lunch.menu);
    //console.log(menuStore.menuData[0].dinner.menu);
  }
  render() {
    return (
      <div className="menu">
        {this.getDate()}
        <div>
          <div className='menu-heading'>
            <div className='meal-menu'>{localStorage.getItem('meal')}</div>
            <div className='day-date'>am&nbsp;
              <span className='day'>{localStorage.getItem('day')}&nbsp;</span>
              <span className='date'>{this.setDatePerDay()}</span>
            </div>
          </div>
          <form className="menu-form">
            <label>
              <input list="suggestions-list" onChange={this.handleMenuInput} />
            </label>
            <datalist id="suggestions-list">
              <option value={localStorage.getItem('mondayMenuLunch')} />
              <option value={localStorage.getItem('tuesdayMenuLunch')} />
              <option value={localStorage.getItem('wednesdayMenuLunch')} />
              <option value={localStorage.getItem('thursdayMenuLunch')} />
              <option value={localStorage.getItem('fridayMenuLunch')} />
              <option value={localStorage.getItem('saturdayMenuLunch')} />
              <option value={localStorage.getItem('sundayMenuLunch')} />
              <option value={localStorage.getItem('mondayMenuDinner')} />
              <option value={localStorage.getItem('tuesdayMenuDinner')} />
              <option value={localStorage.getItem('wednesdayMenuDinner')} />
              <option value={localStorage.getItem('thursdayMenuDinner')} />
              <option value={localStorage.getItem('fridayMenuDinner')} />
              <option value={localStorage.getItem('saturdayMenuDinner')} />
              <option value={localStorage.getItem('sundayMenuDinner')} />
            </datalist>
            <button className="menu-input-button">{<Link className="back-to-menu" to="/" title="Wochenmenü-Plan">Eingabe</Link>}</button>
          </form>
        </div>
      </div>
    )
  }
}

export default observer(Menu);