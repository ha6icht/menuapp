import React from 'react';
import './DateBar.css';

class DateBar extends React.Component{
    /**
     * 
     * @param {*} props 
     * 
     * constructor
     */
    constructor (props) {
        super(props);
        this.state = {
            cW: this.props.cW,
            year: this.props.year,
            invalidChars: [
                '-',
                '+',
                'e'
            ],
        };
        //console.log('constructor');
        this.handleInputCW = this.handleInputCW.bind(this);
        this.handleExeption = this.handleExeption.bind(this);
        this.handlePaste = this.handlePaste.bind(this);
        this.handleInputYear = this.handleInputYear.bind(this);
    }
    /**
     * 
     * @param {Event} e
     * 
     * Method handels onChange from input field of calendar week 
     */
    handleInputCW(e){
        //console.log(e.target.value);
        //Validates if e.target has the right pattern
        if(e.target.validity.valid){
            //Gives value of e.target back to Home.js
            this.props.onChangeCW(e.target.value);
            //Sets state of checkCWAndYear !OBSOLET!?
            //Sets state of cW
            this.setState({
                checkCWAndYear: 'none',
                cW: e.target.value,
            })
        }
        //console.log('this.state.cW: '+this.state.cW);
        //console.log('this.state.year: '+this.state.year);
        
    }
    /**
     * 
     * @param {Event} e 
     * 
     * Method handels onKeyPress from input field of calendar week
     * e, -, +, keys not allowed
     */
    handleExeption(e){
        if(this.state.invalidChars.includes(e.key)){
            e.preventDefault();
        }
        //console.log('e.keyCode: '+e.keyCode);
    }
    /**
     * 
     * @param {Event} e 
     * 
     * Method handles onPast from input field of calendar week
     * Pasting not allowed
     */
    handlePaste(e){
        e.preventDefault();
    }
    /**
     * 
     * @param {Event} e 
     * 
     * Method handles onKeyDown from input field of year
     * Backspace not allowed
     */
    handleBackspace(e){
        if(e.keyCode === 8){
            e.preventDefault();
        }
    }
    /**
     * 
     * @param {Event} e 
     * 
     * Method handles onChange from input field year
     */
    handleInputYear(e){
        //console.log(e.target.value);
        //console.log('handleInputYear(e): '+e.target.validity.valid);
        //console.log('this.state.leap: '+this.state.leap);
        //Validates if e.target has the right pattern
        if(e.target.validity.valid){
            //Is year of e.target greater than state of year
            if(this.state.year < e.target.value){
                //console.log('Inside if this.state.cW && this.state.leap');
                //Gives back to Home.js cW: 1 year: e.target.value
                this.props.onChangeYear(1,e.target.value);
                //Sets state of cW and year
                this.setState({
                    cW: 1,
                    year: e.target.value,
                });
            }
            //Is year of e.target less than state of year
            if(this.state.year > e.target.value){
                //Is year of e.target leap year
                if(this.props.checkYear(e.target.value)){
                    //Gives back to Home.js cW: 53 year: e.target.value
                    this.props.onChangeYear(53,e.target.value);
                    //Sets state of cW and year
                    this.setState({
                        cW: 53,
                        year: e.target.value,
                    });  
                }
                //Year of e.target is not leap year
                else{
                    //Gives back to Home.js cW: 52 year: e.target.value
                    this.props.onChangeYear(52,e.target.value);
                    //Sets state of cW and year
                    this.setState({
                        cW: 52,
                        year: e.target.value,
                    });
                }
            }
        }
        //console.log('this.state.cW: '+this.state.cW);
        //console.log('this.state.year: '+this.state.year);
        
    }
    /**
     * 
     * Method renders JSX
     */
    render(){
        //console.log('render');
        return(
            <div className="date-bar">
                <form>
                    <label className="pref-date-bar cw">KW:
                    <input className="pref-date-bar-input input-cw"
                    type="number" 
                    value={this.state.cW} 
                    min="1" max={this.props.checkWeek} step="1"
                    onKeyPress={this.handleExeption}
                    onPaste={this.handlePaste}
                    onChange={this.handleInputCW}></input></label>
                    <label className="pref-date-bar year">Jahr:
                    <input className="pref-date-bar-input input-year"
                    type="number"
                    value={this.state.year} 
                    min="2015" max="2050" step="1" 
                    onKeyDown={this.handleBackspace}
                    onPaste={this.handlePaste}
                    onChange={this.handleInputYear}></input></label>
                    <button onClick={this.props.setCurrentCW}>Aktuelle KW</button>
                </form>
            </div> 
        );
    }
}

export default DateBar;