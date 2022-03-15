import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import "./PropertyPanel.css";

class PropertyPanel extends Component {
    constructor(props)
    {
        super(props);
        this.state = { name : props.name, buttons: props.buttons };
    }

    handleClick(e, self){
        var opcion = e.target.textContent;
        console.log(opcion);
        var checkbox = e.target.parentElement.parentElement.firstChild;
        checkbox.checked = false;
        var name = "Base" //Esto se recbirá de la llamada
        var containerDiv = checkbox.parentElement.parentElement.parentElement;
        let nextSibling = containerDiv.nextElementSibling;

        while(nextSibling) {
            var toDelete = nextSibling;
            nextSibling = nextSibling.nextElementSibling;
            toDelete.remove();
        }
        var mainPanel = containerDiv.parentElement;
        let newPropertyPanelContainer = document.createElement("div");
        newPropertyPanelContainer.id = name + "Container";
        newPropertyPanelContainer.className = "propertyContainer";
        mainPanel.append(newPropertyPanelContainer);
        ReactDOM.render(<><PropertyPanel name={name} buttons="Gel,Acrigel"/></>, newPropertyPanelContainer);
        console.log(self.state);
    }
 
    render()
    {
        const self = this;
        return(
        <div class="border-b overflow-hidden tab">
            <div class="border-l-2 border-transparent relative">
                <input class="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6" type="checkbox" id="chck1"></input>
                <header class="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label" for="chck1">
                    <span class="text-grey-darkest font-thin text-xl">
                        {this.state.name}
                    </span>
                    <div class="rounded-full border border-grey w-7 h-7 flex items-center justify-center test">
                        <svg aria-hidden="true" class="" data-reactid="266" fill="none" height="24" stroke="#606F7B" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <polyline points="6 9 12 15 18 9">
                            </polyline>
                        </svg>
                    </div>
                </header>
                <div class="tab-content flex">
                    {this.state.buttons.split(",").map((element,i) => {
                        console.log(element);
                        return(
                            <>
                            <button onClick={(e) => this.handleClick(e, self)} class="flex border-2 w-full">{element}</button>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>)
    }
} 

export default PropertyPanel;