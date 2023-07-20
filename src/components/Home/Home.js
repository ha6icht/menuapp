import React from "react";
import { action } from 'mobx';
import { observer } from 'mobx-react';
import Schedule from './Schedule/Schedule';
import DateBar from './DateBar/DateBar';
import menuStore from '../../stores/MenuStore'
import './Home.css';
import { Outlet } from "react-router-dom";

/**
 * @typedef {*} String
 * @typedef {*} Number
 * @typedef {*} Boolean
 * @typedef {*} Array
 */

class Home extends React.Component{
  /**
   * 
   * @param {*} props
   * 
   * class constructor 
   */
  constructor(props){
    super(props);
    this.state = {
      dateCW: this.getCW(),
      dateYear: this.getYear(),
      checkWeek: this.getCheckWeek(),
    }
    this.getWeekNumber = this.getWeekNumber.bind(this);
    this.getDateOfISOWeek = this.getDateOfISOWeek.bind(this);
    this.setDatePerDay = this.setDatePerDay.bind(this);
    this.setCW = this.setCW.bind(this);
    this.setYear = this.setYear.bind(this);
    this.isLeapYear = this.isLeapYear.bind(this);
    this.setCurrentCW = this.setCurrentCW.bind(this);
  }
  /**
   * Methods generates start values of this.state 
   */
  getCW(){
    //console.log('Home.js/getCW() menuStore.checkReturn', menuStore.checkReturn);
    //console.log('Home.js/getCW() menuStore.menuData[0].date: ', menuStore.menuData[0].date);
    if(menuStore.checkReturn){
      const cW = this.getWeekNumber(new Date());
      localStorage.setItem('cW', cW[1]);
      return cW[1];
    } else {
      return localStorage.getItem('cW');
    }
  }
  getYear(){
    if(menuStore.checkReturn){
      const cW = this.getWeekNumber(new Date());
      localStorage.setItem('year', cW[0]);
      return cW[0];
    } else {
      return localStorage.getItem('year');
    }
  }
  getCheckWeek(){
    if(menuStore.checkReturn){
      const cW = this.getWeekNumber(new Date());
      if(cW[2]){
        localStorage.setItem('checkWeek', 53);
        return 53;
      } else {
        localStorage.setItem('checkWeek', 52);
        return 52;
      }
    } else {
      return localStorage.getItem('checkWeek');
    }
  }
  /**
   * 
   * @param {String} d :new Date() | 'getFullYear(), getMonth(), getDate()'
   * 
   * @returns {Array} :year {Number}, weekNo {Number} and
   * checkWeek {Boolean}
   * 
   * :weekNo gives calender week of given date
   * :checkWeek gives true|false for leap year
   * 
   * Method computes year, calendar week and leap year
   */
  getWeekNumber(d) {
    let checkYear = false;
    let checkWeek = false;

    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    
    // Is leap year?
    //const year = new Date(Date.UTC(2021,0,1));
    const leapYear = /*year.getUTCFullYear();*/yearStart.getUTCFullYear();
    //console.log('leapYear: ',leapYear)
    if((leapYear%4) === 0){
      //console.log('leapYear%4:'+leapYear);
      if((leapYear%100) === 0){
        //console.log('leapYear%100: '+leapYear);
        if((leapYear%400) === 0){
          //console.log('leapYear%400: '+leapYear)
          checkYear = true;
        }
        else{
          checkYear = false;
        }
      }
      else{
        if(leapYear === 2032) checkYear = false;
        else checkYear = true;
      }
    }
    else{
      checkYear = false;
    }
    //console.log('checkYear: '+checkYear);
    //Week 53
    const leapDay = /*year.getUTCDay();*/yearStart.getUTCDay();
    console.log('leapDay: '+leapDay);
    if((leapDay === 3 && checkYear) || (leapDay === 4 && !checkYear)) {
      checkWeek = true;
    }
    //console.log('checkWeek: '+checkWeek);

    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo, checkWeek];
  }
  /**
   * 
   * @param {Number} w :calendar week
   * @param {Number} y :year
   * 
   * @returns {String} 
   * :ISOWeekStart gives start date of given calendar week
   * 
   * Method computes start date of given calendar week
   */
  getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
  }
  /**
   * 
   * @param {Number} num :increase getDate() by num
   * 
   * @returns {String} 
   * 
   * Method computes a date for given day
   */
  getDateString(num){
    const resultISOWeek = this.getDateOfISOWeek(this.state.dateCW, this.state.dateYear);
    resultISOWeek.setDate(resultISOWeek.getDate() + num);
    const dateOfDay = resultISOWeek.getDate();
    let dateOfMonth = resultISOWeek.getMonth();
    return dateOfDay+'.'+(dateOfMonth+1)+'.';
  }
  /**
   * 
   * @param {String} day :given Weekday
   * 
   * @returns {String}
   * 
   * @uses getDateString()
   * 
   * Method returns date of given day
   */
  setDatePerDay = action(day => {
    
    if(day === 'monday'){
      const dateString = this.getDateString(0);
      if(menuStore.checkReturn){
        localStorage.setItem('dateMonday', dateString);
        //console.log('Home.js/setDatePerDay()_if menuStore.menuData[0].date: ', menuStore.menuData[0].date);
      }
      return dateString;
    }
    else if(day === 'tuesday'){
      const dateString = this.getDateString(1);
      if(menuStore.checkReturn){
        localStorage.setItem('dateTuesday', dateString);
        //console.log('Home.js/setDatePerDay()_if menuStore.menuData[0].date: ', menuStore.menuData[0].date);
      }
      return dateString;
    }
    else if(day === 'wednesday'){
      const dateString = this.getDateString(2);
      if(menuStore.checkReturn){
        localStorage.setItem('dateWednesday', dateString);
        //console.log('Home.js/setDatePerDay()_if menuStore.menuData[0].date: ', menuStore.menuData[0].date);
      }
      return dateString;
    }
    else if(day === 'thursday'){
      const dateString = this.getDateString(3);
      if(menuStore.checkReturn){
        localStorage.setItem('dateThursday', dateString);
        //console.log('Home.js/setDatePerDay()_if menuStore.menuData[0].date: ', menuStore.menuData[0].date);
      }
      return dateString;
    }
    else if(day === 'friday'){
      const dateString = this.getDateString(4);
      if(menuStore.checkReturn){
        localStorage.setItem('dateFriday', dateString);
        //console.log('Home.js/setDatePerDay()_if menuStore.menuData[0].date: ', menuStore.menuData[0].date);
      }
      return dateString;
    }
    else if(day === 'saturday'){
      const dateString = this.getDateString(5);
      if(menuStore.checkReturn){
        localStorage.setItem('dateSaturday', dateString);
        //console.log('Home.js/setDatePerDay()_if menuStore.menuData[0].date: ', menuStore.menuData[0].date);
      }
      return dateString;
    }
    else if(day === 'sunday'){
      const dateString = this.getDateString(6);
      if(menuStore.checkReturn){
        localStorage.setItem('dateSunday', dateString);
        //console.log('Home.js/setDatePerDay()_if menuStore.menuData[0].date: ', menuStore.menuData[0].date);
      } else {
        //console.log('Home.js/setDatePerDay()_else menuStore.menuData[0].date: ', menuStore.menuData[0].date)
        //console.log('Home.js/setDatePerDay() menuStore.checkReturn: ', menuStore.checkReturn);
        menuStore.checkReturn = true;
      }
      return dateString;
    } 
    else{
      return 'Home.js/setDatePerDay(): Error';
    }
  })
  /**
   * 
   * @param {Number} cW :calendar week
   * 
   * Method sets state of dateCW, dateYear and checkWeek
   * Is used by input field for calendar week 
   */
  setCW = (cW)=>{
    const resultISOWeek = this.getDateOfISOWeek(cW, this.state.dateYear)
    const resultWeekNumber=this.getWeekNumber(new Date(resultISOWeek))
    if(resultWeekNumber[2]){
      localStorage.setItem('cW', resultWeekNumber[1]);
      localStorage.setItem('year', resultWeekNumber[0]);
      localStorage.setItem('checkWeek', 53);
      this.setState({
        dateCW: resultWeekNumber[1],
        dateYear: resultWeekNumber[0],
        checkWeek: 53,
      });
    } else {
      localStorage.setItem('cW', resultWeekNumber[1]);
      localStorage.setItem('year', resultWeekNumber[0]);
      localStorage.setItem('checkWeek', 52);
      this.setState({
        dateCW: resultWeekNumber[1],
        dateYear: resultWeekNumber[0],
        checkWeek: 52,
      });
    }
    //console.log('Home.js/setCW() menuStore.cWReturn: '+ menuStore.cWReturn);
    //console.log('Home.js/setCW() menuStore.yearReturn: '+ menuStore.yearReturn);
    //console.log('Home.js/setCW() menuStore.checkWeekReturn: '+ menuStore.checkWeekReturn);
    //console.log('Home.js/setCW() menuStore.checkReturn: '+ menuStore.checkReturn);
    //console.log('Home.js this.state.dateCW: '+ this.state.dateCW)
  }
  /**
   * 
   * @param {Number} cW   :calendar week
   * @param {Number} year :year
   * 
   * Method sets state of dateCW, dateYear and checkWeek
   * Is used from input field for year 
   */
  setYear(cW, year){
    const resultISOWeek = this.getDateOfISOWeek(cW, year)
    const resultWeekNumber = this.getWeekNumber(new Date(resultISOWeek))
    //console.log('setYear(year) resultWeekNumber[1]: '+resultWeekNumber[1]);
    if(resultWeekNumber[2]){
      localStorage.setItem('cW', resultWeekNumber[1]);
      localStorage.setItem('year', resultWeekNumber[0]);
      localStorage.setItem('checkWeek', 53);
      this.setState({
        dateCW: resultWeekNumber[1],
        dateYear: resultWeekNumber[0],
        checkWeek: 53,
      });
    } else {
      localStorage.setItem('cW', resultWeekNumber[1]);
      localStorage.setItem('year', resultWeekNumber[0]);
      localStorage.setItem('checkWeek', 52);
      this.setState({
        dateCW: resultWeekNumber[1],
        dateYear: resultWeekNumber[0],
        checkWeek: 52,
      });
    }
    //console.log('Home.js/setYear() menuStore.cWReturn: '+ menuStore.cWReturn);
    //console.log('Home.js/setYear() menuStore.yearReturn: '+ menuStore.yearReturn);
    //console.log('Home.js/setYear() menuStore.checkWeekReturn: '+ menuStore.checkWeekReturn);
  }
  setCurrentCW(){
    let week = '';
    const cW = this.getWeekNumber(new Date());
    localStorage.setItem('cW', cW[1]);
    localStorage.setItem('year', cW[0]);
    console.log('cW[2]: ',cW[2]);
    if(cW[2]){
      localStorage.setItem('checkWeek', 52);
      week = 52;
    } else {
      localStorage.setItem('checkWeek', 53);
      week = 53;
    }
    this.setState({
      dateCW: cW[1],
      dateYear: cW[0],
      checkWeek: week,
    })
  }
  /**
   * 
   * @param {Number} year :year
   * 
   * @returns {Boolean} :resultWeekNumber[2]
   * 
   * Method computes if a year is a leap year
   * Is used as param in DateBar.js
   */
  isLeapYear(year){
    const resultISOWeek = this.getDateOfISOWeek(44, (year));
    const resultWeekNumber = this.getWeekNumber(new Date(resultISOWeek));
    return resultWeekNumber[2];
  }
  /**
   * 
   * Method renders JSX
   */
  render() {
    return (
      <main>
        <DateBar 
          cW={this.state.dateCW}
          year={this.state.dateYear}
          checkWeek={this.state.checkWeek}
          onChangeCW={this.setCW}
          onChangeYear={this.setYear}
          checkYear={this.isLeapYear}
          setCurrentCW={this.setCurrentCW}
          />
        <section className="diary">
          <Schedule 
            day="Montag"
            dateOfDay={this.setDatePerDay('monday')}
            />
          <Schedule 
            day="Dienstag"
            dateOfDay={this.setDatePerDay('tuesday')}
            />
          <Schedule 
            day="Mittwoch"
            dateOfDay={this.setDatePerDay('wednesday')}
            />
          <Schedule 
            day="Donnerstag"
            dateOfDay={this.setDatePerDay('thursday')}
            />
          <Schedule 
            day="Freitag"
            dateOfDay={this.setDatePerDay('friday')}
            />
          <Schedule 
            day="Samstag"
            dateOfDay={this.setDatePerDay('saturday')}
            />
          <Schedule 
            day="Sonntag"
            dateOfDay={this.setDatePerDay('sunday')}
            />
        </section>
      </main>
    );
  }
}
export default observer(Home);