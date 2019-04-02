import React, { Component } from 'react';
import axios from "axios"
import EventSuccess from './components/EventSuccess';

export default class Upload extends Component {
    constructor(){
        super();
        this.state = {
            popUp : false,
            newEvent : ""
        }
        this.uploadForm = React.createRef();
    }

    submitUpload = (e)=> {
        e.preventDefault();
        const thisForm = this.uploadForm.current;
        const formData = new FormData(e.target);

        const newEvent = {
            "poster" : thisForm.poster.value,
            "title" : thisForm.title.value,
            "hostedBy" : thisForm.hostedBy.value, 
            "location" : thisForm.location.value,
            "address" : thisForm.address.value,
            "eDate" : thisForm.eDate.value, 
            "time" : thisForm.time.value, 
            "ages" : thisForm.ages.value, 
            "category" : thisForm.category.value,
            "description" : thisForm.description.value, 
            "numTickets" : thisForm.numTickets.value, 
            "price" : thisForm.price.value    
        }

        //checks for empty fields and focuses on empty field
        for(let value in newEvent){
            if(!newEvent[value]){
                thisForm[value].focus();
                return;
            }
        }

        let postConfig = {
            method: "post",
            url: "http://localhost:8080/events/new",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        axios(postConfig)
            .then((result)=>{
              this.setState(
                  {
                      newEvent: result.data.id
                  }
              )
              this.togglePopUp();
            })
            .catch(err=>console.log(err)) 
    }

    togglePopUp = ()=> {
        this.setState(
            {
                popUp:true
            }
        )
    }

  render() {
    return (
      <div className="uploadEvent">
          <h1>Upload Event</h1>
        <form ref={this.uploadForm} onSubmit={this.submitUpload} className="form form--upload">
            <div className="form--div ownLine">
                <label htmlFor="posterId">POSTER</label>
                <input type="file" name="poster" id="posterId"/>
            </div>
            <div className="form--div">
                <label htmlFor="titleId">TITLE</label>
                <input type="text" name="title" id="titleId" placeholder="Enter Title of Event"/>
            </div>
            <div className="form--div ">
                <label htmlFor="hostId">HOSTED BY</label>
                <input type="text" name="hostedBy" id="hostId" placeholder="Name of Organization"/>
            </div>
            <div className="form--div">
                <label htmlFor="locationId">LOCATION</label>
                <select name="location" id="locationId">
                    <option value="">Pick a location</option>
                    <option value="Mombasa, Kenya">Mombasa, Kenya</option>
                    <option value="Nairobi, Kenya">Nairobi, Kenya</option>
                    <option value="Tanzania">Tanzania</option>
                
                </select>
            </div>
            <div className="form--div">
                <label htmlFor="addressId">ADDRESS</label>
                <input type="text" name="address" id="addressId" placeholder="Address of Event"/>
            </div>
            <div className="form--div">
                <label htmlFor="dateId">DATE</label>
                <input type="date" name="eDate" id="dateId"/>
            </div>
            <div className="form--div">
                <label htmlFor="timeId">TIME</label>
                <input type="text" name="time" id="timeId" placeholder="Time of Event"/>
            </div>
            <div className="form--div">
                <label htmlFor="agesId">AGES</label>
                <input type="text" name="ages" id="agesId" placeholder="Age Restriction"/>
            </div>
            <div className="form--div">
                <label htmlFor="categoryId">CATEGORY</label>
                <select name="category" id="categoryId">
                    <option value="">Pick Category</option>
                    <option value="Music">MUSIC</option>
                    <option value="Community">COMMUNITY</option>
                    <option value="Charity">CHARITY</option>
                    <option value="Other">OTHER</option>
                </select>
            </div>
            <div className="form--div ownLine">
                <label htmlFor="descId">DESCRIPTION</label>
                <textarea name="description" id="descId" cols="30" rows="10" placeholder="Description of Event (MAX 1000char)"/>
            </div>
            <div className="form--div">
                <label htmlFor="ticketId">NUMBER OF TICKETS</label>
                <input type="number" min="1" name="numTickets" id="ticketId" placeholder="Number of Tickets"/>
            </div>
            <div className="form--div">
                <label htmlFor="priceId">PRICE PER TICKET</label>
                <input type="number" min="1" name="price" id="priceId" placeholder="Price per ticket"/>

            </div>
            
            <div className="uploadEvent__button">
            <button type="submit">UPLOAD</button>
            </div>
            
        </form>

        {this.state.popUp ? <EventSuccess newEvent={this.state.newEvent}/> : null}

      </div>
    )
  }
}
